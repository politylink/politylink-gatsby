import React from "react"
import Card from "../components/card"
import Container from "../components/container"

export default function Home({ data }) {
  return (
    <Container>
      {data.politylink.allBills.map(({ id, name, billNumber }) => (
          <Card title={billNumber} description={name} href={"/bill/" + id.split(':').pop()} />
      ))}
    </Container>
  )
}

export const query = graphql`
{
  politylink {
    allBills {
      id
      name
      billNumber
    }
  }
}
`