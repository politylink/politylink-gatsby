import React from "react"
import styles from "./minutesCard.module.css"
import {Link} from "gatsby"
import {translateBillActionType, trimTopics} from "../utils/formatutils";
import {sortBillActions} from "../utils/sortutils";

export default function MinutesCard(props) {
    const topics = props.topics ? trimTopics(props.topics, 3) : ['議題未登録']
    const billActions = props.billActions ? sortBillActions(props.billActions) : []
    return (
        <Link className={styles.card} to={props.to}>
            <div>
                <div className={styles.header}>
                    {billActions.reduce((result, billAction) => {
                        const billActionType = translateBillActionType(billAction.type)
                        if (billActionType) {
                            result.push(<div className={styles.billActionBadge}> {billActionType}</div>)
                        }
                        return result
                    }, [])}
                    {props.hasNews && <div className={styles.newsBadge}>{'ニュース'}</div>}
                </div>

                <p className={styles.name}>{props.name}</p>
                <p className={styles.date}>{props.date}</p>

                <div className={styles.body}>
                    {props.wordcloud != null &&
                    <img className={styles.wordcloud} src={props.wordcloud} alt={props.id}/>}
                    <ul className={styles.topics}>
                        {topics.map((topic) => {
                            return <li className={styles.topic}>{topic}</li>
                        })}
                    </ul>
                </div>
            </div>
        </Link>
    );
}