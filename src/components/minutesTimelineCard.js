import React from "react"
import styles from "./minutesTimelineCard.module.css"
import {translateBillActionType} from "../utils/formatutils";
import {sortBillActions} from "../utils/sortutils";

export const organizeBillActions = (billActions) => {
    let currentBill = null
    let organizedBillActions = []
    let billActionsTmp
    for (let i = 0; i < billActions.length; i++) {
        if (!currentBill || currentBill !== billActions[i].belongedToBill.id) {
            if (currentBill)
                organizedBillActions.push(billActionsTmp)
            billActionsTmp = [billActions[i]]
            currentBill = billActions[i].belongedToBill.id
        } else {
            billActionsTmp.push(billActions[i])
        }
    }
    organizedBillActions.push(billActionsTmp)
    return organizedBillActions;
}

export default function MinutesTimelineCard(props) {
    const organizedBillActions = organizeBillActions(sortBillActions(props.billActions))
    return (
        <div className={styles.timeline}>
            {organizedBillActions.map((billActions) => {
                return (
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <h3>{billActions[0].belongedToBill.name}</h3>
                            {billActions.map((billAction) => {
                                return <p><a className={styles.linkBadge} href={billAction.belongedToSpeech.ndlUrl}
                                             target="_blank" rel="noopener noreferrer">
                                    {translateBillActionType(billAction.type)}
                                </a></p>
                            })}
                        </div>
                    </div>
                )
            })};
        </div>
    );
}