import React from "react"
import {graphql} from 'gatsby'
import MemberCard from "../components/memberCard"
import {FlexContainer} from "../components/container"
import {SearchBox, SearchResult} from "../components/search"
import SEO from "../components/seo"
import Layout from "../components/layout"
import {buildPath} from "../utils/urlutils";
import {MEMBER_QUERY_KEY} from "../utils/constants";
import {joinNullableStringList} from "../utils/formatutils";
import {isMatch} from "../utils/searchutils";
import {getMembersDescription} from "../utils/seoutils";
import styles from "./members.module.css"


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: (typeof window !== 'undefined' && localStorage.getItem(MEMBER_QUERY_KEY)) || '',
        }
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput(event) {
        typeof window !== 'undefined' && localStorage.setItem(MEMBER_QUERY_KEY, event.target.value);
        this.setState({filterText: event.target.value});
    }

    filterMembers(members) {
        return (members
                .filter((member) => {
                    const joinedText = member.name + member.nameHira + member.description
                        + joinNullableStringList(member.tags)
                    return isMatch(this.state.filterText, joinedText)
                })
        );
    }

    render() {
        const filteredMembers = this.filterMembers(this.props.data.politylink.Member)
        return (
            <Layout>
                <SEO description={getMembersDescription()}/>
                <FlexContainer>
                    <SearchBox
                        handleChange={this.handleTextInput}
                        value={this.state.filterText}
                        placeholder="国会議員を検索"
                    />
                    <SearchResult value={filteredMembers.length + '件表示'}/>
                </FlexContainer>
                <div className={styles.container}>
                    <FlexContainer>
                        {filteredMembers.map((member) => {
                            return <MemberCard
                                title={member.name}
                                to={buildPath(member.id)}
                            />;
                        })}
                    </FlexContainer>
                </div>
            </Layout>
        )
    }
}

export const query = graphql`
    {
        politylink {
            Member(orderBy:[nameHira_asc]) {
                id
                name
                nameHira
                description
                image
                tags
            }
        }
    }
`
