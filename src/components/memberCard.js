import React from "react";
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./memberCard.module.css";

export default function MemberCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.icon}>
                <FontAwesomeIcon icon="user" size="lg"/>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
        </Link>
    );
}