import React from "react"
import Card from "../components/card"
import Container from "../components/container"

export default function Home( {data} ) {
  console.log(data)
  return (
    <Container>
      {data.politylink.allBills.map(({ name, billNumber }) => (
          <Card title={billNumber} description={name} />
      ))}
    </Container>
  )
}

export const query = graphql`
{
  politylink {
    allBills {
      name
      billNumber
    }
  }
}
`