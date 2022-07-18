import React from "react";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css"; // or 'rsuite-table/dist/css/rsuite-table.css'
import InputPicker from 'rsuite/InputPicker'
const rowKey = "id";

export function Rsuite(props) {
    return (
        <Table
            height={400}
            autoHeight
            affixHeader
            rowKey={rowKey}
            data={props.data}
            onRowClick={(data) => {
                console.log(data);
            }}
        >
            <Column width={70} align="center" resizable>
                <HeaderCell>Name of Institution</HeaderCell>
                <Cell dataKey="nameofInstitution" />
                {/* <InputPicker data="nameofInstitution" style={{ width: 224 }} />; */}
            </Column>

            <Column width={130} resizable sortable>
                <HeaderCell>Account No</HeaderCell>
                <Cell dataKey="accountNo" />
            </Column>

            <Column width={130} resizable>
                <HeaderCell>Transaction Date</HeaderCell>
                <Cell dataKey="transactionDate" />
            </Column>

            <Column width={200} resizable>
                <HeaderCell>Transaction No</HeaderCell>
                <Cell dataKey="transactionNumber" />
            </Column>

            <Column width={200}>
                <HeaderCell>Description</HeaderCell>
                <Cell dataKey="description" />
            </Column>

            <Column width={200}>
                <HeaderCell>Amount</HeaderCell>
                <Cell dataKey="amount" />
            </Column>

            <Column width={200}>
                <HeaderCell>Url</HeaderCell>
                <Cell dataKey="" />
            </Column>
        </Table>
    );
}
