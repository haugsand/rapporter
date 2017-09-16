import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SelectColumnInterval from './SelectColumnInterval';

import makeRoute from './../../services/makeRoute';
import { removeColumnInterval, removeColumnEgenskapstype, setColumn, setColumnEgenskapstype, setColumnInterval } from './../../services/editSettings';



function SelectColumn({egenskapstyper, settings}) {

    const handleChangeColumn = (e) => {
        const newColumnArray = e.target.value.split(':');

        let newSettings = setColumn(settings, newColumnArray[0]);
        newSettings = removeColumnInterval(newSettings);
        newSettings = removeColumnEgenskapstype(newSettings);

        if (newColumnArray.length > 1) {
            newSettings = setColumnEgenskapstype(newSettings, newColumnArray[1]);
        }

        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }


    const changeColumnInterval = (columnInterval) => {

        let newSettings = {};
        if (columnInterval) {
            newSettings = setColumnInterval(settings, columnInterval);
        } else {
            newSettings = removeColumnInterval(settings);
        }

        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }


    let filteredEgenskapstyper = [];
    if (egenskapstyper.items[settings.vegobjekttype]) {
        filteredEgenskapstyper = egenskapstyper.items[settings.vegobjekttype].filter(egenskapstype => {
            return [2, 30, 31].indexOf(egenskapstype.datatype) > -1;
        });
    }


    let showSelectColumnInterval = false;
    if (settings.hasColumnEgenskapstype) {
        filteredEgenskapstyper.forEach(item => {
            if (item.id === settings.columnEgenskapstype) {
                if (item.datatype === 2) {
                    showSelectColumnInterval = true;
                }
            }
        })
    }

    let activeColumn = settings.column; 
    if (settings.hasColumnEgenskapstype) {
        activeColumn += ':' + settings.columnEgenskapstype;
    }

    return (
        <div>
            <select value={activeColumn} onChange={handleChangeColumn}>
                <option value="vegkategori">Vegkategori</option>
                {filteredEgenskapstyper.map(egenskapstype =>
                    <option key={egenskapstype.id} value={'egenskapstype:'+egenskapstype.id}>{egenskapstype.navn}</option>
                )}
            </select>
            {showSelectColumnInterval && <SelectColumnInterval settings={settings} changeColumnInterval={changeColumnInterval} />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    egenskapstyper: state.egenskapstyper
})

export default connect(mapStateToProps)(SelectColumn);
