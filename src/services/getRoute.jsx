export function getRoute(routeParams, param, value) {

    routeParams = JSON.parse(JSON.stringify(routeParams));


    if (param === 'updateOverlapp') {
        let oldQuery = routeParams.query;

        let vegobjekttypeId = value.split('(')[0];

        let updateIndex = 0;

        let overlappItems = oldQuery.overlapp.split(',');

        overlappItems.forEach((item, index) => {

            if (item.split('(')[0] === vegobjekttypeId) {
                updateIndex = index;
            }
        });

        overlappItems[updateIndex] = value;

        value = {
            ...oldQuery,
            overlapp: overlappItems.join(',')
        };

        param = 'query';
    }

    if (param === 'addQuery') {
        let oldQuery = routeParams.query;
        //console.log(oldQuery);
        //console.log(value);

        let key = Object.keys(value)[0];
        let keyValue = value[key];
        //console.log(key);
        //console.log(keyValue);

        let newValue = keyValue;
        
        if (key !== 'egenskap' && Object.prototype.hasOwnProperty.call(oldQuery, key)) {
            newValue = oldQuery[key] + ',' + newValue;
        }
        
        value = {
            ...oldQuery,
            [key]: newValue
        };

        param = 'query';
        //console.log(value);
    }



    if (param === 'removeQuery') {
        let oldQuery = routeParams.query;

        let key = Object.keys(value)[0]; // fylke

        if (key === 'egenskap') {

            delete oldQuery.egenskap;

        } else {

            let keyValue = value[key];  // 16

            let oldValues = oldQuery[key].split(',');

            if (oldValues.length < 2) {
                delete oldQuery[key];
            } else {
                let newValues = oldValues.filter(item => {
                    return item !== keyValue;
                });
                oldQuery[key] = newValues.join(',');
            }

        }

        

        value = {
            ...oldQuery
        };

        param = 'query';
        //console.log(value);
    }

    if (param === 'vegobjekttype') {

        // Removes egenskapstype as active column, when changing vegobjekttype
        if (routeParams.column.split(':').length === 2) {
            routeParams.column = 'vegkategori';
        }

        // FIX
        routeParams.result = 'antall';

        // Removes egenskapsfilter if present
        if (Object.prototype.hasOwnProperty.call(routeParams.query, 'egenskap')) {
            delete routeParams.query.egenskap;
        }
    }

    // Logic to keep rowfilter
    if (param === 'row') {
        let oldRow = routeParams.row.split('-');
        let newRow = value.split('-');

        if (oldRow[0].split(':')[0] === newRow[0].split(':')[0]) {
            if (oldRow[1] !== newRow[1]) {

                if (newRow.length === 2) {
                    if (oldRow[0].split(':').length === 2) {
                        value = oldRow[0] + '-' + newRow[1];
                    }
                } else if (oldRow.length === 2) {
                    if (newRow[0].split(':').length === 2) {
                        value = newRow[0] + '-' + oldRow[1];
                    } else if (oldRow[0].split(':').length === 2) {
                        value = oldRow[0];
                    }
                }
            }
        }
    }
    

    let params = {
        ...routeParams,
        [param]: value
    }

    //console.log(params.query);

    let queryString = '';
    let queryParams = Object.keys(params.query);
    if (queryParams.length > 0) {

        let queryParamsList = [];
        queryParams.forEach(function(param) {
            queryParamsList.push(param + '=' + params.query[param]);
        });
        queryString += '?' + queryParamsList.join('&');
    }

    let route = '/' + params.vegobjekttype + '/' + params.column + '/' + params.row + '/' + params.result + queryString;

    return route;
}


/*

Hvis vegobjekttype, column, row eller result:
    Endre param

Hvis addQuery
    Hvis egenskap
        Angi egenskapsparameter
    Hvis overlapp:
Hvis removeQuery
    Hvis egenskap:
        Fjern egenskapsparameter

overlapp= c, y
egenskap=""
fylke=23,432

Overlapp: Legg til ekstra parametere
Egenskap: Erstatt eksisterende
Vegreferanse, fylke, region, kommune: Legg til ekstra eller kombiner med eksisterende.




 1  - 2
3:4


"region:3-fylke" -> "region-fylke"
"region:3" -> "region"


Ved bytte i select: "region:3" -> "region:3-fylke", ikke "region:3" -> "region-fylke" 


Hvis gammel 3 er lik ny 3, 

    Hvis gammel 2 er lik ny 2
        return value
    Hvis ny 2 har innhold 
        Hvis gammel 4 har innhold
            Gammel 1 og ny 2
    Hvis gammel 2 har innhold
        Hvis ny 4 har innhold
            Ny 1 og gammel 2
        Hvis gammel 4 har innhold
            Gammel 1 og ny 2

Denne fungerer!

Ved trykk på knapp: "region-fylke" -> "region:3-fylke", ikke "region-fylke" -> "region:3"

Hvis gammel 3 er lik ny 3,
    Hvis ny 2 er tom og gammel 2 har innhold og ny 4 har innhold
        Ny 1 og gammel 2

Denne fungerer også!



Den ovenfor virker ikke fra region-fylke til region. Virker nå!

Men: 



"region:3-fylke" -> "region:3", ikke "region:3-fylke" -> "region"

Hvis gammel 3 er lik ny 3


    gammel 1 ny 2



Hva med denne?



*/