import React from "react";
import { Link } from "gatsby";
import { buildImagePath } from "../utils/urlutils";
import styles from "./memberCard.module.css";

export default function MemberCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.icon}>
                <img className={styles.image} src={buildImagePath(props.id)} alt={'顔写真'}/>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
        </Link>
    );
}