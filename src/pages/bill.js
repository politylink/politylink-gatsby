import React from "react"
import styles from "./bill.module.css"

export default function Bill({ data }) {
    const bill = data.politylink.allBills[0]
    return (
        <div className={styles.container}>
            <h2 className={styles.name}>{ bill.name }</h2>
            <h3 className={styles.number}>{ bill.billNumber }</h3>
            <p className={styles.reason}>{ bill.reason }</p>
        </div>
    )
}

export const query = graphql`
{
  politylink {
    allBills(filter:{id:"Bill:WdefPalfunUEElfjYpFx3Q"}){
      name
      billNumber
      reason
    }
  }
}
`