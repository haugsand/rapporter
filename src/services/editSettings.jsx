

export function removeRowFilter(settings) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasRowFilter = false;
    newSettings.rowFilter = '';

    return newSettings;
}


export function setResult(settings, result) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.result = result;

    return newSettings;
}


export function setRowFilter(settings, rowFilter) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    newSettings.hasRowFilter = true;
    newSettings.rowFilter = rowFilter;

    return newSettings;
}

