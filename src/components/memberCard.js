import styles from "./memberCard.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "gatsby"
import React from "react";
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default function MemberCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon={faUser} size="lg"/>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
        </Link>
    );
}