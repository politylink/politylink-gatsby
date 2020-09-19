const path = require(`path`)

exports.createPages = async ({actions, graphql}) => {
    const {createPage} = actions

    // 議案詳細ページ
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

    // 会議録詳細ページ
    const minutesResult = await graphql(`
    {
        politylink {
            Minutes {
                id
            }
        }
    }
    `)
    minutesResult.data.politylink.Minutes.forEach(({id}) => {
        createPage({
            path: "/minutes/" + id.split(':').pop(),
            component: path.resolve(`./src/templates/minutes.js`),
            context: {
                minutesId: id,
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