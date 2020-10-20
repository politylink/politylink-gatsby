import React from "react"
import {graphql} from 'gatsby'
import CommitteeCard from "../components/committeeCard"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"
import {buildPath} from "../utils/urlutils";
import {COMMITTEE_QUERY_KEY} from "../utils/constants";
import {getCommitteesDescription} from "../utils/seoutils";
import {joinNullableStringList} from "../utils/formatutils";
import {isMatch} from "../utils/searchutils";


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem(COMMITTEE_QUERY_KEY)) || '',
        }
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput(event) {
        typeof window !== 'undefined' && localStorage.setItem(COMMITTEE_QUERY_KEY, event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterCommittees(committees) {
        return (committees
                .filter((committee) => {
                    const joinedText = committee.name + committee.description
                        + joinNullableStringList(committee.aliases) + joinNullableStringList(committee.topics)
                    return isMatch(this.state.filterText, joinedText)
                })
        );
    }

    render() {
        const filteredCommittees = this.filterCommittees(this.props.data.politylink.Committee)
        return (
            <Layout>
                <SEO description={getCommitteesDescription()}/>
                <FlexContainer>
                    <SearchBox
                        handleChange={this.handleTextInput}
                        value={this.state.filterText}
                        placeholder="委員会から検索"
                    />
                    <SearchResult value={filteredCommittees.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredCommittees.map((committee) => {
                        return <CommitteeCard
                            title={committee.name}
                            to={buildPath(committee.id)}
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
                description
                topics
            }
        }
    }
`
