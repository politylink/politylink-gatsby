import React, {useEffect, useState} from "react"
import Layout from "../../components/layouts/layout";
import SEO from "../../components/seo";
import {getBillsDescription} from "../../utils/seoUtils";
import {Container, FlexContainer} from "../../components/layouts/container";
import styles from "./index2.module.css"
import BillCardV2 from "../../components/cards/billCardV2";
import {buildPath} from "../../utils/urlUtils";
import {SearchBoxKey, SearchResult} from "../../components/search";
import Select from "react-select";
import Pagination from "../../components/navigations/pagination";
import {
    buildUrlParamStr,
    categoryOptions,
    getInitialCategories,
    getInitialPage,
    getInitialQuery
} from "../../utils/apiUtils";


const IndexPage = () => {
    const [bills, setBills] = useState([])
    const [query, setQuery] = useState(getInitialQuery())
    const [categories, setCategories] = useState(getInitialCategories());
    const [page, setPage] = useState(getInitialPage());
    const [totalBills, setTotalBills] = useState(0);

    useEffect(() => {
        const urlParamStr = buildUrlParamStr(query, categories, page)
        fetch('https://api.politylink.jp/bills?items=5&fragment=100&' + urlParamStr)
            .then(response => response.json())
            .then(resultData => {
                setTotalBills(resultData['totalBills'])
                setBills(resultData['bills']);
            })
        if (typeof window !== 'undefined') {
            const url = new URL(window.location);
            const newUrlStr = `${url.origin}${url.pathname}?${urlParamStr}`
            window.history.pushState({}, '', newUrlStr);
        }
    }, [query, categories, page])


    return (
        <Layout>
            <SEO description={getBillsDescription()}/>
            <FlexContainer>
                <SearchBoxKey
                    placeholder="第201回国会以降の法律案を検索"
                    value={query}
                    handleKeyPress={(event) => {
                        if (event.key === "Enter") {
                            setBills([])
                            const query = event.target.value
                            setQuery(query)
                        }
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
                <div className={styles.filter}>
                    <Select
                        defaultValue={categories}
                        onChange={setCategories}
                        options={categoryOptions}
                        isMulti={true}
                        placeholder={"種類を指定"}
                    />
                </div>
            </div>
            <Container>
                <Pagination
                    pageCount={Math.ceil(totalBills / 5)}
                    onPageChange={(data) => setPage(data.selected + 1)}
                />
            </Container>
        </Layout>)
}
export default IndexPage