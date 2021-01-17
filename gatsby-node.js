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
                description: formatRssText(timeline),
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

const formatRssText = (timeline) => {
    if (timeline.totalMinutes === 0) {
        return null;
    }
    const minutesNameList = timeline.minutes.map(minute => minute.name)
    const minutesStr = timeline.totalMinutes <= 3
        ? minutesNameList.join("、")
        : minutesNameList.slice(0, 2).concat([`他${timeline.totalMinutes - 2}件`]).join("、")
    return `国会開催日です。現時点で${minutesStr}が登録されています。`
}