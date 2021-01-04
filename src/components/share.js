import React from "react";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import styles from "./share.module.css"
import urljoin from "url-join";


export default function Share({title, postPath}) {
    const url = urljoin('https://politylink.jp/', postPath)
    const iconSize = 32;

    return (
        <div className={styles.socialLinks}>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon round size={iconSize}/>
            </TwitterShareButton>
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon round size={iconSize}/>
            </FacebookShareButton>
        </div>
    );
}