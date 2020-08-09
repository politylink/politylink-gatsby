import React from "react"
import styles from "./card.module.css"

export default function Card(props) {
    return (
        <a className={styles.card} href={props.href}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.description}>{props.description}</p>
        </a>
    )
}