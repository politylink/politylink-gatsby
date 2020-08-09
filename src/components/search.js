import React from "react"
import styles from "./search.module.css"

export default function Search(props) {
    return (
        <input
            className={styles.input}
            type="text"
            placeholder="議案を検索"
            onChange={props.handleChange}
        />
    )
}