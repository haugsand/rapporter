import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import IntervalInput from './IntervalInput';
import { getRoute } from './../../services/getRoute';


function SelectColumn({egenskapstyper, routeParams, settings}) {

    const handleChangeColumn = (e) => {
        let newRoute = getRoute(routeParams, 'column', e.target.value);
        browserHistory.push(newRoute);
    }

    const vegobjekttype = routeParams.vegobjekttype;

    let filteredEgenskapstyper = [];
    if (egenskapstyper.items[routeParams.vegobjekttype]) {
        filteredEgenskapstyper = egenskapstyper.items[vegobjekttype].filter(egenskapstype => {
            return [2, 30, 31].indexOf(egenskapstype.datatype) > -1;
        });
    }

    let intervalInput = '';

    if (settings.hasColumnEgenskapstype) {

        filteredEgenskapstyper.forEach(item => {
            if (item.id === settings.columnEgenskapstype) {
                if (item.datatype === 2) {

                    intervalInput = <IntervalInput routeParams={routeParams} settings={settings} />;

                }
            }
        })
    }

    return (
        <div>
            <select value={settings.column} onChange={handleChangeColumn}>
                <option value="vegkategori">Vegkategori</option>
                {filteredEgenskapstyper.map(egenskapstype =>
                    <option key={egenskapstype.id} value={'egenskapstype:'+egenskapstype.id}>{egenskapstype.navn}</option>
                )}
            </select>
            {intervalInput}
        </div>
    )

}

const mapStateToProps = (state) => ({
    egenskapstyper: state.egenskapstyper
})

export default connect(mapStateToProps)(SelectColumn);
