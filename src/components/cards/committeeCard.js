import React from "react"
import styles from "./committeeCard.module.css"
import {Link} from "gatsby"

export default function CommitteeCard(props) {
    return (
        <Link className={props.left ? styles.leftCard : styles.card} to={props.to}>
            <div className={styles.header}>
                <div className={styles.title}>{props.title}</div>
            </div>
        </Link>
    )
}