import React from "react"
import styles from "./newsCard.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

export default function NewsCard(props) {
    return (
        <a className={styles.card} href={props.href} target="_blank" rel="noopener noreferrer">
            <img className={styles.thumbnail} src={props.thumbnail} alt={"thumbnail"}/>
            <div className={styles.body}>
                <p className={styles.title}>{props.title}</p>
                <p className={styles.info}>
                    {props.isPaid && <FontAwesomeIcon icon={faLock}/>}
                    {" " + props.publisher + " " + props.publishedAt}
                </p>
            </div>
        </a>
    )
}