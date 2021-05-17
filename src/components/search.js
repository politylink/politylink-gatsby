import React from "react"
import styles from "./search.module.css"

export const SearchBox = (props) => {
    return (
        <input
            className={styles.box}
            type="text"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.handleChange}
        />
    )
}

export const SearchBoxKey = (props) => {
    return (
        <input
            className={styles.box}
            type="text"
            defaultValue={props.value}
            placeholder={props.placeholder}
            onKeyPress={props.handleKeyPress}
        />
    )
}

export const SearchFilter = (props) => {
    return (
        <label className={styles.filter}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.handleChange}
            />
            {props.label}
        </label>
    )
}

export const SearchResult = (props) => {
    return <p className={styles.result}>{props.value}</p>;
}