import React from "react"
import styles from "./billCard.module.css"
import {Link} from "gatsby"

export default function BillCard(props) {
    return (
        <Link className={props.left ? styles.leftCard : styles.card} to={props.to}>
            <div className={styles.header}>
                <div className={styles.title}>{props.title}</div>
                {props.isPassed && <div className={styles.status}>{'成立'}</div>}
            </div>
            <p className={styles.description}>{props.description}</p>
        </Link>
    )
}
