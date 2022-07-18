import React, { useState } from 'react'
import axios from 'axios';
import _ from 'lodash';
import { Rsuite } from "@/src/components/Table/Rsuite";

export default function newone({ data }) {
    const [TableComponent] = useState(() => Rsuite);

    // console.log('datas', datas)

    return (
        <div>
            {/* <button onClick={() => setTableComponent(() => Rsuite)}>Rsuite</button> */}
            <TableComponent data={data} />
        </div>
    )
}


export async function getServerSideProps(context) {
    // const { params, req, res } = context

    // console.log(params);
    // const { alltransactions } = params
    const response = await axios.get('http://localhost:3000/api/alltransactions?transactions=${inputText}');
    const datas = await response.data;

    // console.log('response', data)
    let data = datas.reduce((a, o) => {
        a = [...a, ...o.transactions];
        return a;
    }, []);

    if (!data) {
        return {
            notFound: true,
        }
    }

    let uniqueAmount = _.uniqBy(data, obj => obj.amount);
    console.log(uniqueAmount);

    // let txndatedatas = txndatas.filter(d => (moment(d.transactionDate).format("DD-MM-YYYY") === date)).map(item) => {
    //     return d;
    // }, []);

    // let data1 = txndatas.filter((obj, i) => { txndatas.includes("description") });
    // console.log(data1);
    return {
        props: {
            data, uniqueAmount
        }
    }
}