import axios from 'axios';

export const getAllTransaction = async AllTxn =>
{
    const { data } = await axios.get(`/api/transactions/alltransactions`);
    return data;
};

export const getNameOfInstituion = async nameOfInstution =>
{
    const { data } = axios.get(`/api/transactions/${nameOfInstution}`);
    return data;
}

export const getAccountNo = async accountNo =>
{
    const { data } = axios.get(`/api/transactions/${accountNo}`);
    return data;
}

export const getAmount = async amount =>
{
    const { data } = axios.get(`/api/transactions/${amount}`);
    return data;
}

export const getDescription = async getdescription =>
{
    const {data} = axios.get(`/api/transcations/${getdescription}`)
}

export const getTransactionDate = async transactionDate =>
{
    const {data} = axios.get(`/api/transactions/${transactionDate}`)
}