import React, {useEffect, useState} from "react"
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import {getBillsDescription} from "../../utils/seoutils";
import {FlexContainer} from "../../components/container";
import BillCardV2 from "../../components/billCardV2";
import {buildPath} from "../../utils/urlutils";
import {SearchBoxKey} from "../../components/search";

const getInitialQuery = () => {
    if (typeof window !== 'undefined') {
        const url = new URL(window.location);
        return url.searchParams.get("q") || "";
    }
    return "";
};

const IndexPage = () => {
    const [bills, setBills] = useState([])
    const [query, setQuery] = useState(getInitialQuery())

    useEffect(() => {
        fetch(`https://api.politylink.jp/bills?q=${encodeURI(query)}&items=10&fragment=100`)
            .then(response => response.json())
            .then(resultData => {
                setBills(resultData)
            })
    }, [query])

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
                            if (typeof window !== 'undefined') {
                                const url = new URL(window.location);
                                url.searchParams.set('q', query);
                                window.history.pushState({}, '', url);
                            }
                        }
                    }}
                />
            </FlexContainer>
            <FlexContainer>
                {bills.map((bill) => {
                    return <BillCardV2
                        name={bill.name}
                        bill_number_short={bill.bill_number_short}
                        fragment={bill.fragment}
                        status={bill.status_label}
                        tags={bill.tags}
                        last_updated_date={bill.last_updated_date}
                        to={buildPath(bill.id)}
                        key={bill.id}
                    />;
                })}
            </FlexContainer>
        </Layout>)
}
export default IndexPage