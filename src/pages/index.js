import React from "react"
import Card from "../components/card"
import Container from "../components/container"
import { SearchBox, SearchResult } from "../components/search"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: localStorage.getItem('bq') || '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        localStorage.setItem('bq', event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterBills(bills, text) {
      return (bills
        .filter((bill) => {
            return (bill.billNumber+bill.name+bill.reason).indexOf(text) !== -1
        })
      );
    }

    render() {
        const filteredBills = this.filterBills(this.props.data.politylink.allBills, this.state.filterText)
        return (
            <div>
                <Container>
                    <SearchBox handleChange={this.handleChange} value={this.state.filterText}/>
                    <SearchResult value={filteredBills.length + '件表示'}/>
                </Container>
                <Container>
                    {filteredBills.map((bill) => {
                        return <Card
                          title={bill.billNumber}
                          description={bill.name}
                          href={"/bill/" + bill.id.split(':').pop()}
                        />;
                    })}
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
      reason
    }
  }
}
`