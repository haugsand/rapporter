import React from 'react';

import { buildQuery } from './../../services/makeRoute';

import ResultTableCell from './ResultTableCell';
import ResultTableRowTitle from './ResultTableRowTitle';


function ResultTableRow ({item, subrow, columnValues, settings}) {

    let rowValue = '';
    if (item) {
        rowValue = item.nummer;
    }

    const tableCells = columnValues.map((columnValue) => {
        //const parameters = buildParametersAll(routeParams, rowValue, columnValue.id, subrow);
        //const query = buildParameters(routeParams, rowValue, columnValue.id, subrow);
        const query = buildQuery(settings, rowValue, columnValue.id, subrow);
        const parameters = settings.vegobjekttype + '?' + query;
        return <ResultTableCell key={parameters} parameters={parameters} query={query} resultParam={settings.result} />;
    });

    //const sumParameter = buildParametersAll(routeParams, rowValue, '', subrow);
    //const sumQuery = buildParameters(routeParams, rowValue, '', subrow);
    const sumQuery = buildQuery(settings, rowValue, '', subrow);
    const sumParameter = settings.vegobjekttype + '?' + sumQuery;
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