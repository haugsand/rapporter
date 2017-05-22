import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getOverlappFilterString } from './../../services/routeParamsTools';
import { filterStringToList } from './../../services/filterString';

import { getRoute } from './../../services/getRoute';

import EgenskapsFilterForm from './EgenskapsFilterForm';

import EgenskapsFilterItem from './EgenskapsFilterItem';


const handleRemoveOverlappFilter = (routeParams, id) => {
    const newRoute = getRoute(routeParams, 'removeQuery', {'overlapp': id});
    browserHistory.push(newRoute);
}

let OverlappFilterItem = ({routeParams, value, vegobjekttyper}) => {

    const vegobjekttypeId = value.split('(')[0];
    let navn = vegobjekttypeId;

    if (vegobjekttyper[vegobjekttypeId]) {
        navn = vegobjekttyper[vegobjekttypeId].navn;
    }

    let filters = [];
    const overlappFilterString = getOverlappFilterString(routeParams.query.overlapp, vegobjekttypeId);
    const activeFilters = filterStringToList(overlappFilterString);
    activeFilters.forEach(filter => {
        filters.push(
            <EgenskapsFilterItem
                key={filter.filter}
                filter={filter}
                routeParams={routeParams}
                overlapp={vegobjekttypeId}
            />
        );
    });

    return (
        <li key={vegobjekttypeId} className="filters__filterlistitem">
            {navn}
            <button 
                className="filters__removebutton"
                onClick={(e) => { handleRemoveOverlappFilter(routeParams, value) }}>x</button>
            <ul>
            {filters}
            </ul>
            <EgenskapsFilterForm 
                overlapp={vegobjekttypeId}
                routeParams={routeParams}
            />
        </li>
    )

}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


OverlappFilterItem = connect(mapStateToProps)(OverlappFilterItem);
export default OverlappFilterItem;