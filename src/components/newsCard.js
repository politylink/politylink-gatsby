import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./newsCard.module.css"

export default function NewsCard(props) {
    let thumbnail
    if (props.publisher === '日経新聞') { // we have problem accessing nikkei thumbnail
        thumbnail = 'https://assets.nikkei.jp/release/v3.2.118/parts/ds/images/common/icon_ogpnikkei.png'
    } else if (props.thumbnail == null) {
        thumbnail = '/noimage.png'
    } else {
        thumbnail = props.thumbnail
    }
    let publisher
    if (props.publisher == null) {
        if (props.href.includes('mainichi')) {
            publisher = '毎日新聞'
        } else {
            publisher = ''
        }
    } else {
        publisher = props.publisher
    }

    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <img className={styles.thumbnail} src={thumbnail} alt={"thumbnail"}/>
            <div className={styles.body}>
                <p className={styles.title}>{props.title}</p>
                <p className={styles.info}>
                    {props.isPaid && <FontAwesomeIcon icon="lock"/>}
                    {" " + publisher + " " + props.publishedAt}
                </p>
            </div>
        </a>
    )
}