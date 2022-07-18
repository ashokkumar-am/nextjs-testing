import React from 'react'
import axios from 'axios';

export default function newone({ datas }) {
    console.log('datas', datas)

    return (
        <div>newone</div>
    )
}


export async function getServerSideProps(context) {
    const { param } = context
    const response = await fetch("http://localhost:3000/api/alltransactions?s={transactions}");
    const data = await response.json();
    console.log('data------>', data)

    return {
        props: {
            datas: data
        }
    }
}