// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import mainImage from "./objects/mainImage";
import portableText from "./objects/portableText";
import linkReference from "./objects/linkReference";

import personalInformation from "./documents/personalInformation";
import professionalExperience from "./documents/professionalExperience";
import skill from "./documents/skill";
import certification from "./documents/certification";
import education from "./documents/education";
import link from "./documents/link";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    mainImage,
    portableText,
    linkReference,

    personalInformation,
    professionalExperience,
    skill,
    certification,
    education,
    link,
  ]),
});
