import React from "react"
import PropTypes from "prop-types"
import {Helmet} from "react-helmet"
import {graphql, useStaticQuery} from "gatsby"

function SEO({description, lang, meta, title, image, pageType, twitterType}) {
    const {site} = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    )

    const metaTitle = title || site.siteMetadata.title
    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={metaTitle}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: pageType,
                },
                {
                    property: `og:image`,
                    content: image,
                },
                {
                    name: `twitter:card`,
                    content: twitterType,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: `ja`,
    meta: [],
    description: ``,
    image: `https://politylink.jp/logo.png`,
    pageType: `article`,
    twitterType: `summary`,
}

SEO.propTypes = {
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    pageType: PropTypes.string,
    twitterType: PropTypes.string,
}

export default SEO
