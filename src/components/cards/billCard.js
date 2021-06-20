import React from "react"
import styles from "./billCard.module.css"
import {Link} from "gatsby"

export default function BillCard(props) {
    return (
        <Link className={props.left ? styles.leftCard : styles.card} to={props.to}>
            <div className={styles.flex}>
                <div className={styles.title}>{props.title}</div>
                <div className={styles.flex}>
                    {props.isPassed && <div className={styles.passedBadge}>{'成立'}</div>}
                    {props.hasNews && <div className={styles.newsBadge}>{'ニュース'}</div>}
                </div>
            </div>
            <p className={styles.description}>{props.description}</p>
        </Link>
    )
}
