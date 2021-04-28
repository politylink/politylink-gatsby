import React from "react";
import { Link } from "gatsby";
import { buildImagePath } from "../utils/urlutils";
import styles from "./memberCard.module.css";
import LazyLoad from 'react-lazyload';

export default function MemberCard(props) {
    const house = props.house === 'REPRESENTATIVES' ? '衆' : '参'
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.icon}>
                <LazyLoad once height={40}>
                    <img className={styles.image} src={buildImagePath(props.id)} alt={'顔写真'} />
                </LazyLoad>
            </div>
            <div className={styles.title}>
                <p className={styles.titletext}>{props.title}</p>
            </div>
            {props.tags && <div>
                <p className={styles.subtitletext}>{house}・{props.tags[0]}</p>
            </div>}
        </Link>
    );
}