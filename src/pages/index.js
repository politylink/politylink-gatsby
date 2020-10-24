import React from "react"
import Layout from "../components/layout"
import styles from "./index.module.css"

export default function Landing() {
    return (
        <Layout white>
            <div className={styles.container}>
                <h1 className={styles.h1}>
                    PolityLinkは<br/>
                    政治に関する情報を整理し<br/>
                    アクセスしやすくします。
                </h1>
                <div className={styles.tile}>
                    aaa
                </div>
                <div className={styles.tile}>
                    bbb
                </div>
            </div>
        </Layout>
    )
}