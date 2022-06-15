const clientConfig = require("./client-config");

module.exports = {
  siteMetadata: {
    title: `resume`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        ...clientConfig.sanity,
        projectId: "enfmv5wg",
        dataset: "production",
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        // Sanity project info (required)
        ...clientConfig.sanity,
        customImageTypes: ["SanityMainImage"],
        defaultImageConfig: {
          quality: 100,
          fit: "max",
          auto: "format",
        },
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
