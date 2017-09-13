import React from 'react';
import { buildParametersAll } from './../../services/parameters';

import ResultTableCell from './ResultTableCell';
import ResultTableRowTitle from './ResultTableRowTitle';


function ResultTableRow ({item, routeParams, subrow, columnValues, settings}) {

    let rowValue = '';
    if (item) {
        rowValue = item.nummer;
    }

    let tableCells = [];


    columnValues.forEach((columnValue, index) => {
        const parameters = buildParametersAll(routeParams, rowValue, columnValue.id, subrow);

        tableCells.push(<ResultTableCell key={index} parameters={parameters} resultParam={settings.result} />);

    });


    const sumParameter = buildParametersAll(routeParams, rowValue, '', subrow);
    tableCells.push(<ResultTableCell key="sum" parameters={sumParameter} resultParam={settings.result} />);

    return (
        <tr>
            <ResultTableRowTitle routeParams={routeParams} item={item} subrow={subrow} settings={settings} />
            {tableCells}
        </tr>
    );
}

export default ResultTableRow;