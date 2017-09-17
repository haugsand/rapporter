import { addAreaFilter, addEgenskapFilter } from './editSettings';


function makeEgenskapFilterString(egenskapFilter) {

    let egenskapFilterKeys = [];

    egenskapFilter.forEach(filter => {
        const key = filter.egenskapstype + filter.operator;

        if (egenskapFilterKeys.hasOwnProperty(key)) {
            egenskapFilterKeys[key].push(key + filter.verdi);
        } else {
            egenskapFilterKeys[key] = [key + filter.verdi];
        }
    });


    let egenskapFilterList = [];

    Object.keys(egenskapFilterKeys).forEach(key => {
        egenskapFilterList.push('(' + egenskapFilterKeys[key].join(' OR ') + ')');
    });


    return egenskapFilterList.join(' AND ');
}


function makeOverlappFilterList(overlappFilter) {

    let overlappFilterList = [];

    overlappFilter.forEach(filter => {
        let filterString = filter.vegobjekttype;

        if (filter.hasEgenskapFilter) {
            filterString += '(' + makeEgenskapFilterString(filter.egenskapFilter) + ')';
        }

        overlappFilterList.push(filterString)
    });

    return overlappFilterList

}



function buildQueryArray (settings, splitOverlapp) {

    const {
        egenskapFilter,
        fylkeFilter,
        hasEgenskapFilter,
        hasFylkeFilter,
        hasKommuneFilter,
        hasOverlappFilter,
        hasRegionFilter,
        hasVegreferanseFilter,
        kommuneFilter,
        overlappFilter,
        regionFilter,
        vegreferanseFilter
    } = settings;

    let queryArray = [];

    if (hasEgenskapFilter) {
        const egenskapFilterString = makeEgenskapFilterString(egenskapFilter);
        queryArray.push('egenskap="' + egenskapFilterString + '"');
    }

    if (hasFylkeFilter) {
        queryArray.push('fylke=' + fylkeFilter.join(','));
    }

    if (hasKommuneFilter) {
        queryArray.push('kommune=' + kommuneFilter.join(','));
    }

    if (hasOverlappFilter) {
        if (splitOverlapp) {
            makeOverlappFilterList(overlappFilter).forEach(filterString => {
                queryArray.push('overlapp=' + filterString);
            });
        } else {
            const overlappFilterString = makeOverlappFilterList(overlappFilter).join(',');
            queryArray.push('overlapp=' + overlappFilterString);
        }
    }

    if (hasRegionFilter) {
        queryArray.push('region=' + regionFilter.join(','));
    }

    if (hasVegreferanseFilter) {
        queryArray.push('vegreferanse=' + vegreferanseFilter.join(','));
    }


    return queryArray; 
} 


export function makeRoute (settings) {

    const {
        column,
        columnEgenskapstype,
        columnInterval,
        hasColumnEgenskapstype,
        hasColumnInterval,
        hasFilter,
        hasRowFilter,
        hasSubrow,
        result,
        row,
        rowFilter,
        subrow,
        vegobjekttype
    } = settings;


    let columnString = column;

    if (hasColumnEgenskapstype) {
        columnString += ':' + columnEgenskapstype;
    }

    if (hasColumnInterval) {
        columnString += ';' + columnInterval.join(',');
    }


    let rowString = row;
    if (hasRowFilter) {
        rowString += ':' + rowFilter;
    }
    if (hasSubrow) {
        rowString += '-' + subrow;
    }


    const queryArray = buildQueryArray(settings);


    let queryString = '';

    if (hasFilter) {
        queryString = '?' + queryArray.join('&');
    }


    const routeArray = [
        '/' + vegobjekttype,
        '/' + columnString,
        '/' + rowString,
        '/' + result,
        queryString
    ];

    const route = routeArray.join('');

    return route;
}




export function buildQuery (settings, rowValue, columnValue, isSubrow) {


    let newSettings = JSON.parse(JSON.stringify(settings));

    if (rowValue !== '') {

        let areaType = newSettings.row;
        
        if (isSubrow) {
            areaType = newSettings.subrow;
        }

        areaType = areaType.replace('vegkategori', 'vegreferanse');

        newSettings = addAreaFilter(newSettings, areaType, rowValue);
    }


    if (columnValue !== '') {

        if (settings.column === 'vegkategori') {
            newSettings = addAreaFilter(newSettings, 'vegreferanse', columnValue);
        } else {
            if (columnValue.constructor === Array) {

                if (columnValue[0]) {
                    newSettings = addEgenskapFilter(newSettings, {
                        filterString: newSettings.columnEgenskapstype + '>' + columnValue[0],
                        egenskapstype: newSettings.columnEgenskapstype,
                        operator: '>',
                        verdi: columnValue[0]
                    });
                }

                if (columnValue[1]) {
                    newSettings = addEgenskapFilter(newSettings, {
                        filterString: newSettings.columnEgenskapstype + '<=' + columnValue[1],
                        egenskapstype: newSettings.columnEgenskapstype,
                        operator: '<=',
                        verdi: columnValue[1]
                    });
                }

            } else {
                newSettings = addEgenskapFilter(newSettings, {
                    filterString: newSettings.columnEgenskapstype + '=' + columnValue,
                    egenskapstype: newSettings.columnEgenskapstype,
                    operator: '=',
                    verdi: columnValue
                });
            }
        }
    }

    const splitOverlapp = true;
    const queryArray = buildQueryArray(newSettings, splitOverlapp);

    let query = '';

    if (newSettings.hasFilter) {
        query = queryArray.join('&');
    }


    return query;
}
