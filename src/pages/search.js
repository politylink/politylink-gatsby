import React from "react"
import Card from "../components/card"
import Container from "../components/container"

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

    filterBill(data) {
        return (data
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
                <input 
                    type="text"
                    placeholder="Type to filter"
                    onChange={this.handleChange}
                />
                <Container>
                    {this.filterBill(this.props.data.politylink.allBills)}
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