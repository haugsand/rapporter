import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { filterStringToList, makeFilterString } from './../../services/filterString';
import { getOverlappFilterString, getEgenskapFilterString } from './../../services/routeParamsTools';

import { getRoute } from './../../services/getRoute';


const removeEgenskapsFilter = (removedFilter, routeParams, overlapp) => {

    console.log('start');
    console.log(removedFilter);
    console.log(routeParams);
    console.log(overlapp);
    console.log('slutt');

    let filterString = '';
    if (overlapp) {
        filterString = getOverlappFilterString(routeParams.query.overlapp, overlapp);
    } else {
        filterString = getEgenskapFilterString(routeParams.query);
    }
    console.log(filterString);
    const activeFilters = filterStringToList(filterString);


    let filteredActiveFilters = activeFilters.filter(item => {
        return item.filter != removedFilter;
    });

    let newRoute = '';

    if (filteredActiveFilters.length > 0) {
        const filter = makeFilterString(filteredActiveFilters);

        if (overlapp) {
            newRoute = getRoute(routeParams, 'updateOverlapp', overlapp + '(' + filter + ')');
        } else {
            newRoute = getRoute(routeParams, 'addQuery', {'egenskap': '"' + filter + '"'});
        }

    } else {
        if (overlapp) {
            newRoute = getRoute(routeParams, 'updateOverlapp', overlapp);
        } else {
            newRoute = getRoute(routeParams, 'removeQuery', {'egenskap': ''});
        }
    }

    browserHistory.push(newRoute);
}

let EgenskapsFilterItem = ({routeParams, filter, egenskapstyperAll, overlapp}) => {

    let vegobjekttype = 0;
    if (overlapp) {
        vegobjekttype = overlapp;
    } else {
        vegobjekttype = routeParams.vegobjekttype;
    }

    let egenskapstyper = [];
    if (egenskapstyperAll[vegobjekttype]) {
        egenskapstyper = egenskapstyperAll[vegobjekttype];
    }

    let navn = filter.egenskapstype;
    let verdi = filter.verdi;

    egenskapstyper.forEach(egenskapstype => {
        if (egenskapstype.id === filter.egenskapstype) {
            navn = egenskapstype.navn;

            if (egenskapstype.hasOwnProperty('tillatte_verdier')) {
                egenskapstype.tillatte_verdier.forEach(tillatt_verdi => {

                    if (tillatt_verdi.id+'' === filter.verdi+'') {
                        verdi = tillatt_verdi.navn;
                    }
                });
            }
        }
    });



    return (
    	<li className="filters__filterlistitem">
            {navn} {filter.operator} {verdi}
            <button 
                className="filters__removebutton"
                onClick={() => { removeEgenskapsFilter(filter.filterString, routeParams, overlapp) }}>
                x
            </button>
    	</li>
    )

}

const mapStateToProps = (state) => ({
    egenskapstyperAll: state.egenskapstyper.items
})


EgenskapsFilterItem = connect(mapStateToProps)(EgenskapsFilterItem);
export default EgenskapsFilterItem;