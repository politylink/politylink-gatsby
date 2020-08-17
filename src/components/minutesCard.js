import React from "react"
import styles from "./minutesCard.module.css"


export default function MinutesCard(props) {
    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <div className={styles.header}>
                <div className={styles.date}>{props.date}</div>
                <div className={styles.name}>{props.name}</div>
            </div>
            <ul>
                {props.topics.map((topic) => {
                    return <li className={styles.topic}>{topic}</li>
                })}
            </ul>
        </a>
    );
}