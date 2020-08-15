import React from "react"
import {graphql} from 'gatsby'
import Card from "../components/card"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"

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
                    return (bill.billNumber + bill.name + bill.reason).indexOf(this.state.filterText) !== -1
                })
        );
    }

    render() {
        const filteredBills = this.filterBills(this.props.data.politylink.allBills)
        return (
            <Layout>
                <SEO/>
                <FlexContainer>
                    <SearchBox handleChange={this.handleChange} value={this.state.filterText}/>
                    <SearchResult value={filteredBills.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredBills.map((bill) => {
                        return <Card
                            title={bill.billNumber}
                            description={bill.name}
                            to={"/bill/" + bill.id.split(':').pop()}
                        />;
                    })}
                </FlexContainer>
            </Layout>
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
