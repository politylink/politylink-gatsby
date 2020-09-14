import React from "react"
import styles from "./discussedBillCard.module.css"
import {Link} from "gatsby"

export default function DiscussedBillCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.header}>
                <div className={styles.billNumber}>{props.billNumber}</div>
            </div>
            <p className={styles.name}>{props.name}</p>
        </Link>
    )
}