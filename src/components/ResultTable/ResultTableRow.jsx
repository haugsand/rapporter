import React from 'react';
import { buildParameters, buildParametersAll } from './../../services/parameters';

import { buildQuery } from './../../services/makeRoute';

import ResultTableCell from './ResultTableCell';
import ResultTableRowTitle from './ResultTableRowTitle';


function ResultTableRow ({item, routeParams, subrow, columnValues, settings}) {

    let rowValue = '';
    if (item) {
        rowValue = item.nummer;
    }

    const tableCells = columnValues.map((columnValue, index) => {
        const parameters = buildParametersAll(routeParams, rowValue, columnValue.id, subrow);
        const query = buildParameters(routeParams, rowValue, columnValue.id, subrow);
        console.log('1old: ' + query);
        console.log('2new: ' + buildQuery(settings, rowValue, columnValue.id, subrow));
        return <ResultTableCell key={index} parameters={parameters} query={query} resultParam={settings.result} />;
    });

    const sumParameter = buildParametersAll(routeParams, rowValue, '', subrow);
    const sumQuery = buildParameters(routeParams, rowValue, '', subrow);
    const tableCellSum = <ResultTableCell key="sum" parameters={sumParameter} query={sumQuery} resultParam={settings.result} />;

    return (
        <tr>
            <ResultTableRowTitle item={item} subrow={subrow} settings={settings} />
            {tableCells}
            {tableCellSum}
        </tr>
    );
}

export default ResultTableRow;