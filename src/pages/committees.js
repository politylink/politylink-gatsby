import React from "react"
import {graphql} from 'gatsby'
import CommitteesCard from "../components/committeesCard"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem('bq')) || '',
            filterPassed: (typeof window !== 'undefined' && localStorage.getItem('bp') === 'true') || false,
        }
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput(event) {
        typeof window !== 'undefined' && localStorage.setItem('bq', event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterCommittees(committees) {
        return (committees
                .filter((committees) => {
                    return (committees.name + committees.aliases + committees.matters).indexOf(this.state.filterText) !== -1
                })
        );
    }

    render() {
        const filteredCommittees = this.filterCommittees(this.props.data.politylink.Committee)
        return (
            <Layout>
                <SEO/>
                <FlexContainer>
                    <SearchBox
                        handleChange={this.handleTextInput}
                        value={this.state.filterText}
                        placeholder="第201回国会の委員会から検索"
                    />
                    <SearchResult value={filteredCommittees.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredCommittees.map((committees) => {
                        return <CommitteesCard
                            title={committees.name}
                            to={"/committees/"}
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
            Committee {
                id
                name
                aliases
                matters
            }
        }
    }
`
