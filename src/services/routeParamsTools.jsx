


/*

routeParam                  = 'region:3-fylke'

getRow(routeParam)          = 'region'
getSubrow(routeParam)       = 'fylke'
getRowfilter(routeParam)    = '3'

*/

export function getRow(routeParam) {

    const row = routeParam.split('-')[0].split(':')[0];
    return row;
}


export function getSubrow(routeParam) {

    if (routeParam.split('-').length > 1) {
        const subrow = routeParam.split('-')[1];
        return subrow;

    } else {
        return false;

    }
}


export function getRowfilter(routeParam) {

    if (routeParam.split(':').length > 1) {
        const rowfilter = routeParam.split('-')[0].split(':')[1];
        return rowfilter;
    
    } else {
        return false;
    }
}




/*

routeParam                      = 'egenskapstype:1820;10,20,30'

getColumn(routeParam)           = 'egenskapstype'
getColumnId(routeParam)         = '1820'
getColumnInterval(routeParam)   = [10, 20, 30]

*/

export function getColumn(routeParam) {

    const column = routeParam.split(':')[0];
    return column;
}


export function getColumnId(routeParam) {

    if (routeParam.split(':').length > 1) {
        const columnId = routeParam.split(':')[1].split(';')[0];
        return columnId;

    } else {
        return false;

    }
}


export function getColumnInterval(routeParam) {

    if (routeParam.split(';').length > 1) {

        const intervalString = routeParam.split(';')[1];
        const intervalArray = intervalString.split(',');
        return intervalArray;
    
    } else {
        return false;
    }
}


/*

routeParam                                  = '105((2021='2728' OR 2021='2732') AND (9155='1337')),5'

getOverlappFilterString(routeParam, 105)    = '(2021='2728' OR 2021='2732') AND (9155='1337')'

*/


export function getOverlappFilterString(routeParam, id) {

    console.log(routeParam);
    console.log(id);

    let overlappFilterString = '';


    const overlappFilters = routeParam.split(',');
    console.log(overlappFilters);


    overlappFilters.forEach(overlappFilter => {
        let vegobjekttype = overlappFilter.split('(')[0];

        if (vegobjekttype == id) {
            if (overlappFilter.split('(').length > 1) {
                overlappFilterString = overlappFilter.slice(vegobjekttype.length).slice(1, -1);
            }
        }
    });

    return overlappFilterString;

}



/*

routeParam                             = {egenskap: '"(5483='7450') AND (5540='7876')"', kommune: 1601}

getEgenskapFilterString(routeParam)    = '(5483='7450') AND (5540='7876')'

*/



export function getEgenskapFilterString(routeParam) {

    let egenskapFilterString = '';

    if (Object.prototype.hasOwnProperty.call(routeParam, 'egenskap')) {
        egenskapFilterString = routeParam.egenskap.slice(1, -1);
    }

    return egenskapFilterString;
}



export function getOverlappFilters(routeParam) {

    if (Object.prototype.hasOwnProperty.call(routeParam, 'overlapp')) {
        const overlappFilters = routeParam.overlapp.split(',');
        return overlappFilters;

    } else {
        return [];
    }

}




export function getAreaFilters(routeParam) {

    let areaFilters = [];

    Object.keys(routeParam).forEach(key => {
        if (['region', 'fylke', 'kommune'].indexOf(key) > -1) {
            routeParam[key].split(',').forEach(value => {
                areaFilters.push({
                    type: key,
                    id: value
                });
            });
        }
    });
    return areaFilters;
}



export function getVegreferanseFilters(routeParam) {

    if (Object.prototype.hasOwnProperty.call(routeParam, 'vegreferanse')) {
        const vegreferanseFilters = routeParam.vegreferanse.split(',');
        return vegreferanseFilters;

    } else {
        return [];
    }
}



