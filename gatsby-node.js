const {buildPath} = require(`./src/utils/urlutils`)
const {toJsDate, formatDateWithDay, formatDate} = require(`./src/utils/dateutils`)

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

    //議員詳細ページ
    const membersResult = await graphql(`
    {
        politylink {
            Member {
                id
            }
        }
    }
    `)
    membersResult.data.politylink.Member.forEach(({id}) => {
        createPage({
            path: buildPath(id),
            component: path.resolve(`./src/templates/member.js`),
            context: {
                memberId: id,
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
                date {year, month, day}
                totalMinutes
                minutes {
                    name
                }
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

    timelineResult.data.politylink.Timeline.forEach((timeline) => {
        createPage({
            path: buildPath(timeline.id),
            component: path.resolve(`./src/templates/timeline.js`),
            context: {
                timelineId: timeline.id,
                timelineMinDate: minDate.data.politylink.Timeline[0].date,
                timelineMaxDate: maxDate.data.politylink.Timeline[0].date,
                title: `国会タイムライン@${formatDateWithDay(timeline.date)}`,
                description: `${formatDate(timeline.date)}付けの国会に関する最新情報（会議録、成立した法律案、ニュース記事など）をまとめています。現時点で登録されている会議録は${timeline.totalMinutes}件で、内訳は${timeline.minutes.map(minute => minute.name).join("、")}です。`,
                date: toJsDate(timeline.date),
                rss: timeline.totalMinutes > 0
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