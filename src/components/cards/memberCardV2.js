import React from "react"
import styles from "./memberCardV2.module.css"
import {Link} from "gatsby"
import {buildImagePath} from "../../utils/urlUtils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function MemberCardV2(props) {
    return (
        <Link className={styles.card} to={props.to}>
            <div className={styles.main}>
                <div>
                    <img className={styles.image} src={buildImagePath(props.id, 'jpg')} alt={'顔写真'}/>
                </div>
                <div className={styles.mainText}>
                    <div className={styles.name}>{props.name}</div>
                    <div className={styles.fragment} dangerouslySetInnerHTML={{__html: props.fragment}}/>
                </div>
            </div>
            {props.activity &&
            <div className={styles.activity}>
                {props.activity.date}&nbsp;
                {props.activity.type === 'minutes' &&
                <FontAwesomeIcon icon="microphone" size="sm"/>
                }
                {props.activity.type === 'bill' &&
                <FontAwesomeIcon icon="sticky-note" size="sm"/>
                }
                &nbsp;{props.activity.message}
            </div>
            }
        </Link>
    );
}
