/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import format from 'date-fns';
import SelectSearch from 'react-select-search';
import Select from 'react-select';


export default function testing({ txndatas }) {
    const [selectedValue, setSelectedValue] = useState([]);

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
                    placeholder="select ur choice"
                    // value={txndatas.filter((obj, i) => { txndatas.include(obj.nameofInstitution) })}
                    options={txndatas}
                    onChange={handleChange}
                    isMulti
                    isClearable
                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for Bank"
                    className="border-2 border-slate-500 mr-2"
                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for account no"
                    className="border-2 border-slate-500 mr-2"
                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for date"
                    className="border-2 border-slate-500 mr-2"
                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for txn no"
                    className="border-2 border-slate-500 mr-2"

                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for description"
                    className="border-2 border-slate-500 mr-2"

                />
                <SelectSearch
                    options={[]}
                    search
                    placeholder="Search for amount"
                    className="border-2 border-slate-500 mr-2"

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
                                    <td>{item.transactionDate}</td>
                                    <td>{item.transactionNumber}</td>
                                    <td>{item.description}</td>
                                    <td>{item.accountNo}</td>
                                    <td>{item.amount}</td>
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
    // const { transactions } = params
    const response = await fetch('http://localhost:3000/api/alltransactions?transactions=${inputText}');
    const data = await response.json();

    // console.log('response', data)
    let txndatas = data.reduce((a, o) => {
        a = [...a, ...o.transactions];
        return a;
    }, []);
    // data1 = txndatas.filter((obj, i) => { txndatas.include(obj.transactions.matterId) });
    // console.log(data1);
    return {
        props: {
            txndatas
        }
    }
}