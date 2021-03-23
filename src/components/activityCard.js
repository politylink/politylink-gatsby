import styles from "./activityCard.module.css";
import React from "react";
import {formatDate} from "../utils/dateutils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "gatsby";
import {buildPath} from "../utils/urlutils";

export const MinutesActivityCard = (props) => {
    return (<p className={styles.minutes_activity}>
        {formatDate(props.datetime)}
        <div>
            &nbsp;<FontAwesomeIcon icon="microphone" size="sm"/>{' '}
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
            <br />
            {props.keyphrases !== null && '　' + props.keyphrases.join('、')}
        </div>
    </p>)
}

export const BillActivityCard = (props) => {
    return (<p className={styles.bill_activity}>
        {formatDate(props.datetime)}
        {' '}<FontAwesomeIcon icon="sticky-note" size="sm"/>{' '}
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
    </p>)
}
