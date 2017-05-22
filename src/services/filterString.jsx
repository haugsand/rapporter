const REGEX = /([0-9]+)(=|!=|<|>|<=|>=)(.+)/;



export function filterStringToList(filterString) {

    if (filterString === '') {
        return [];
    }

    let activeFilters = [];

    const queryList = filterString.split(' AND ');
    const queryListModified = queryList.map(item => {
        return item.slice(1, -1);
    });

    let filterStringList = [];
    
    queryListModified.forEach(items => {
        items.split(' OR ').forEach(item => {
            filterStringList.push(item);
        });
    });


    filterStringList.forEach(string => {
        let array = REGEX.exec(string);

        activeFilters.push({
            filter: parseInt(array[1], 10) + array[2] + array[3].slice(1, -1),
            egenskapstype: parseInt(array[1], 10),
            operator: array[2],
            verdi: array[3].slice(1, -1)
        }); 
    })

    return activeFilters;

};


export function makeFilterString(activeFilters) {

    let activeFiltersObject = {};

    activeFilters.forEach(filter => {
        let key = filter.egenskapstype + filter.operator;
        if (!activeFiltersObject.hasOwnProperty(key)) {
            activeFiltersObject[key] = [key + '\'' + filter.verdi + '\''];
        } else {
            activeFiltersObject[key].push(key + '\'' + filter.verdi + '\'');
        }
    })

    let activeFiltersList = [];
    Object.keys(activeFiltersObject).forEach(key => {
        activeFiltersList.push('(' + activeFiltersObject[key].join(' OR ') + ')');
    });

    let filter = activeFiltersList.join(' AND ');

    return filter;
}