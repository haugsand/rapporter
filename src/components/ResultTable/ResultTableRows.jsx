import React from 'react';
import { connect } from 'react-redux';

import ResultTableRow from './ResultTableRow';

function ResultTableRows ({rowValues, subrowValues, columnValues, routeParams, settings}) {

    let rows = []
    rowValues.items.forEach(function(item, index) {
        rows.push(<ResultTableRow item={item} key={index} routeParams={routeParams} columnValues={columnValues} settings={settings} />);

        if (Object.keys(subrowValues).length !== 0) {
            if (subrowValues[item.nummer]) {
                subrowValues[item.nummer].forEach(function(subrowitem) {
                    rows.push(<ResultTableRow item={subrowitem} key={'subrow'+subrowitem.nummer} routeParams={routeParams} columnValues={columnValues} settings={settings} subrow={true} />);
                });
            }
        }
    });

    return (
        <tbody>
            {rows}
            <ResultTableRow routeParams={routeParams} key='sum' columnValues={columnValues} settings={settings} />
        </tbody>
    );

}

const mapStateToProps = (state) => ({
    rowValues: state.rowValues,
    subrowValues: state.subrowValues.items,
    columnValues: state.columnValues.items
})


export default connect(mapStateToProps)(ResultTableRows);