import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import EgenskapsFilterForm from './../FilterForm/EgenskapsFilterForm';
import EgenskapsFilterItem from './EgenskapsFilterItem';

import {makeRoute} from './../../services/makeRoute';
import { removeOverlappFilter } from './../../services/editSettings';


function OverlappFilterItem ({vegobjekttyper, filter, settings}) {

    const handleRemoveOverlappFilter = (e) => {

        const newSettings = removeOverlappFilter(settings, parseInt(e.target.dataset.vegobjekttype, 10));
        const newRoute = makeRoute(newSettings);

        browserHistory.push(newRoute);
    }

    const {
        egenskapFilter,
        vegobjekttype
    } = filter;


    let showWarning = false;
    if (['region', 'fylke', 'kommune'].indexOf(settings.row) > -1 || settings.hasRegionFilter || settings.hasFylkeFilter || settings.hasKommuneFilter) {
        showWarning = true;
    }


    let navn = vegobjekttype;
    if (vegobjekttyper[vegobjekttype]) {
        navn = vegobjekttyper[vegobjekttype].navn;
    }

    return (
        <li key={vegobjekttype} className="filters__filterlistitem">
            {navn}
            {showWarning && <span>(!)</span>}

            <button 
                className="filters__removebutton"
                data-vegobjekttype={vegobjekttype}
                onClick={handleRemoveOverlappFilter}>x</button>

            <ul>
                {egenskapFilter.map(filter => (
                    <EgenskapsFilterItem key={filter.filterString} filter={filter} overlapp={vegobjekttype} settings={settings} />
                ))}
            </ul>

            <EgenskapsFilterForm overlapp={vegobjekttype} settings={settings} />
        </li>
    )
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


export default connect(mapStateToProps)(OverlappFilterItem);