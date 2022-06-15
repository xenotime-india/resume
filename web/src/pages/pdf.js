import * as React from "react";
import { graphql } from "gatsby";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import SanityImage from "gatsby-plugin-sanity-image";

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
        ...ImageWithPreview
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
    professionalExperiences: allSanityProfessionalExperience {
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
    certifications: allSanityCertification {
      edges {
        node {
          id
          title
          sequence
          iconName
        }
      }
    }
    educations: allSanityEducation {
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
    skills: allSanitySkill {
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
  console.log(data);
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
              <SanityImage
                {...personalInformation.image}
                height={300}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="img-thumbnail rounded-circle"
                loading="eager"
                alt="user-pic"
              />
            </div>
            <div className="mt-xs" />
            <ContactInformation personalInformation={personalInformation} pdf />
            <Skills skills={skills} pdf />
            <div style={{ height: 250 }} />
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
            <SectionHeader icon={faBriefcase} text="Professional Experience" />
            {professionalExperiences.map((experience) => (
              <ProfessionalItem {...experience} key={experience.id} pdf />
            ))}

            <div className="mt-xs" />

            <SectionHeader icon={faGraduationCap} text="Education" />
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
