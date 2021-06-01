import styles from "./activityCard.module.css";
import React from "react";
import {formatDate} from "../../utils/dateUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "gatsby";
import {buildPath} from "../../utils/urlUtils";

export const MinutesActivityCard = (props) => {
    return (<div className={styles.activity}>
        {formatDate(props.datetime)}
        <div>
            &nbsp;<FontAwesomeIcon icon="microphone" size="sm"/>&nbsp;
            <Link className={styles.link}
                  to={buildPath(props.minutes.id)}>{props.minutes.name}</Link>
            で発言しました
            {props.urls.length > 0 &&
            <span>
                （{props.urls
                .map(url => <a className={styles.link} href={url.url} target="_blank"
                               rel="noopener noreferrer">{url.title}</a>)
                .reduce((prev, curr) => [prev, '、', curr])}）
            </span>
            }
            <br/>
            <span className={styles.keyphrases}>
                {props.keyphrases !== null && '　' + props.keyphrases.join('、')}
            </span>
        </div>
    </div>)
}

export const BillActivityCard = (props) => {
    return (<div className={styles.activity}>
        {formatDate(props.datetime)}
        <div>
            &nbsp;<FontAwesomeIcon icon="sticky-note" size="sm"/>&nbsp;
            <Link className={styles.link}
                  to={buildPath(props.bill.id)}>{props.bill.name}</Link>
            を提出しました
            {props.urls.length > 0 &&
            <span>
                （{props.urls
                .map(url => <a className={styles.link} href={url.url} target="_blank"
                               rel="noopener noreferrer">{url.title}</a>)
                .reduce((prev, curr) => [prev, '、', curr])}）
            </span>
            }
        </div>
    </div>)
}
