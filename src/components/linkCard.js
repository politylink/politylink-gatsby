import React from "react"
import styles from "./linkCard.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"


export default function LinkCard(props) {
    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <div  className={styles.icon}>
                <FontAwesomeIcon icon={faExternalLinkAlt} size="2x"/>
            </div>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.domain}>{props.domain}</p>
        </a>
    );
}