import { NextApiRequest, NextApiResponse } from "next";

import txnArray from '../alltransactions'

const handler = (_req: NextApiRequest, res : NextApiResponse) => {
    try {
        debugger;
        if (!Array.isArray(txnArray)) {
            throw new Error('Cannot find user data');
        }
        res.status(200).json(txnArray);
    } catch (err) {
        res.status(500).json({statusCode : 500, message : console.error('error')
        })
    }
}

export default handler;