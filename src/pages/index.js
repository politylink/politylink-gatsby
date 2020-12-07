import React from "react"
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Layout from "../components/layout"
import styles from "./index.module.css"
import SEO from "../components/seo";

export default function Landing() {
    return (
        <Layout white>
            <SEO image={`https://politylink.jp/landing.png`}/>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topText}>
                        <h2 className={styles.h2}>
                            政治と、
                            <br/>
                            向き合おう
                        </h2>
                        <p className={styles.p}>
                            国会で今、何が起こっているのか？どんな法律が成立したのか？
                            <br/><br/>
                            政治についてもっと知りたいけれど、どのサイトを見れば良いのか分からない、
                            知りたい情報がバラバラに散らばっていて大変、というあなたへ。
                            <br/><br/>
                            PolityLinkは、政治に関する様々な情報を整理し、アクセスしやすくしたポータルサイトです。
                            <br/>
                        </p>
                    </div>
                    <img className={styles.topImage} src={"/top.jpg"} alt={"PolityLink"} width={493} height={340} decoding="async"/>
                </div>
                <div className={styles.contents}>
                    <h3 className={styles.h3}>
                        できること
                    </h3>
                    <div className={styles.content}>
                        <img className={styles.contentImage} src={"/content1.png"} alt={"法律案ページ"} width={464} height={485} loading="lazy" decoding="async"/>
                        <div className={styles.contentText}>
                            <Link to={"/bills"} className={styles.contentLink}>
                                <h4 className={styles.h4}>
                                    <FontAwesomeIcon icon="arrow-circle-right" size="lg" color="#174a5c"/> 法律案ページ
                                </h4>
                            </Link>
                            <p className={styles.p}>
                                国会に提出された法律案の内容や審議状況を確認できます。
                                <br/>
                                <br/>
                                法律案の本文は衆議院・参議院のサイトから、関連資料は担当省庁のサイトから、
                                議論された会議録は国会会議録検索システムから、それぞれ取得し、
                                1つのページに分かりやすくまとめています。
                                <br/>
                            </p>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <img className={styles.contentImage} src={"/content2.png"} alt={"国会タイムライン"} width={464} height={485} loading="lazy" decoding="async"/>
                        <div className={styles.contentText}>
                            <Link to={"/timelines"} className={styles.contentLink}>
                                <h4 className={styles.h4}>
                                    <FontAwesomeIcon icon="arrow-circle-right" size="lg" color="#174a5c"/> 国会タイムライン
                                </h4>
                            </Link>
                            <p className={styles.p}>
                                今日はどんな会議が開催されたか？成立した法律案はあるか？
                                <br/>
                                国会に関する最新情報をその日のニュース記事と一緒にチェックできます。
                                <br/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}