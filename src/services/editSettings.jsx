



export function addAreaFilter(settings, type, area) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasFilter = true;
    newSettings['has' + type.charAt(0).toUpperCase() + type.slice(1) + 'Filter'] = true;
    newSettings[type + 'Filter'].push(area);

    return newSettings;
}


export function addEgenskapFilter(settings, egenskapFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    
    newSettings.hasFilter = true;
    newSettings.hasEgenskapFilter = true;
    newSettings.egenskapFilter.push(egenskapFilter);

    return newSettings;
}




export function addOverlappFilter(settings, overlappFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    
    newSettings.hasFilter = true;
    newSettings.hasOverlappFilter = true;
    newSettings.overlappFilter.push({
        hasEgenskapFilter: false,
        egenskapFilter: [],
        vegobjekttype: overlappFilter
    });

    return newSettings;
}


export function removeAreaFilter(settings, type, area) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings[type + 'Filter'] = newSettings[type + 'Filter'].filter(filter => {
        return filter !== area;
    })

    if (newSettings[type + 'Filter'].length === 0) {
        newSettings['has' + type.charAt(0).toUpperCase() + type.slice(1) + 'Filter'] = false;
    }

    return newSettings;
}


export function removeAllEgenskapFilter(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.egenskapFilter = [];
    newSettings.hasEgenskapFilter = false;

    return newSettings;
}


export function removeEgenskapFilter(settings, egenskapFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.egenskapFilter = newSettings.egenskapFilter.filter(filter => {
        return filter.filterString !== egenskapFilter;
    })

    if (newSettings.egenskapFilter.length === 0) {
        newSettings.hasEgenskapFilter = false;
    }

    return newSettings;
}


export function removeOverlappFilter(settings, overlappFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.overlappFilter = newSettings.overlappFilter.filter(filter => {
        return filter.vegobjekttype !== overlappFilter;
    })

    if (newSettings.overlappFilter.length === 0) {
        newSettings.hasOverlappFilter = false;
    }

    return newSettings;
}



export function removeColumnInterval(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasColumnInterval = false;
    newSettings.columnInterval = '';

    return newSettings;
}


export function removeColumnEgenskapstype(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasColumnEgenskapstype = false;
    newSettings.columnEgenskapstype = '';

    return newSettings;
}


export function removeOverlappEgenskapFilter(settings, overlapp, egenskapFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.overlappFilter.forEach((overlappFilter, index) => {
        if (overlappFilter.vegobjekttype === overlapp) {
            newSettings.overlappFilter[index].egenskapFilter = newSettings.overlappFilter[index].egenskapFilter.filter(filter => {
                return filter.filterString !== egenskapFilter;
            })

            if (newSettings.overlappFilter[index].egenskapFilter.length === 0) {
                newSettings.overlappFilter[index].hasEgenskapFilter = false;
            }
        }
    })

    return newSettings;
}



export function addOverlappEgenskapFilter(settings, overlapp, egenskapFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.overlappFilter.forEach((overlappFilter, index) => {
        if (overlappFilter.vegobjekttype === overlapp) {
            newSettings.overlappFilter[index].hasEgenskapFilter = true;
            newSettings.overlappFilter[index].egenskapFilter.push(egenskapFilter);
        }
    })

    return newSettings;
}


export function removeRowFilter(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasRowFilter = false;
    newSettings.rowFilter = '';

    return newSettings;
}


export function removeSubrow(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasSubrow = false;
    newSettings.subrow = '';

    return newSettings;
}




export function removeVegreferanseFilter(settings, VegreferanseFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.vegreferanseFilter = newSettings.vegreferanseFilter.filter(filter => {
        return filter !== VegreferanseFilter;
    })

    if (newSettings.vegreferanseFilter.length === 0) {
        newSettings.hasVegreferanseFilter = false;
    }

    return newSettings;
}


export function setColumn(settings, column) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.column = column;

    return newSettings;
}


export function setColumnEgenskapstype(settings, columnEgenskapstype) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    
    newSettings.hasColumnEgenskapstype = true;
    newSettings.columnEgenskapstype = columnEgenskapstype;

    return newSettings;
}


export function setColumnInterval(settings, columnInterval) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    
    newSettings.hasColumnInterval = true;
    newSettings.columnInterval = columnInterval;

    return newSettings;
}


export function setResult(settings, result) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.result = result;

    return newSettings;
}


export function setRow(settings, row) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.row = row;

    return newSettings;
}


export function setSubrow(settings, subrow) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    
    newSettings.hasSubrow = true;
    newSettings.subrow = subrow;

    return newSettings;
}


export function setRowFilter(settings, rowFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasRowFilter = true;
    newSettings.rowFilter = rowFilter;

    return newSettings;
}


export function setVegobjekttype(settings, vegobjekttype) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.vegobjekttype = vegobjekttype;

    return newSettings;
}
