import React from "react"
import styles from "./minutesTimelineCard.module.css"
import {translateBillActionType} from "../utils/formatutils";
import {sortBillActions} from "../utils/sortutils";

/**
 * split BillActions into subsets for minutes timeline
 * BillActions in the same subset should belong to the same bill
 *
 * @returns list of list of BillActions
 */
export const organizeBillActions = (billActions) => {
    const organized = []
    let billId = null
    let subset = []
    for (const billAction of sortBillActions(billActions)) {
        if (billId !== billAction.belongedToBill.id) {
            if (subset.length > 0) {
                organized.push(subset)
            }
            billId = billAction.belongedToBill.id
            subset = []
        }
        subset.push(billAction)
    }
    if (subset.length > 0) {
        organized.push(subset)
    }
    return organized;
}

export default function MinutesTimelineCard(props) {
    const organizedBillActions = organizeBillActions(props.billActions)
    return (
        <div className={styles.timeline}>
            {organizedBillActions.map((billActions) => {
                return (
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <h4>{billActions[0].belongedToBill.name}</h4>
                            <div className={styles.linkBadges}>
                                {billActions.map((billAction) => {
                                    return <a className={styles.linkBadge} href={billAction.belongedToSpeech.ndlUrl}
                                              target="_blank" rel="noopener noreferrer">
                                        <p className={styles.linkBadgeText}>{translateBillActionType(billAction.type)}</p>
                                    </a>
                                })}
                            </div>
                        </div>
                    </div>
                )
            })};
        </div>
    );
}