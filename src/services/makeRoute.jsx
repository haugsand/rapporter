
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


function makeOverlappFilterString(overlappFilter) {

    let overlappFilterList = [];

    overlappFilter.forEach(filter => {
        let filterString = filter.vegobjekttype;

        if (filter.hasEgenskapFilter) {
            filterString += '(' + makeEgenskapFilterString(filter.egenskapFilter) + ')';
        }

        overlappFilterList.push(filterString)
    });

    return overlappFilterList.join(',');
}


export default function makeRoute (settings) {

    const {
        columnEgenskapstype,
        columnInterval,
        columnType,
        egenskapFilter,
        fylkeFilter,
        hasColumnEgenskapstype,
        hasColumnInterval,
        hasEgenskapFilter,
        hasFilter,
        hasFylkeFilter,
        hasKommuneFilter,
        hasOverlappFilter,
        hasRegionFilter,
        hasRowFilter,
        hasSubrow,
        hasVegreferanseFilter,
        kommuneFilter,
        overlappFilter,
        regionFilter,
        result,
        row,
        rowFilter,
        subrow,
        vegobjekttype,
        vegreferanseFilter
    } = settings;


    let columnString = columnType;

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
        const overlappFilterString = makeOverlappFilterString(overlappFilter);
        queryArray.push('overlapp=' + overlappFilterString);
    }

    if (hasRegionFilter) {
        queryArray.push('region=' + regionFilter.join(','));
    }

    if (hasVegreferanseFilter) {
        queryArray.push('vegreferanse=' + vegreferanseFilter.join(','));
    }


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