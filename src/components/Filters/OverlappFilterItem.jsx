import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import EgenskapsFilterForm from './EgenskapsFilterForm';
import EgenskapsFilterItem from './EgenskapsFilterItem';

import makeRoute from './../../services/makeRoute';
import { removeOverlappFilter } from './../../services/editSettings';

import { getRoute } from './../../services/getRoute';



function OverlappFilterItem ({routeParams, vegobjekttyper, filter, settings}) {

    const handleRemoveOverlappFilter = (e) => {

        const newSettings = removeOverlappFilter(settings, parseInt(e.target.dataset.vegobjekttype, 10));
        const newRoute = makeRoute(newSettings);

        browserHistory.push(newRoute);
    }

    const {
        egenskapFilter,
        vegobjekttype
    } = filter;


    let navn = vegobjekttype;
    if (vegobjekttyper[vegobjekttype]) {
        navn = vegobjekttyper[vegobjekttype].navn;
    }

    return (
        <li key={vegobjekttype} className="filters__filterlistitem">
            {navn}
            <button 
                className="filters__removebutton"
                data-vegobjekttype={vegobjekttype}
                onClick={handleRemoveOverlappFilter}>x</button>

            <ul>
                {egenskapFilter.map(filter => (
                    <EgenskapsFilterItem key={filter.filterString} filter={filter} overlapp={vegobjekttype} settings={settings} />
                ))}
            </ul>

            <EgenskapsFilterForm overlapp={vegobjekttype} routeParams={routeParams} settings={settings} />
        </li>
    )
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


export default connect(mapStateToProps)(OverlappFilterItem);