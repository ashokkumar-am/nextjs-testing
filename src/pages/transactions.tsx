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
    // console.log('PropesDATA', data);
    // console.log('PropesDATA-2', data.length);

    const [tableData, setTableData] = useState(data);
    const [bankTxn, setBankTxn] = useState('');
    const [amtTxn, setAmountTxn] = useState({ id: '', value: '' });
    const [acctTxn, setAcctTxn] = useState({ id: '', value: '' });
    const [bankOptions, setBankOptions] = useState(optionsInst);
    const [amtOptions, setAmtOptions] = useState(optionsAmount);
    const [acctOptions, setAcctOptions] = useState(optionsAcctNo);
    const [dateTxn, setDateTxn] = useState(moment().format('yyyy-MM-dd'))


    const [selectedValue, setSelectedValue] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [currentValue, setCurrentValue] = useState('')

    const mode = {
        Deposit: "+",
        Withdrawal: "-"
    }
    // const onDateChange = (e: any) => {
    //     const newDate = moment(new Date(e.targe.value)).format("yyyy-MM-dd");
    //     getTransactionsDate(newDate, 'date');
    // }

    const handleChangeBank = (e: any) => {
        console.log(e)
        getTransactionsData(e, 'bank');
    }
    const handleChangeAcct = (e: any) => {
        if (e && e.length > 0) {
            setAcctTxn({ id: e[0].value, value: e[0].value });
        }
        getTransactionsAcctData(e, 'acct');
    }
    const handleChangeAmt = (e: any) => {
        if (e && e.length > 0) {
            setAmountTxn({ id: e[0].value, value: e[0].value });
        }
        getTransactionsAmtData(e, 'amt');
    }
    const getTransactionsData = (search: any) => {
        if (search && search.value) {
            let dataSearch = data.filter((d: any) => {
                return d.nameofInstitution == search.value;
            })
            setTableData(dataSearch)
        } else {
            const tempDate = Object.assign([], data);
            setTableData(tempDate);
        }
    }

    const getTransactionsAcctData = (search: any) => {
        if (search && search.value) {
            let dataSearch = data.filter((d: any) => {
                return d.accountNo == search.value;
            })
            setTableData(dataSearch)
        } else {
            const tempDate = Object.assign([], data);
            setTableData(tempDate);
        }
    }
    const getTransactionsAmtData = (search: any) => {
        // console.log('object :>> ', data);
        if (search && search.value) {
            let dataSearch = data.filter((d: any) => {
                return d.amount == search.value;
            })
            setTableData(dataSearch)
        } else {
            const tempDate = Object.assign([], data);
            setTableData(tempDate);
        }
    }
    const getTransactiondDate = (search: any) => {
        if (search) {
            let dataSearch = data.filter((d: any) => {
                return moment(d.transactionDate).format("DD-MM-YYYY") == search;
            })
            setTableData(dataSearch)
        } else {
            const tempDate = Object.assign([], data);
            setTableData(tempDate);
        }
    }
    const handleChangeDate = (date, dateString) => {
        console.log('dddddaaatee----->')
        console.log(date.toISOString(), dateString);
        getTransactiondDate(date)
    };

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
                    options={acctOptions}
                    onChange={handleChangeAcct}
                    // isMulti
                    isClearable
                />
                <DatePicker
                    format="DD-MM-YYYY"
                    onChange={handleChangeDate}
                />

                <AutoComplete
                    className="dropdown"
                    options={data}

                    onSelect={(value) => {
                        setCurrentValue(value)
                    }}
                    onChange={() => searchItems()}
                    placeholder="Select Txn No "
                />
                <AutoComplete
                    className=""
                    options={data}

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
                    onChange={handleChangeAmt}
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
                        tableData.map((item, index) => {
                            return (
                                <tr key={index}>
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
    const response = await fetch('http://localhost:3000/api/alltransactions');
    const datas = await response.json();

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
            optionsAmount,
            optionsAcctNo,
            optionsInst
        }
    }
}