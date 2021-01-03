import React from "react";
import {
    TwitterShareButton,
    FacebookShareButton,
    TwitterIcon,
    FacebookIcon
} from "react-share";
import styles from "./share.module.css"


export default function Share({title}) {
    const url = document.baseURI;
    const iconSize = 32;

    return (
    <div className={styles.socialLinks}>
        <TwitterShareButton url={url} title={title}>
            <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={title}>
            <FacebookIcon round size={iconSize} />
        </FacebookShareButton>
    </div>
    );
}