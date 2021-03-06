import React from "react"
import {graphql} from 'gatsby'
import BillCard from "../../components/cards/billCard"
import {FlexContainer} from "../../components/layouts/container"
import {SearchBox, SearchFilter, SearchResult} from "../../components/filters/search"
import SEO from "../../components/seo"
import Layout from "../../components/layouts/layout"
import {buildPath} from "../../utils/urlUtils";
import {BILL_PASSED_KEY, BILL_QUERY_KEY} from "../../utils/constants";
import {getBillsDescription} from "../../utils/seoUtils";
import {joinNullableStringList} from "../../utils/formatUtils";
import {isMatch} from "../../utils/searchUtils";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem(BILL_QUERY_KEY)) || '',
            filterPassed: (typeof window !== 'undefined' && localStorage.getItem(BILL_PASSED_KEY) === 'true') || false,
        }
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }

    handleTextInput(event) {
        const newVal = event.target.value
        typeof window !== 'undefined' && localStorage.setItem(BILL_QUERY_KEY, newVal);
        this.setState({filterText: newVal});
    }

    handleFilterClick(event) {
        const newVal = event.target.checked
        typeof window !== 'undefined' && localStorage.setItem(BILL_PASSED_KEY, newVal.toString());
        this.setState({filterPassed: newVal})
    }

    filterBills(bills) {
        return (bills
                .filter((bill) => {
                    const joinedText = bill.billNumber + bill.name + bill.reason
                        + joinNullableStringList(bill.aliases) + joinNullableStringList(bill.tags)
                    return isMatch(this.state.filterText, joinedText)
                })
                .filter((bill) => {
                    return bill.isPassed || !this.state.filterPassed
                })
        );
    }

    render() {
        const filteredBills = this.filterBills(this.props.data.politylink.Bill)
        return (
            <Layout>
                <SEO description={getBillsDescription()}/>
                <FlexContainer>
                    <SearchBox
                        handleChange={this.handleTextInput}
                        value={this.state.filterText}
                        placeholder="第201回国会以降の法律案を検索"
                    />
                    <SearchFilter
                        handleChange={this.handleFilterClick}
                        checked={this.state.filterPassed}
                        label={'成立した法律案のみを表示'}
                    />
                    <SearchResult value={filteredBills.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredBills.map((bill) => {
                        return <BillCard
                            title={bill.billNumber}
                            description={bill.name}
                            isPassed={bill.isPassed}
                            hasNews={bill.totalNews > 0}
                            to={buildPath(bill.id)}
                            key={bill.id}
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
            Bill (orderBy:[submittedDate_desc]) {
                id
                name
                billNumber
                reason
                aliases
                tags
                isPassed
                totalNews
            }
        }
    }
`
