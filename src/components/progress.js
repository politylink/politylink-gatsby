import React from "react"
import styles from "./progress.module.css"

const bodyStyles = [styles.body0, styles.body1, styles.body2, styles.body3, styles.body4, styles.body5]
const tailStyles = [styles.tail0, styles.tail1, styles.tail2, styles.tail3, styles.tail4, styles.tail5]

export const ProgressArrow = (props) => {
    return (
        <div>
            <div className={styles.title}>
                {props.title.split("\n").map((key) => {
                    return <p className={styles.p}>{key}</p>
                })}
            </div>
            <div className={styles.arrow}>
                <div className={bodyStyles[props.color % bodyStyles.length]}>
                    {props.value.split("\n").map((key) => {
                        return <p className={styles.p}>{key}</p>
                    })}
                </div>
                <div className={tailStyles[props.color % tailStyles.length]}></div>
            </div>
        </div>
    )
}

export default function ProgressBadge(props) {
    return (
        <div className={styles.badge}>
            {props.arrows.map(({title, value, color}) => {
                return <ProgressArrow title={title} value={value} color={color} />;
            })}
        </div>
    );
}