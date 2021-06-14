import React from "react"
import {graphql} from 'gatsby'
import CommitteeCard from "../components/cards/committeeCard"
import {FlexContainer} from "../components/layouts/container"
import {SearchBox, SearchResult} from "../components/filters/search"
import SEO from "../components/seo"
import Layout from "../components/layouts/layout"
import {buildPath} from "../utils/urlUtils";
import {COMMITTEE_QUERY_KEY} from "../utils/constants";
import {getCommitteesDescription} from "../utils/seoUtils";
import {joinNullableStringList} from "../utils/formatUtils";
import {isMatch} from "../utils/searchUtils";


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
                        placeholder="委員会を検索"
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
