/*
 gatsby-node requires ES5 imports
 https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-457010663
*/

const buildPath = (politylink_id) => {
    const res = politylink_id.split(':')
    return '/' + res[0].toLowerCase() + '/' + res[1]
}

const buildImagePath = (politylink_id, ext) => {
    const res = politylink_id.split(':')
    return `https://image.politylink.jp/${res[0].toLowerCase()}/${res[1]}.${ext}`
}

module.exports.buildPath = buildPath
module.exports.buildImagePath = buildImagePath