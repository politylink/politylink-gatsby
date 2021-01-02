import React from "react";
import {
    TwitterShareButton,
    FacebookShareButton,
    TwitterIcon,
    FacebookIcon
} from "react-share";
import urljoin from "url-join";
import styles from "./share.module.css"

//class Share extends Component {
export default function Share({title, postPath, siteUrl}) {

    const url = urljoin(siteUrl, postPath);
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