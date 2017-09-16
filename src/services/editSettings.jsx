

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

