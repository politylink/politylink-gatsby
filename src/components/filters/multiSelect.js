import Select from "react-select";
import React from "react";
import styles from "./multiSelect.module.css"

export default function MultiSelect(props) {
    return <Select className={styles.select}
                   value={props.currentOptions}
                   options={props.options}
                   onChange={props.onChange}
                   placeholder={props.placeholder}
                   isMulti={true}
    />
}