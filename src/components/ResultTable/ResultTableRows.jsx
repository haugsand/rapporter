import React from 'react';
import { connect } from 'react-redux';

import ResultTableRow from './ResultTableRow';

let ResultTableRows = ({rowValues, subrowValues, columnValues, routeParams}) => {

    let rows = []
    rowValues.items.forEach(function(item, index) {
        rows.push(<ResultTableRow item={item} key={index} routeParams={routeParams} columnValues={columnValues} />);

        if (Object.keys(subrowValues).length !== 0) {
            if (subrowValues[item.nummer]) {
                subrowValues[item.nummer].forEach(function(subrowitem) {
                    rows.push(<ResultTableRow item={subrowitem} key={'subrow'+subrowitem.nummer} routeParams={routeParams} columnValues={columnValues} subrow={true} />);
                });
            }
        }
    });
    rows.push(<ResultTableRow routeParams={routeParams} key='sum' columnValues={columnValues} />);

    return (
        <tbody>
            {rows}
        </tbody>
    );

}

const mapStateToProps = (state) => ({
    rowValues: state.rowValues,
    subrowValues: state.subrowValues.items,
    columnValues: state.columnValues.items
})


ResultTableRows = connect(mapStateToProps)(ResultTableRows);
export default ResultTableRows;