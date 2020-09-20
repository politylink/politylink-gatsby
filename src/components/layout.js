import React from "react"
import {Link} from "gatsby"
import styles from "./layout.module.css"

export default function Layout({children}) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.home}>
                    <Link to='/' className={styles.link}>
                        <p className={styles.hometext}>PolityLink</p>
                    </Link>
                </div>
                <div className={styles.nav}>
                    <Link to='/' className={styles.link}>
                        <p className={styles.navtext}>議案一覧</p>
                    </Link>
                    <Link to='/committees' className={styles.link}>
                        <p className={styles.navtext}>委員会一覧</p>
                    </Link>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <p>© 2020 PolityLink</p>
                <div className={styles.fnav}>
                    <Link to='/' className={styles.link}>
                        <p className={styles.fnavtext}>議案一覧</p>
                    </Link>
                    <Link to='/committees' className={styles.link}>
                        <p className={styles.fnavtext}>委員会一覧</p>
                    </Link>
                    <Link to='/about' className={styles.link}>
                        <p className={styles.fnavtext}>PolityLinkについて</p>
                    </Link>
                </div>
            </footer>
        </div>
    )
}