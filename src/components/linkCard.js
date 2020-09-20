import React from "react"
import styles from "./linkCard.module.css"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons"


export default function LinkCard(props) {
    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faExternalLinkAlt} size="lg"/>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
            <p className={styles.domain}>{props.domain}</p>
        </a>
    );
}