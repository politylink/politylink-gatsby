import React from "react"
import styles from "./card.module.css"
import { Link } from "gatsby"

export default function Card(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.description}>{props.description}</p>
        </Link>
    )
}
