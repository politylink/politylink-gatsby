import React from "react"
import styles from "./billCardV2.module.css"
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const statusStyles = [styles.status0, styles.status1, styles.status2, styles.status3, styles.status4, styles.status5]
const statusLabels = ["提出", "衆委可決", "衆可決", "参委可決", "参可決", "公布"]

export default function BillCardV2(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.badges}>
                <div className={styles.badge}>{props.billNumberShort}</div>
                <div className={statusStyles[statusLabels.findIndex(e => e === props.status)]}>{props.status}</div>
                {props.tags.map((tag) => {
                    return <div className={styles.tagBadge} key={tag}>{tag}</div>;
                })}
            </div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.fragment} dangerouslySetInnerHTML={{__html: props.fragment}}/>
            <div className={styles.icons}>
                {props.totalPdfs > 0 &&
                <FontAwesomeIcon icon="file-pdf" size="lg" className={styles.icon} title={`PDF${props.totalPdfs}件`}/>
                }
                {props.totalMinutes > 0 &&
                <FontAwesomeIcon icon="landmark" size="lg" className={styles.icon} title={`会議録${props.totalNews}件`}/>
                }
                {props.totalNews > 0 &&
                <FontAwesomeIcon icon="newspaper" size="lg" className={styles.icon} title={`ニュース${props.totalNews}件`}/>
                }
                <div className={styles.date}>{`${props.lastUpdatedDate} 更新`}</div>
            </div>
        </Link>
    );
}
