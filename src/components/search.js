import React from "react"
import styles from "./search.module.css"

export const SearchBox = (props) => {
    return (
        <input
            className={styles.box}
            type="text"
            value={props.value}
            placeholder="議案を検索"
            onChange={props.handleChange}
        />
    )
}

export const SearchResult = (props) => {
    return <p className={styles.result}>{props.value}</p>;
}