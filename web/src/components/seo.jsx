import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

function SEO({
  location,
  description,
  lang = "en-us",
  meta,
  keywords,
  title,
  image,
}) {
  const siteAuthor = "Sandeep Kumar";
  let metaImage = image?.asset
    ? imageUrlFor(buildImageObj(image)).width(1200).url()
    : null;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          name: "theme-color",
          content: "#121212",
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:url",
          content: `${location?.pathname || ""}`,
        },
        {
          property: "og:url:secure_url",
          content: `${location?.pathname || ""}`,
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: siteAuthor,
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: metaImage,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: "keywords",
                content: keywords.join(", "),
              }
            : [],
        )
        .concat(meta)}
    ></Helmet>
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
