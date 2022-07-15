/* eslint-disable react/jsx-key */
import React from 'react'



export default function testing({ txndatas }) {
    // console.log('posts', txndatas)
    return (
        <div>
            <h1> testing </h1>
            <table>
                <thead>
                    <tr>
                        <th>mode</th>
                        <th>nameofInstitution</th>
                        <th>transactionDate</th>
                        <th>amount</th>
                        <th>Description</th>
                        <th>accountNo</th>
                        <th>Document</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        txndatas.map((item, index) => {
                            return (
                                <tr key={item.matterId}>
                                    <td>{item.nameofInstitution}</td>
                                    <td>{item.accountNo}</td>
                                    <td>{item.transactionDate}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.description}</td>
                                    <td>{item.accountNo}</td>
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
    const response = await fetch('http://localhost:3000/api/alltransactions');
    const data = await response.json();

    // console.log('response', data)
    let txndatas = data.reduce((a, o) => {
        a = [...a, ...o.transactions];
        return a;
    }, []);
    return {
        props: {
            txndatas
        }
    }
}