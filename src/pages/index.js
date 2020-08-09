import React from "react"
import Card from "../components/card"
import Container from "../components/container"
import Search from "../components/search"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({filterText: event.target.value});
    }

    buildBillCards(bills) {
        return (bills
            .filter((bill) => {
                return (bill.billNumber+bill.name).indexOf(this.state.filterText) !== -1
            })
            .map((bill) => {
                return <Card 
                    title={bill.billNumber}
                    description={bill.name}
                    href={"/bill/" + bill.id.split(':').pop()} 
                />
            })
        )
    } 

    render() {
        return (
            <div>
                <Container>
                    <Search handleChange={this.handleChange}/>
                </Container>
                <Container>
                    {this.buildBillCards(this.props.data.politylink.allBills)}
                </Container>
            </div>
        )
    }
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