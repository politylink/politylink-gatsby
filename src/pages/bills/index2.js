import React, {useEffect, useState} from "react"
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import {getBillsDescription} from "../../utils/seoutils";
import {FlexContainer} from "../../components/container";
import styles from "./index2.module.css"
import BillCardV2 from "../../components/billCardV2";
import {buildPath} from "../../utils/urlutils";
import {SearchBoxKey} from "../../components/search";
import Select from "react-select";

const getInitialQuery = () => {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location);
        return url.searchParams.get("q") || "";
    }
    return "";
};

const getInitialCategories = () => {
    const categories = []
    if (typeof window !== 'undefined') {
        const categoryValues = new URL(window.location).searchParams.getAll("category")
        for (const categoryValue of categoryValues) {
            for (const category of categoryOptions) {
                if (category.value === categoryValue) {
                    categories.push(category)
                }
            }
        }
    }
    return categories;
}

const categoryOptions = [
    {value: 'KAKUHOU', label: '閣法'},
    {value: 'SHUHOU', label: '衆法'},
    {value: 'SANHOU', label: '参法'},
];

const buildUrlParamStr = (query, categories) => {
    const param = [];
    param.push(`q=${encodeURI(query)}`)
    for (const category of categories) {
        param.push(`category=${encodeURI(category.value)}`)
    }
    return param.join('&')
}

const IndexPage = () => {
    const [bills, setBills] = useState([])
    const [query, setQuery] = useState(getInitialQuery())
    const [categories, setCategories] = useState(getInitialCategories());

    useEffect(() => {
        const urlParamStr = buildUrlParamStr(query, categories)
        fetch('https://api.politylink.jp/bills?items=5&fragment=100&' + urlParamStr)
            .then(response => response.json())
            .then(resultData => {
                setBills(resultData)
            })
        if (typeof window !== 'undefined') {
            const url = new URL(window.location);
            const newUrlStr = `${url.origin}${url.pathname}?${urlParamStr}`
            window.history.pushState({}, '', newUrlStr);
        }
    }, [query, categories])


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
            </FlexContainer>
            <div className={styles.main}>
                <FlexContainer>
                    {bills.map((bill) => {
                        return <BillCardV2
                            name={bill.name}
                            billNumberShort={bill.bill_number_short}
                            fragment={bill.fragment}
                            status={bill.status_label}
                            tags={bill.tags}
                            lastUpdatedDate={bill.last_updated_date}
                            totalNews={bill.total_news}
                            totalMinutes={bill.total_minutes}
                            totalPdfs={bill.total_pdfs}
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
        </Layout>)
}
export default IndexPage