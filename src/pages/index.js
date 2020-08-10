import React from "react"
import Card from "../components/card"
import Container from "../components/container"
import { SearchBox, SearchResult } from "../components/search"
import SEO from "../components/seo"

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem('bq')) || '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        typeof window !== 'undefined' && localStorage.setItem('bq', event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterBills(bills) {
      return (bills
        .filter((bill) => {
            return (bill.billNumber+bill.name+bill.reason).indexOf(this.state.filterText) !== -1
        })
      );
    }

    render() {
        const filteredBills = this.filterBills(this.props.data.politylink.allBills)
        return (
            <div>
                <SEO/>
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