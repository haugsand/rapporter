
function parseEgenskapFilterString (egenskapFilterString) {

    const REGEX = /([0-9]+)(=|!=|<|>|<=|>=)(.+)/;

    let egenskapFilterArray = [];
    egenskapFilterString.slice(1, -1).split(' AND ').forEach(str1 => {
        str1.slice(1, -1).split(' OR ').forEach(str2 => {
            egenskapFilterArray.push(str2);
        })
    })

    let egenskapFilter = [];
    egenskapFilterArray.forEach(filter => {

        const filterArray = REGEX.exec(filter);

        egenskapFilter.push({
            filterString: filter,
            egenskapstype: parseInt(filterArray[1], 10),
            operator: filterArray[2],
            verdi: filterArray[3]
        })
    })

    return egenskapFilter;
}


function parseOverlappQueryString (overlappQueryString) {

    let overlappFilter = [];

    overlappQueryString.split(',').forEach(filter => {
        
        const vegobjekttype = parseInt(filter.split('(')[0], 10);

        let hasEgenskapFilter = false;
        let egenskapFilter = [];

        if (filter.split('(').length > 1) {
            hasEgenskapFilter = true;
            egenskapFilter = parseEgenskapFilterString(filter.replace(vegobjekttype, ''));
        }

        overlappFilter.push({
            hasEgenskapFilter: hasEgenskapFilter,
            egenskapFilter: egenskapFilter,
            vegobjekttype: vegobjekttype
        });

    });

    return overlappFilter;
    
}



export default function getSettings (routeParams) {

    const {
        column,
        query,
        result,
        row,
        vegobjekttype
    } = routeParams;

    let settings = {};

    settings = {
        column: column.split(':')[0],
        columnEgenskapstype: '',
        columnInterval: [],
        egenskapFilter: [],
        fylkeFilter: [],
        hasColumnEgenskapstype: false,
        hasColumnInterval: false,
        hasEgenskapFilter: false,
        hasFilter: false,
        hasFylkeFilter: false,
        hasKommuneFilter: false,
        hasOverlappFilter: false,
        hasRegionFilter: false,
        hasRowFilter: false,
        hasSubrow: false,
        hasVegreferanseFilter: false,
        kommuneFilter: [],
        overlappFilter: [],
        regionFilter: [],
        result: result,
        row: row.split('-')[0].split(':')[0],
        rowFilter: '',
        subrow: '',
        vegobjekttype: parseInt(vegobjekttype, 10),
        vegreferanseFilter: []
    }


    if (row.split('-').length > 1) {
        settings.hasSubrow = true;
        settings.subrow = row.split('-')[1];
    }

    if (row.split(':').length > 1) {
        settings.hasRowFilter = true;
        settings.rowFilter = row.split('-')[0].split(':')[1];
    }

    if (column.split(':').length > 1) {
        settings.hasColumnEgenskapstype = true;
        settings.columnEgenskapstype = parseInt(column.split(':')[1].split(';')[0], 10);
    }

    if (column.split(';').length > 1) {
        settings.hasColumnInterval = true;
        settings.columnInterval = column.split(';')[1].split(',');
    }

    if (Object.keys(query).length > 0) {
        settings.hasFilter = true;
    }

    Object.keys(query).forEach(parameter => {
        settings['has' + parameter.charAt(0).toUpperCase() + parameter.slice(1) + 'Filter'] = true;
    })


    if (settings.hasRegionFilter) {
        settings.regionFilter = query.region.split(',').map(filter => {
            return filter;
        });
    }

    if (settings.hasFylkeFilter) {
        settings.fylkeFilter = query.fylke.split(',').map(filter => {
            return filter;
        });
    }

    if (settings.hasKommuneFilter) {
        settings.kommuneFilter = query.kommune.split(',').map(filter => {
            return filter;
        });
    }

    if (settings.hasVegreferanseFilter) {
        settings.vegreferanseFilter = query.vegreferanse.split(',');
    }

    if (settings.hasEgenskapFilter) {
        settings.egenskapFilter = parseEgenskapFilterString(query.egenskap);
    }

    if (settings.hasOverlappFilter) {
        settings.overlappFilter = parseOverlappQueryString(query.overlapp);
    }


    return settings;
}