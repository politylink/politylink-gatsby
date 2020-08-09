/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "POL",
        // This is the field under which it's accessible
        fieldName: "politylink",
        // URL to query from
        url: "http://www.politylink.jp:4000/",
      },
    },
  ],
}
