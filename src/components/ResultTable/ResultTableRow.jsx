import React from 'react';
import { buildParametersAll } from './../../services/parameters2';

import ResultTableCell from './ResultTableCell';
import ResultTableRowTitle from './ResultTableRowTitle';


function ResultTableRow ({item, routeParams, subrow, columnValues, settings}) {

    let rowValue = '';
    if (item) {
        rowValue = item.nummer;
    }

    const tableCells = columnValues.map((columnValue, index) => {
        const parameters = buildParametersAll(routeParams, rowValue, columnValue.id, subrow, settings);
        return <ResultTableCell key={index} parameters={parameters} resultParam={settings.result} />;
    });

    const sumParameter = buildParametersAll(routeParams, rowValue, '', subrow, settings);
    const tableCellSum = <ResultTableCell key="sum" parameters={sumParameter} resultParam={settings.result} />;

    return (
        <tr>
            <ResultTableRowTitle item={item} subrow={subrow} settings={settings} />
            {tableCells}
            {tableCellSum}
        </tr>
    );
}

export default ResultTableRow;