/* eslint-disable react/jsx-key */
import React, { useState, setState } from 'react'
// import format from 'date-fns';
import moment from 'moment';
import SelectSearch from 'react-select-search';
import Select from 'react-select';
import axios from 'axios';


export default function testing(this: any, { txndatas, data1 }) {
    const [selectedValue, setSelectedValue] = useState([]);
    const [matterId, accountNo] = useState();
    let selectOptions: string[] = [];

    const options = txndatas.map(d => ({
        "value": d.matterId,
        "label": d.accountNo
    }))

    const mode = {
        Deposit: "+",
        Withdrawal: "-"
    }
    // this.setState({ selectOptions: options }).bind(this)
    // let selectOptions: options;

    const handleChange = (e) => {
        console.log(e)
        setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    }
    // console.log('posts', txndatas)
    return (
        <div>
            <h1> testing </h1>
            <div className='container mx-auto flex flex-row'>
                <div>
                    <input type="checkbox" className="checked:bg-blue-500 p-2 m-2" />
                </div>
                <Select
                    className="dropdown "
                    placeholder="select 4 bank"
                    // value={txndatas.filter((obj, i) => { txndatas.include(obj.nameofInstitution) })}
                    options={data1}
                    onChange={handleChange}
                    isMulti
                    isClearable
                />
                <Select
                    className="dropdown "
                    placeholder="Search 4 acct no"
                    value={txndatas.filter((obj, i) => { txndatas.indexOf(obj.nameofInstitution) })}
                    options={txndatas}
                    onChange={handleChange}
                    isMulti
                    isClearable
                />


                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for date"
                    className="border-2 border-slate-500 mr-2"
                />

                <Select
                    className="dropdown "
                    placeholder="Search for txn no"
                    // value={txndatas.filter((obj, i) => { txndatas.include(obj.nameofInstitution) })}
                    options={txndatas}
                    onChange={handleChange}
                    isMulti
                    isClearable
                />

                <Select
                    className="dropdown "
                    placeholder="Search for description"
                    // value={txndatas.filter((obj, i) => { txndatas.include(obj.nameofInstitution) })}
                    options={data1}
                    onChange={handleChange}
                    isMulti
                    isClearable
                />
                <Select
                    className="dropdown "
                    placeholder="Search for amount"
                    // value={txndatas.filter((obj, i) => { txndatas.include(obj.nameofInstitution) })}
                    options={txndatas}
                    onChange={handleChange}
                    isMulti
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
                        txndatas.map((item, index) => {
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
                                    <td>{mode[item.withdrawalOrDeposit]} {item.amount}</td>
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



export async function getServerSideProps(context) {
    // const { params, req, res } = context

    // console.log(params);
    // const { alltransactions } = params
    const response = await axios.get('http://localhost:3000/api/alltransactions?transactions=${inputText}');
    const data = await response.data;

    // console.log('response', data)
    let txndatas = data.reduce((a, o) => {
        a = [...a, ...o.transactions];
        return a;
    }, []);

    if (!txndatas) {
        return {
            notFound: true,
        }
    }
    // let txndatedatas = txndatas.filter(d => (moment(d.transactionDate).format("DD-MM-YYYY") === date)).map(item) => {
    //     return d;
    // }, []);
    
    // let data1 = txndatas.filter((obj, i) => { txndatas.includes("description") });
    // console.log(data1);
    return {
        props: {
            txndatas
        }
    }
}