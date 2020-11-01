import React from "react"
import styles from "./minutesCard.module.css"
import {Link} from "gatsby"
import {trimTopics} from "../utils/formatutils";


export default function MinutesCard(props) {
    const topics = props.topics ? trimTopics(props.topics, 3) : ['議題未登録']
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
                {topics.map((topic) => {
                    return <li className={styles.topic}>{topic}</li>
                })}
            </ul>
        </Link>
    );
}