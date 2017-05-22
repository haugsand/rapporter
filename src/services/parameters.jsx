export function buildParameters (routeParams, rowValue, columnValue, isSubrow) {

    let filterParameter = '';

    let hasEgenskapsfilter = false;

    if (Object.keys(routeParams.query).length > 0) {

        let queryParamsList = [];

        Object.keys(routeParams.query).forEach(function(param) {

            let filter = param + '=' + routeParams.query[param];

            if (param === 'egenskap') {
                hasEgenskapsfilter = true;

                if (routeParams.column.split(':')[0] === 'egenskapstype' && columnValue !== '') {



                    let id = routeParams.column.split(':')[1].split(';')[0];

                    filter = filter.slice(0, -1);

                    if (columnValue.constructor === Array) {
                        let columnParameters = [];
                        if (columnValue[0]) {
                            columnParameters.push('(' + id + '>' + columnValue[0] + ')');
                        }
                        if (columnValue[1]) {
                            columnParameters.push('(' + id + '<=' + columnValue[1] + ')');
                        }
                        filter += ' AND ' + columnParameters.join(' AND ') + '"';
                    } else {

                        filter +=  ' AND (' + id + '=' + columnValue + ')"';
                    }


                }

            } else if (param === 'overlapp') {
                let overlappFilters = [];
                routeParams.query[param].split(',').forEach(item => {
                    overlappFilters.push(param + '=' + item);
                })
                filter = overlappFilters.join('&');
            }


            queryParamsList.push(filter);
        });

        filterParameter = queryParamsList.join('&') + '&';

    } 


    let row = routeParams.row.split('-')[0].split(':')[0];
    let subrow = '';

    if (routeParams.row.split('-').length === 2) {
        subrow = routeParams.row.split('-')[1];
    }

    if (isSubrow) {
        row = subrow;
    }

    let rowParameter = '';

    if (rowValue !== '') {
        if (row === 'vegkategori') {
            rowParameter = 'vegreferanse';
        } else {
            rowParameter = row;
        }
        rowParameter += '=' + rowValue + '&';
    }


    let columnParameter = '';

    if (columnValue !== '') {  
        if (routeParams.column === 'vegkategori') {
            columnParameter = 'vegreferanse=' + columnValue;
        } else {
            let id = routeParams.column.split(':')[1].split(';')[0];

            if (!hasEgenskapsfilter) {
                

                if (columnValue.constructor === Array) {
                    let columnParameters = [];
                    if (columnValue[0]) {
                        columnParameters.push('(' + id + '>' + columnValue[0] + ')');
                    }
                    if (columnValue[1]) {
                        columnParameters.push('(' + id + '<=' + columnValue[1] + ')');
                    }
                    columnParameter = 'egenskap="' + columnParameters.join(' AND ') + '"';
                } else {
                    columnParameter = 'egenskap="' + id + '=' + columnValue + '"';
                }


            }
        }
    }


    let parameters = filterParameter + rowParameter + columnParameter;

    if (parameters.slice(-1) === '&') {
        parameters = parameters.slice(0, -1);
    }

    parameters = parameters.split('\'null\'').join('null');

    return parameters;

}


export function buildParametersAll (routeParams, rowValue, columnValue, isSubrow) {

    let parameters = buildParameters(routeParams, rowValue, columnValue, isSubrow);

    let parametersAll = routeParams.vegobjekttype + '?' + parameters;

    return parametersAll;
}

