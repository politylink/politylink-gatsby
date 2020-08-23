const path = require(`path`)

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions
    const billResult = await graphql(`
    {
        politylink {
            Bill {
                id
            }
        }
    }
    `)
    billResult.data.politylink.Bill.forEach(({id}) => {
        createPage({
            path: "/bill/" + id.split(':').pop(),
            component: path.resolve(`./src/templates/bill.js`),
            context: {
                billId: id,
            },
        })
    })

    const markdownTemplate = require.resolve(`./src/templates/markdown.js`)
    const markdownResult = await graphql(`
    {
        allMarkdownRemark {
            edges {
                node {
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }
    `)
    markdownResult.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
            path: node.frontmatter.slug,
            component: markdownTemplate,
            context: {
                // additional data can be passed via context
                slug: node.frontmatter.slug,
            },
        })
    })
}