import styles from "./linkPersonCard.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default function LinkPersonCard(props) {
    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <div  className={styles.icon}>
                <FontAwesomeIcon icon={faUser} size="lg"/>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
        </a>
    );
}