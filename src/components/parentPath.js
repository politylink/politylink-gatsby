import styles from "./parentPath.module.css";
import React from "react";
import {Link} from "gatsby";

export default function ParentPath({to, text}) {
    return (
        <div className={styles.container}>
            <Link to={to} className={styles.link}>
                <p className={styles.text}>{'> ' + text}</p>
            </Link>
        </div>
    );
}