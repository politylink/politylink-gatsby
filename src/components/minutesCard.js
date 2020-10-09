import React from "react"
import styles from "./minutesCard.module.css"
import {Link} from "gatsby"


export default function MinutesCard(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.header}>
                <div>
                    <p className={styles.name}>{props.name}</p>
                    <p className={styles.date}>{props.date}</p>
                </div>
                <div className={styles.headerBadge}>
                    {props.hasNews && <div className={styles.newsBadge}>{'ニュース'}</div>}
                </div>
            </div>
            <ul className={styles.topics}>
                {props.topics.map((topic) => {
                    return <li className={styles.topic}>{topic}</li>
                })}
            </ul>
        </Link>
    );
}