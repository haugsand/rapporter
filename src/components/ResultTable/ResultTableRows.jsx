import React from 'react';
import { connect } from 'react-redux';

import ResultTableRow from './ResultTableRow';

function ResultTableRows ({rowValues, subrowValues, columnValues, settings}) {

    let rows = []
    rowValues.items.forEach(function(item) {
        rows.push(<ResultTableRow item={item} key={'row'+item.nummer} columnValues={columnValues} settings={settings} />);

        if (Object.keys(subrowValues).length !== 0) {
            if (subrowValues[item.nummer]) {
                subrowValues[item.nummer].forEach(function(subrowitem) {
                    rows.push(<ResultTableRow item={subrowitem} key={'subrow'+subrowitem.nummer} columnValues={columnValues} settings={settings} subrow={true} />);
                });
            }
        }
    });

    return (
        <tbody>
            {rows}
            <ResultTableRow key='sum' columnValues={columnValues} settings={settings} />
        </tbody>
    );

}

const mapStateToProps = (state) => ({
    rowValues: state.rowValues,
    subrowValues: state.subrowValues.items,
    columnValues: state.columnValues.items
})


export default connect(mapStateToProps)(ResultTableRows);