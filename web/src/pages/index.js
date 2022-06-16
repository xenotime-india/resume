import * as React from "react";
import { graphql } from "gatsby";
import {
  faBriefcase,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";

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
} from "./../components";
import { mapEdgesToNodes } from "../lib/helpers";
import SEO from "./../components/seo";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
  query resumeQuery {
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
const IndexPage = ({ data }) => {
  const { personalInformation } = data;
  const educations = (data || {}).educations
    ? mapEdgesToNodes(data.educations)
    : [];
  const professionalExperiences = (data || {}).professionalExperiences
    ? mapEdgesToNodes(data.professionalExperiences)
    : [];
  const skills = (data || {}).skills ? mapEdgesToNodes(data.skills) : [];
  const { fullName, jobTitle, location, phoneNumber, twitterUserName } =
    personalInformation;

  return (
    <>
      <SEO
        description={`Professional résumé for ${fullName}, ${jobTitle} living in ${location}.`}
        title={`Résumé | ${fullName} | ${location}`}
      />

      <Header
        subtitle={jobTitle}
        title={fullName}
        profilePic={personalInformation.image}
      />
      <Section color="white">
        <div className="row">
          <div className="col-md">
            <AboutMe personalInformation={personalInformation} />
          </div>
          <div className="col-md mt-md-0 mt-xs">
            <ContactInformation personalInformation={personalInformation} />
          </div>
        </div>

        <Skills skills={skills} />
      </Section>

      <Section color="light">
        <SectionHeader icon={faBriefcase} text="Professional Experience" dark />
        {professionalExperiences.map((experience) => (
          <ProfessionalItem
            is_current={experience.isCurrent}
            key={experience.id}
            {...experience}
          />
        ))}
      </Section>

      <Section color="white">
        <SectionHeader icon={faGraduationCap} text="Education" />
        {educations.map((experience) => (
          <EducationItem key={experience.id} {...experience} />
        ))}
      </Section>

      <Section color="light">
        <HobbiesAndInterests personalInformation={personalInformation} />
      </Section>

      <Footer personalInformation={personalInformation} />
    </>
  );
};

export default IndexPage;
