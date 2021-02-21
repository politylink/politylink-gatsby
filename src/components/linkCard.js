import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import styles from "./linkCard.module.css"


export default function LinkCard(props) {
    const getIcon = (title) => {
        if (title.includes("PDF")) {
            return <FontAwesomeIcon icon="file-pdf" size="lg"/>
        } else if (title.includes("中継") || title.includes("映像")) {
            return <FontAwesomeIcon icon="video" size="lg"/>
        } else {
            return <FontAwesomeIcon icon="external-link-alt" size="lg"/>
        }
    }

    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <div className={styles.icon}>
                {getIcon(props.title)}
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
            <p className={styles.domain}>{props.domain}</p>
        </a>
    );
}