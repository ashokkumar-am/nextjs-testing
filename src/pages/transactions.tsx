/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import moment from 'moment';
import Select from 'react-select';
import axios from 'axios';
import _ from 'lodash';
import { AutoComplete, DatePicker } from 'antd';
import "antd/dist/antd.css";

// import getServerSideProps


export default function testing(this: any, {
    data,
    optionsAmount,
    optionsAcctNo,
    optionsInst
}) {

    const [tableData, setTableData] = useState(data);
    const [bankTxn, setBankTxn] = useState('');
    const [amtTxn, setAmountTxn] = useState({ id: '', value: '' });
    const [acctTxn, setAcctTxn] = useState({ id: '', value: '' });
    const [bankOptions, setBankOptions] = useState(optionsInst);
    const [amtOptions, setAmtOptions] = useState(optionsAmount);
    const [acctOptions, setAcctOptions] = useState(optionsAcctNo);


    const [selectedValue, setSelectedValue] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentValue, setCurrentValue] = useState('')


    const mode = {
        Deposit: "+",
        Withdrawal: "-"
    }

    const handleChangeBank = async (e: any) => {
        console.log(e)
        // if (e && e.length > 0) {
        //     let obj = { id: e[0].value, value: e[0].value };
        //     // await setBankTxn({ id: e[0].value, value: e[0].value });
        //     // setBankTxn(prevMovies => ({ ...prevMovies, ...obj}));
        //     useEffect(() => { setBankTxn(e[0].value) }, [bankTxn])
        // }
        // useEffect(() => {
        setTimeout(() => {
            setBankTxn(e);
        }, 2000);
        //   }, []);
        getTransactionsData(e, 'bank');
    }
    const handleChangeAcct = async (e: any) => {
        if (e && e.length > 0) {
            await setAcctTxn({ id: e[0].value, value: e[0].value });
        }
        await getTransactionsData(e, 'acct');
    }
    const getTransactionsData = async (search: any) => {
        // let payload: any = {};
        // payload = await {
        //     bankTxn: bankTxn,
        //     amtTxn: amtTxn.value,
        //     acctTxn: acctTxn.value,
        // }
        console.log('object :>> ', data);
        if (search && search.value) {
            let dataSearch = await data.filter((d: any) => {
                return d.nameofInstitution == search.value;
            })
            await setTableData(dataSearch)
            console.log('dataSearch :>> ', dataSearch);
            console.log('tableData :>> ', tableData);
        }
    }

    return (
        <div>
            <h1> testing </h1>
            <div className='container mx-auto flex flex-row'>
                <div>
                    <input type="checkbox" className="checked:bg-blue-500 p-2 m-2" />
                </div>
                <Select
                    className="dropdown "
                    placeholder="select bank"
                    options={bankOptions}
                    onChange={handleChangeBank}
                    isClearable
                />
                <Select
                    className="dropdown "
                    placeholder="Search acct no"
                    options={optionsAcctNo}
                    // onChange={handleChangeBank}
                    isMulti
                    isClearable
                />
                <DatePicker onChange={(date) => console.log(date)} />,

                <AutoComplete
                    options={data}
                    style={{ width: 200 }}
                    onSelect={(value) => {
                        setCurrentValue(value)
                    }}
                    onChange={() => searchItems()}
                    placeholder="Select Txn No "
                />
                <AutoComplete
                    options={data}
                    style={{ width: 200 }}
                    onSelect={(value) => {
                        setCurrentValue(value)
                    }}
                    onChange={() => searchItems()}
                    placeholder="Select Description "
                />
                <Select
                    className="dropdown "
                    placeholder="Search for amount"
                    options={amtOptions}
                    onChange={handleChangeAcct}
                    isClearable
                />

            </div>
            <table className='table-auto border-separate border-spacing-2 border-spacing-y-2 mb-10'>
                <thead>
                    <tr className='text-left '>
                        <th></th>
                        <th></th>
                        <th>name of Institution</th>
                        <th>account No</th>
                        <th>transaction Date</th>
                        <th>transaction No</th>
                        <th>Description</th>
                        <th>amount</th>
                        <th>Document</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((item) => {
                            return (
                                <tr key={item.matterId}>
                                    <td><input className='star px-8' type="checkbox" /></td>
                                    <td> <input type="checkbox" className="checked:bg-blue-500 p-2 m-2" /></td>
                                    <td>{item.nameofInstitution}</td>
                                    <td>{item.accountNo}</td>
                                    <td>{moment(item.transactionDate).format("DD-MM-YYYY")}</td>
                                    <td>{item.transactionNumber}</td>
                                    <td>{item.description}</td>
                                    <td>{item.accountNo}</td>
                                    <td>{mode[item.withdrawalOrDeposit]}{item.amount}</td>
                                    {/* <td>{item.url}</td> */}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}




export async function getServerSideProps() {
    const response = await axios.get('http://localhost:3000/api/alltransactions');
    const datas = await response.data;

    // console.log('response', data)
    let data = await datas.reduce((a, o) => {
        a = [...a, ...o.transactions];
        return a;
    }, []);

    if (!data) {
        return {
            notFound: true,
        }
    }

    let uniqueAmount = _.uniqBy(data, obj => obj.amount);

    let uniqueInst = _.uniqBy(data, obj => obj.nameofInstitution);


    let uniqueAcctNo = _.uniqBy(data, obj => obj.accountNo);


    let uniqueTxnNo = _.uniqBy(data, obj => obj.transactionNumber);


    let uniqueDescr = _.uniqBy(data, obj => obj.description);


    const optionsAmount = uniqueAmount.map((d: any) => ({
        "value": d.amount,
        "label": d.amount.toString()
    }))
    const optionsInst = uniqueInst.map((d: any) => ({
        "value": d.nameofInstitution,
        "label": d.nameofInstitution.toString()
    }))
    const optionsAcctNo = uniqueAcctNo.map((d: any) => ({
        "value": d.accountNo,
        "label": d.accountNo.toString()
    }))


    return {
        props: {
            data,
            uniqueAmount,
            uniqueInst,
            uniqueAcctNo,
            uniqueTxnNo,
            uniqueDescr,
            optionsAmount,
            optionsAcctNo,
            optionsInst
        }
    }
}


function data(data: any): [any, any] {
    throw new Error('Function not implemented.');
}

function searchItems(): void {
    throw new Error('Function not implemented.');
}
// /* eslint-disable react/jsx-key */
// import React, { useState } from 'react'
// import moment from 'moment';
// import Select from 'react-select';
// import axios from 'axios';
// import _ from 'lodash';
// import { AutoComplete, DatePicker } from 'antd';
// import "antd/dist/antd.css";


// export default function testing(this: any, { data,
//     uniqueAmount,
//     uniqueInst,
//     uniqueAcctNo,
//     optionsAmount,
//     optionsAcctNo,
//     optionsInst
// }) {

//     const [bankTxn, setBankTxn] = useState({ id: '', values: '' });
//     const [amtTxn, setAmountTxn] = useState({ id: '', values: '' });
//     const [acctTxn, setAcctTxn] = useState({ id: '', values: '' });
//     const [bankOptions, setBankOptions] = useState(optionsInst);
//     const [amtOptions, setAmtOptions] = useState(optionsAmount);
//     const [acctOptions, setAcctOptions] = useState(optionsAcctNo);


//     const [selectedValue, setSelectedValue] = useState();
//     const [searchInput, setSearchInput] = useState('');
//     const [filteredResults, setFilteredResults] = useState([]);
//     const [currentValue, setCurrentValue] = useState('')

//     let selectOptions: string[] = [];

//     const mode = {
//         Deposit: "+",
//         Withdrawal: "-"
//     }

//     const handleChangeBank = async (e: any) => {
//         // console.log(e)
//         if (e && e.length > 0) {
//             await setBankTxn({ id: e[0].value, value: e[0].value });
//         }
//         await getTransactionsData();
//     }
//     const handleChangeAmount = async (e: any) => {
//         if (e && e.length > 0) {
//             await setAmountTxn({ id: e[0].value, value: e[0].value });
//         }
//         await getTransactionsData();
//     }
//     const handleChangeAcct = async (e: any) => {
//         if (e && e.length > 0) {
//             await setAcctTxn({ id: e[0].value, value: e[0].value });
//         }
//         await getTransactionsData();
//     }
//     const getTransactionsData = async () => {
//         let payload: any = {};
//         payload = await {
//             bankTxn: bankTxn.values,
//             amtTxn: amtTxn.values,
//             acctTxn: acctTxn.values,
//         }
//     }

//     return (
//         <div>
//             <h1> testing </h1>
//             <div className='container mx-auto flex flex-row'>
//                 <div>
//                     <input type="checkbox" className="checked:bg-blue-500 p-2 m-2" />
//                 </div>
//                 <Select
//                     className="dropdown "
//                     placeholder="select bank"
//                     options={bankOptions}
//                     onChange={handleChangeBank}
//                     isClearable
//                 />
//                 <Select
//                     className="dropdown "
//                     placeholder="Search acct no"
//                     options={optionsAcctNo}
//                     // onChange={handleChangeBank}
//                     isMulti
//                     isClearable
//                 />
//                 <DatePicker onChange={(date) => console.log(date)} />,

//                 <AutoComplete
//                     options={data}
//                     style={{ width: 200 }}
//                     onSelect={(value) => {
//                         setCurrentValue(value)
//                     }}
//                     onChange={() => searchItems()}
//                     placeholder="Select Txn No "
//                 />
//                 <AutoComplete
//                     options={data}
//                     style={{ width: 200 }}
//                     onSelect={(value) => {
//                         setCurrentValue(value)
//                     }}
//                     onChange={() => searchItems()}
//                     placeholder="Select Description "
//                 />
//                 <Select
//                     className="dropdown "
//                     placeholder="Search for amount"
//                     options={amtOptions}
//                     onChange={handleChangeAcct}
//                     isClearable
//                 />

//             </div>
//             <table className='table-auto border-separate border-spacing-2 border-spacing-y-2 mb-10'>
//                 <thead>
//                     <tr className='text-left '>
//                         <th></th>
//                         <th></th>
//                         <th>name of Institution</th>
//                         <th>account No</th>
//                         <th>transaction Date</th>
//                         <th>transaction No</th>
//                         <th>Description</th>
//                         <th>amount</th>
//                         <th>Document</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.map((item, index) => {
//                             return (
//                                 <tr key={item.matterId}>
//                                     <td><input className='star px-8' type="checkbox" /></td>
//                                     <td> <input type="checkbox" className="checked:bg-blue-500 p-2 m-2" /></td>
//                                     <td>{item.nameofInstitution}</td>
//                                     <td>{item.accountNo}</td>
//                                     <td>{moment(item.transactionDate).format("DD-MM-YYYY")}</td>
//                                     <td>{item.transactionNumber}</td>
//                                     <td>{item.description}</td>
//                                     <td>{item.accountNo}</td>
//                                     <td>{mode[item.withdrawalOrDeposit]}{item.amount}</td>
//                                     {/* <td>{item.url}</td> */}
//                                 </tr>
//                             );
//                         })
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
// }



// export async function getServerSideProps() {
//     // const { params, req, res } = context

//     // console.log(params);
//     // const { alltransactions } = params
//     const response = await axios.get('http://localhost:3000/api/alltransactions');
//     const datas = await response.data;

//     // console.log('response', data)
//     let data = await datas.reduce((a, o) => {
//         a = [...a, ...o.transactions];
//         return a;
//     }, []);

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     let uniqueAmount = _.uniqBy(data, obj => obj.amount);
//     // console.log(uniqueAmount);

//     let uniqueInst = _.uniqBy(data, obj => obj.nameofInstitution);
//     // console.log(uniqueInst);

//     let uniqueAcctNo = _.uniqBy(data, obj => obj.accountNo);
//     // console.log(uniqueAcctNo);

//     let uniqueTxnNo = _.uniqBy(data, obj => obj.transactionNumber);
//     // console.log(uniqueTxnNo);

//     let uniqueDescr = _.uniqBy(data, obj => obj.description);
//     // console.log(uniqueDescr);

//     const optionsAmount = uniqueAmount.map((d, index) => ({
//         "value": d.amount,
//         "label": d.amount.toString()
//     }))
//     const optionsInst = uniqueInst.map(d => ({
//         "value": d.nameofInstitution,
//         "label": d.nameofInstitution.toString()
//     }))
//     console.log(optionsInst);
//     const optionsAcctNo = uniqueAcctNo.map(d => ({
//         "value": d.accountNo,
//         "label": d.accountNo.toString()
//     }))

//     // let txndatedatas = txndatas.filter(d => (moment(d.transactionDate).format("DD-MM-YYYY") === date)).map(item) => {
//     //     return d;
//     // }, []);

//     // let data1 = txndatas.filter((obj, i) => { txndatas.includes("description") });
//     // console.log(data1);
//     return {
//         props: {
//             data,
//             uniqueAmount,
//             uniqueInst,
//             uniqueAcctNo,
//             uniqueTxnNo,
//             uniqueDescr,
//             optionsAmount,
//             optionsAcctNo,
//             optionsInst
//         }
//     }
// }

// function getByTransactions() {

// }
