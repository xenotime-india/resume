import * as React from "react";
import { graphql } from "gatsby";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

import {
  Header,
  Section,
  AboutMe,
  ContactInformation,
  Skills,
  SectionHeader,
  ProfessionalItem,
  EducationItem,
  HobbiesAndInterests,
  Footer,
  Certifications,
} from "./../components";
import { mapEdgesToNodes } from "../lib/helpers";
import SEO from "./../components/seo";

export const query = graphql`
  query pdfResumeQuery {
    personalInformation: sanityPersonalInformation(
      _id: { regex: "/(drafts.|)personalInformation/" }
    ) {
      fullName
      _rawAbountMeDescription
      _rawHobbiesAndInterests
      jobTitle
      location
      phoneNumber
      email
      twitterUserName
      image {
        ...SanityImage
      }
      links {
        link {
          id
          sequence
          title
          href
          iconName
        }
        _key
      }
    }
    professionalExperiences: allSanityProfessionalExperience(
      sort: { fields: [startDate], order: DESC }
    ) {
      edges {
        node {
          id
          organization
          isCurrent
          position
          endDate
          startDate
          _rawDescription
        }
      }
    }
    certifications: allSanityCertification(
      sort: { fields: [sequence], order: ASC }
    ) {
      edges {
        node {
          id
          title
          sequence
          iconName
        }
      }
    }
    educations: allSanityEducation(sort: { fields: [sequence], order: ASC }) {
      edges {
        node {
          id
          year
          sequence
          title
          organization
          _rawDescription
        }
      }
    }
    skills: allSanitySkill(sort: { fields: [sequence], order: ASC }) {
      edges {
        node {
          level
          levelName
          skills {
            label
            value
          }
          id
        }
      }
    }
  }
`;

// markup
const PDFPage = ({ data }) => {
  const { personalInformation } = data;
  const educations = (data || {}).educations
    ? mapEdgesToNodes(data.educations)
    : [];
  const professionalExperiences = (data || {}).professionalExperiences
    ? mapEdgesToNodes(data.professionalExperiences)
    : [];
  const certifications = (data || {}).certifications
    ? mapEdgesToNodes(data.certifications)
    : [];
  const skills = (data || {}).skills ? mapEdgesToNodes(data.skills) : [];
  const { fullName, jobTitle, location, phoneNumber, twitterUserName } =
    personalInformation;

  return (
    <>
      <SEO
        description={`Professional résumé for ${fullName}, ${jobTitle} living in ${personalInformation.location}.`}
        personalInformation={personalInformation}
        title={`Résumé | ${fullName} | ${personalInformation.location}`}
      />

      <div className="pdfLayout">
        <div className="pdfSidebar">
          <Section color="light" pdf>
            <div className="text-center">
              <img
                src={imageUrlFor(buildImageObj(personalInformation.image))
                  .width(180)
                  .height(180)
                  .auto("format")
                  .url()}
                alt="user-pic"
                className="img-thumbnail rounded-circle"
              />
            </div>
            <div className="mt-xs" />
            <ContactInformation personalInformation={personalInformation} pdf />
            <Skills skills={skills} pdf />
            <div style={{ height: 280 }} />
            <Certifications certifications={certifications} pdf />
          </Section>
        </div>

        <div className="pdfMain">
          <Section color="primary" pdf>
            <Header
              pdf
              subtitle={personalInformation.job_title}
              title={fullName}
            />
            <AboutMe personalInformation={personalInformation} pdf />
          </Section>
          <Section color="white" pdf>
            <SectionHeader icon={FaBriefcase} text="Professional Experience" />
            {professionalExperiences.map((experience) => (
              <ProfessionalItem {...experience} key={experience.id} pdf />
            ))}

            <div className="mt-xs" />

            <SectionHeader icon={FaGraduationCap} text="Education" />
            {educations.map((experience) => (
              <EducationItem key={experience.id} {...experience} pdf />
            ))}

            <div className="mt-xs" />

            <HobbiesAndInterests
              personalInformation={personalInformation}
              pdf
            />
          </Section>
        </div>
      </div>
    </>
  );
};

export default PDFPage;
