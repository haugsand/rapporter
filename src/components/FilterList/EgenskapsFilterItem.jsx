import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { removeEgenskapFilter, removeOverlappEgenskapFilter } from './../../services/editSettings';


function EgenskapsFilterItem ({filter, egenskapstyperAll, overlapp, settings}) {

    const removeEgenskapsFilter = (e) => {
        let newSettings = {};

        if (overlapp) {
            newSettings = removeOverlappEgenskapFilter(settings, overlapp, e.target.dataset.filter);
        } else {
            newSettings = removeEgenskapFilter(settings, e.target.dataset.filter);
        }

        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }


    let vegobjekttype = settings.vegobjekttype;
    if (overlapp) {
        vegobjekttype = overlapp;
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
                data-filter={filter.filterString}
                onClick={removeEgenskapsFilter}>
                x
            </button>
    	</li>
    )

}

const mapStateToProps = (state) => ({
    egenskapstyperAll: state.egenskapstyper.items
})

export default connect(mapStateToProps)(EgenskapsFilterItem);