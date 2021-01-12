import React from "react"
import {Link} from "gatsby"
import styles from "./layout.module.css"
import HamburgerMenu from "./menu";
import "../utils/fontawesome";

export default function Layout(props) {
    return (
        <div className={styles.page}>
            <HamburgerMenu/>
            <header className={styles.header}>
                <div className={styles.home}>
                    <Link to='/' className={styles.link}>
                        <p className={styles.hometext}>PolityLink</p>
                    </Link>
                </div>
            </header>
            <main className={props.white !== undefined ? styles.whiteMain : styles.main}>
                {props.children}
            </main>
            <footer className={styles.footer}>
                <p>© 2020 PolityLink</p>
                <div className={styles.fnav}>
                    <Link to='/bills' className={styles.link}>
                        <p className={styles.fnavtext}>法律案一覧</p>
                    </Link>
                    <Link to='/members' className={styles.link}>
                        <p className={styles.fnavtext}>議員一覧</p>
                    </Link>
                    <Link to='/committees' className={styles.link}>
                        <p className={styles.fnavtext}>委員会一覧</p>
                    </Link>
                    <Link to='/timelines' className={styles.link}>
                        <p className={styles.fnavtext}>国会タイムライン</p>
                    </Link>
                    <Link to='/calender' className={styles.link}>
                        <p className={styles.fnavtext}>法律案カレンダー</p>
                    </Link>
                    <Link to='/articles' className={styles.link}>
                        <p className={styles.fnavtext}>国会コラム</p>
                    </Link>
                    <Link to='/about' className={styles.link}>
                        <p className={styles.fnavtext}>PolityLinkについて</p>
                    </Link>
                </div>
            </footer>
        </div>
    )
}