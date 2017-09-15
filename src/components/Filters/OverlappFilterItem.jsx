import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getRoute } from './../../services/getRoute';

import EgenskapsFilterForm from './EgenskapsFilterForm';
import EgenskapsFilterItem from './EgenskapsFilterItem';


function handleRemoveOverlappFilter (routeParams, id) {
    const newRoute = getRoute(routeParams, 'removeQuery', {'overlapp': id});
    browserHistory.push(newRoute);
}

function OverlappFilterItem ({routeParams, value, vegobjekttyper, filter}) {

    const {
        egenskapFilter,
        vegobjekttype
    } = filter;

    let navn = vegobjekttype;

    if (vegobjekttyper[vegobjekttype]) {
        navn = vegobjekttyper[vegobjekttype].navn;
    }

    let filters = [];

    egenskapFilter.forEach(filter => {
        filters.push(
            <EgenskapsFilterItem
                key={filter.filterString}
                filter={filter}
                routeParams={routeParams}
                overlapp={vegobjekttype}
            />
        );
    });

    return (
        <li key={vegobjekttype} className="filters__filterlistitem">
            {navn}
            <button 
                className="filters__removebutton"
                onClick={(e) => { handleRemoveOverlappFilter(routeParams, value) }}>x</button>
            <ul>
                {filters}
            </ul>
            <EgenskapsFilterForm overlapp={vegobjekttype} routeParams={routeParams} />
        </li>
    )

}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


export default connect(mapStateToProps)(OverlappFilterItem);