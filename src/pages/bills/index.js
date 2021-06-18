import React, {useEffect, useState} from "react"
import Layout from "../../components/layouts/layout";
import SEO from "../../components/seo";
import {getBillsDescription} from "../../utils/seoUtils";
import {Container, FlexContainer} from "../../components/layouts/container";
import styles from "./index2.module.css"
import BillCardV2 from "../../components/cards/billCardV2";
import {buildPath} from "../../utils/urlUtils";
import {EnterSearchBox, SearchResult} from "../../components/filters/search";
import Pagination from "../../components/navigations/pagination";
import {
    buildUrlParamStr,
    categoryOptions,
    dietOptions,
    getInitialCategories,
    getInitialDiets,
    getInitialPage,
    getInitialQuery,
    getInitialStatuses,
    getInitialSubmittedDiets,
    statusOptions
} from "../../utils/apiUtils";
import {navigate} from '@reach/router';
import MultiSelect from "../../components/filters/multiSelect";
import {useMediaQuery} from "react-responsive";


const IndexPage = () => {
    const urlStr = typeof window !== 'undefined' ? window.location : 'https://politylink.jp';
    const [bills, setBills] = useState([]);
    const [query, setQuery] = useState(getInitialQuery(urlStr));
    const [categories, setCategories] = useState(getInitialCategories(urlStr));
    const [statuses, setStatuses] = useState(getInitialStatuses(urlStr));
    const [diets, setDiets] = useState(getInitialDiets(urlStr));
    const [submittedDiets, setSubmittedDiets] = useState(getInitialSubmittedDiets(urlStr));
    const [page, setPage] = useState(getInitialPage(urlStr));
    const [totalBills, setTotalBills] = useState(0);
    const isDesktop = useMediaQuery({query: '(min-width: 1200px)'})

    useEffect(() => {
        const urlParamStr = buildUrlParamStr(query, categories, statuses, diets, submittedDiets, page)
        const fragmentSize = isDesktop ? 100 : 50
        fetch(`https://api.politylink.jp/bills?items=5&fragment=${fragmentSize}&${urlParamStr}`)
            .then(response => response.json())
            .then(data => {
                setBills(data['bills']);
                setTotalBills(data['totalBills'])
            });
        if (typeof window !== 'undefined') {
            const url = new URL(window.location);
            const newUrlStr = `${url.origin}${url.pathname}?${urlParamStr}`;
            navigate(newUrlStr, {replace: true});  // TODO: enable browser back
        }
    }, [query, categories, statuses, diets, submittedDiets, page]);


    return (
        <Layout>
            <SEO description={getBillsDescription()}/>
            <FlexContainer>
                <EnterSearchBox
                    placeholder="第201回国会以降の法律案を検索"
                    value={query}
                    handleQuery={(query) => {
                        setQuery(query);
                        setPage(1);
                        setBills([]);
                        setTotalBills(0);
                    }}
                />
                <SearchResult value={totalBills + '件'}/>
            </FlexContainer>
            <div className={styles.main}>
                <FlexContainer>
                    {bills.map((bill) => {
                        return <BillCardV2
                            name={bill.name}
                            billNumberShort={bill.billNumberShort}
                            fragment={bill.fragment}
                            status={bill.statusLabel}
                            tags={bill.tags}
                            lastUpdatedDate={bill.lastUpdatedDate}
                            totalNews={bill.totalNews}
                            totalMinutes={bill.totalMinutes}
                            totalPdfs={bill.totalPdfs}
                            to={buildPath(bill.id)}
                            key={bill.id}
                        />;
                    })}
                </FlexContainer>
                {isDesktop &&
                <div className={styles.filters}>
                    <MultiSelect
                        options={categoryOptions}
                        currentOptions={categories}
                        onChange={(props) => {
                            setCategories(props);
                            setPage(1);
                        }}
                        placeholder={"種類を指定"}
                    />
                    <MultiSelect
                        options={statusOptions}
                        currentOptions={statuses}
                        onChange={(props) => {
                            setStatuses(props);
                            setPage(1);
                        }}
                        placeholder={"審議状況を指定"}
                    />
                    <MultiSelect
                        options={dietOptions}
                        currentOptions={diets}
                        onChange={(props) => {
                            setDiets(props);
                            setPage(1);
                        }}
                        placeholder={"審議回次を指定"}
                    />
                    <MultiSelect
                        options={dietOptions}
                        currentOptions={submittedDiets}
                        onChange={(props) => {
                            setSubmittedDiets(props);
                            setPage(1);
                        }}
                        placeholder={"提出回次を指定"}
                    />
                </div>
                }
            </div>
            <Container>
                <Pagination
                    page={page}
                    pageCount={Math.ceil(totalBills / 5)}
                    onPageChange={setPage}
                />
            </Container>
        </Layout>
    );
}
export default IndexPage