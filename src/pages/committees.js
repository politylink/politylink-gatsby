import React from "react"
import {graphql} from 'gatsby'
import CommitteeCard from "../components/committeeCard"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem(this.localStorageKey)) || '',
        }
        this.handleTextInput = this.handleTextInput.bind(this);
        this.localStorageKey = 'cq';
    }

    handleTextInput(event) {
        typeof window !== 'undefined' && localStorage.setItem(this.localStorageKey, event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterCommittees(committees) {
        return (committees
                .filter((committee) =>  {
                    let aliases;
                    committee.aliases != null ? aliases=committee.aliases.join('') : aliases='';
                    let matters;
                    committee.matters != null ? matters=committee.matters.join('') : matters='';
                    return (committee.name + aliases + matters).indexOf(this.state.filterText) !== -1
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
                        placeholder="委員会から検索"
                    />
                    <SearchResult value={filteredCommittees.length + '件表示'}/>
                </FlexContainer>
                <FlexContainer>
                    {filteredCommittees.map((committees) => {
                        return <CommitteeCard
                            title={committees.name}
                            to={"/committees/" + committees.id.split(':').pop()}
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
