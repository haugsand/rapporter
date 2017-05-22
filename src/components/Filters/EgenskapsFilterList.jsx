import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getRoute } from './../../services/getRoute';
import { filterStringToList, makeFilterString } from './../../services/filterString';
import { getOverlappFilterString, getEgenskapFilterString } from './../../services/routeParamsTools';

const handleRemoveFilter = (removedFilter, activeFilters, routeParams, overlapp) => {

    let filteredActiveFilters = activeFilters.filter(item => {
        return item.filter !== removedFilter;
    });

    let newRoute = '';

    if (filteredActiveFilters.length > 0) {
        let filter = makeFilterString(filteredActiveFilters);

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


let EgenskapsFilterList = ({egenskapstyperAll,  routeParams, overlapp = false}) => {

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

    let navnEgenskapstyper = {};
    let navnVerdier = {};
    let datatype = {};

    egenskapstyper.forEach(item => {
        navnEgenskapstyper[item.id] = item.navn;
        datatype[item.id] = item.datatype;

        if (item.hasOwnProperty('tillatte_verdier')) {
            item.tillatte_verdier.forEach(verdi => {
                navnVerdier[verdi.id] = verdi.navn;
            });
        }
    });


    let filterString = '';
    if (overlapp) {
        filterString = getOverlappFilterString(routeParams.query.overlapp, overlapp);
    } else {
        filterString = getEgenskapFilterString(routeParams.query);
    }
    const activeFilters = filterStringToList(filterString);


    let filters = [];

    activeFilters.forEach((filter, index) => {

        let navn = navnEgenskapstyper[filter.egenskapstype];

        let verdi = filter.verdi;
        if ([30, 31].indexOf(datatype[filter.egenskapstype]) > -1) {
            verdi = navnVerdier[filter.verdi];
        }

        filters.push(
            <li key={filter.filter} className="filters__filterlistitem">
                {navn}
                {' ' + filter.operator + ' '}
                {verdi}
                <button 
                    className="filters__removebutton"
                    onClick={(e) => { handleRemoveFilter(filter.filter, activeFilters, routeParams, overlapp) }}>
                    x
                </button>
            </li>
        );
    })


    return (
        <ul className="filters__filterlist">
            {filters}
        </ul>
    );
}

const mapStateToProps = (state) => ({
    egenskapstyperAll: state.egenskapstyper.items
})


EgenskapsFilterList = connect(mapStateToProps)(EgenskapsFilterList);


export default EgenskapsFilterList;