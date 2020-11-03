const {buildPath} = require(`./src/utils/urlutils`)

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
            path: buildPath(id),
            component: path.resolve(`./src/templates/bill.js`),
            context: {
                billId: id,
            },
        })
    })

    //委員会詳細ページ
    const committeesResult = await graphql(`
    {
        politylink {
            Committee {
                id
            }
        }
    }
    `)
    committeesResult.data.politylink.Committee.forEach(({id}) => {
        createPage({
            path: buildPath(id),
            component: path.resolve(`./src/templates/committee.js`),
            context: {
                committeeId: id,
            }
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
            path: buildPath(id),
            component: path.resolve(`./src/templates/minutes.js`),
            context: {
                minutesId: id,
            },
        })
    })

    //タイムラインページ
    const timelineResult = await graphql(`
    {
        politylink {
            Timeline {
                id
            }
        }
    }
    `)

    const minDate = await graphql(`
    {
        politylink {
            Timeline (orderBy:date_asc, first:1) {
                date { year, month, day }
            }
        }
    }
    `)

    const maxDate = await graphql(`
    {
        politylink {
            Timeline (orderBy:date_desc, first:1) {
                date { year, month, day }
            }
        }
    }
    `)

    timelineResult.data.politylink.Timeline.forEach(({id}) => {
        createPage({
            path: buildPath(id),
            component: path.resolve(`./src/templates/timeline.js`),
            context: {
                timelineId: id,
                timelineMinDate: minDate.data.politylink.Timeline[0].date,
                timelineMaxDate: maxDate.data.politylink.Timeline[0].date,
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