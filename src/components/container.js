import React from "react"
import styles from "./container.module.css"

export const Container = ({children}) => {
    return <div className={styles.default}>{children}</div>
}

export const FlexContainer = ({children}) => {
    return <div className={styles.flex}>{children}</div>
}

export const SpaceContainer = ({children}) => {
    return <div className={styles.space}>{children}</div>
}