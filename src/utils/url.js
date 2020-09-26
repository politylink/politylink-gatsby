/*
 gatsby-node requires ES5 imports
 https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-457010663
*/

const buildPath = (politylink_id) => {
    const res = politylink_id.split(':')
    return '/' + res[0].toLowerCase() + '/' + res[1]
}
module.exports.buildPath = buildPath