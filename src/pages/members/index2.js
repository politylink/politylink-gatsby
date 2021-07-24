import React, {useEffect, useState} from "react"
import Layout from "../../components/layouts/layout";
import SEO from "../../components/seo";
import {getBillsDescription, getBillsTitle} from "../../utils/seoUtils";
import {Container, FlexContainer} from "../../components/layouts/container";
import styles from "./index2.module.css"
import MemberCardV2 from "../../components/cards/memberCardV2";
import {EnterSearchBox, SearchResult} from "../../components/filters/search";
import Pagination from "../../components/navigations/pagination";
import {
    buildMemberUrlParamStr,
    getInitialGroups,
    getInitialPage,
    getInitialQuery,
    groupOptions
} from "../../utils/apiUtils";
import {navigate} from '@reach/router';
import MultiSelect from "../../components/filters/multiSelect";
import {useMediaQuery} from "react-responsive";
import {buildPath} from "../../utils/urlUtils";


const IndexPage = () => {
    const urlStr = typeof window !== 'undefined' ? window.location : 'https://politylink.jp';
    const [members, setMembers] = useState([]);
    const [query, setQuery] = useState(getInitialQuery(urlStr));
    const [groups, setGroups] = useState(getInitialGroups(urlStr));
    const [page, setPage] = useState(getInitialPage(urlStr));
    const [totalMembers, setTotalMembers] = useState(0);
    const isDesktop = useMediaQuery({query: '(min-width: 1100px)'})

    useEffect(() => {
        const urlParamStr = buildMemberUrlParamStr(query, groups, page);
        const fragmentSize = isDesktop ? 100 : 50;
        fetch(`https://api.politylink.jp/members?items=5&fragment=${fragmentSize}&${urlParamStr}`)
            .then(response => response.json())
            .then(data => {
                setMembers(data['members']);
                setTotalMembers(data['totalMembers'])
            });
        if (typeof window !== 'undefined') {
            const url = new URL(window.location);
            const newUrlStr = `${url.origin}${url.pathname}?${urlParamStr}`;
            navigate(newUrlStr, {replace: true});  // TODO: enable browser back
        }
    }, [query, groups, page]);


    return (
        <Layout>
            <SEO image={`https://politylink.jp/bills.png`} twitterType={`summary_large_image`} pageType={`website`}
                 title={getBillsTitle()} description={getBillsDescription()}/>
            <FlexContainer>
                <EnterSearchBox
                    placeholder="名前、政党名、プロフィールで検索"
                    value={query}
                    handleQuery={(query) => {
                        setQuery(query);
                        setPage(1);
                        setMembers([]);
                        setTotalMembers(0);
                    }}
                />
                <SearchResult value={totalMembers + '件'}/>
            </FlexContainer>
            <div className={styles.main}>
                <FlexContainer>
                    {members.map((member) => {
                        return <MemberCardV2
                            id={member.id}
                            name={member.name}
                            fragment={member.fragment}
                            to={buildPath(member.id)}
                            key={member.id}
                            activity={member.activity}
                        />;
                    })}
                </FlexContainer>
                {isDesktop &&
                <div className={styles.filters}>
                    <MultiSelect
                        options={groupOptions}
                        currentOptions={groups}
                        onChange={(props) => {
                            setGroups(props);
                            setPage(1);
                        }}
                        placeholder={"会派を指定"}
                    />
                </div>
                }
            </div>
            <Container>
                <Pagination
                    page={page}
                    pageCount={Math.ceil(totalMembers / 5)}
                    onPageChange={setPage}
                />
            </Container>
        </Layout>
    );
}
export default IndexPage