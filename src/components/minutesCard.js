import React from "react"
import styles from "./minutesCard.module.css"
import {Link} from "gatsby"


export default function MinutesCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.header}>
                <div className={styles.name}>{props.name}</div>
            </div>
            <div className={styles.header}>
                <div className={styles.date}>{props.date}</div>
            </div>
            <ul>
                {props.topics.map((topic) => {
                    return <li className={styles.topic}>{topic}</li>
                })}
            </ul>
        </Link>
    );
}