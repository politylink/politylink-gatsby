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

export const EnterSearchBox = (props) => {
    return (
        <input
            className={styles.box}
            type="text"
            key={props.value}  // to trigger render
            defaultValue={props.value}
            placeholder={props.placeholder}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    const query = event.target.value;
                    props.handleQuery(query)
                }
            }}
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