import styles from "./socialLinks.module.css";
import {FacebookIcon, TwitterIcon} from "react-share";
import React from "react";

export default function SocialLinks({member}) {
    const iconSize = 40;
    return (
        <div className={styles.div}>
            {member.twitter &&
            <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <TwitterIcon className={styles.icon} round size={iconSize}/>
            </a>
            }
            {member.facebook &&
            <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                <FacebookIcon className={styles.icon} round size={iconSize}/>
            </a>
            }
        </div>
    );
}