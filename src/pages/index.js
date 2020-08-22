import React from "react"
import {graphql} from 'gatsby'
import BillCard from "../components/billCard"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchFilter, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"

const isPassedBill = (bill) => {
    return bill.proclaimedDate.year != null
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem('bq')) || '',
            filterPassed: (typeof window !== 'undefined' && localStorage.getItem('bp') === 'true') || false,
        }
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this)
    }

    handleTextInput(event) {
        typeof window !== 'undefined' && localStorage.setItem('bq', event.target.value);
        this.setState({filterText: event.target.value});
    }

    handleFilterClick() {
        const newVal = !this.state.filterPassed
        typeof window !== 'undefined' && localStorage.setItem('bp', newVal.toString());
        this.setState({filterPassed: newVal})
    }

    filterBills(bills) {
        return (bills
                .filter((bill) => {
                    return (bill.billNumber + bill.name + bill.alias + bill.reason).indexOf(this.state.filterText) !== -1
                })
                .filter((bill) => {
                    return isPassedBill(bill) || !this.state.filterPassed
                })
        );
    }

    render() {
        const filteredBills = this.filterBills(this.props.data.politylink.Bill)
        return (
            <Layout>
                <SEO/>
                <FlexContainer>
                    <SearchBox
                        handleChange={this.handleTextInput}
                        value={this.state.filterText}
                    />
                    <SearchFilter
                        handleChange={this.handleFilterClick}
                        checked={this.state.filterPassed}
                        label={'成立した議案のみを表示'}
                    />
                    <SearchResult value={filteredBills.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredBills.map((bill) => {
                        return <BillCard
                            title={bill.billNumber}
                            description={bill.name}
                            isPassed={isPassedBill(bill)}
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
            Bill {
                id
                name
                billNumber
                reason
                alias
                proclaimedDate {
                    year
                }
            }
        }
    }
`
