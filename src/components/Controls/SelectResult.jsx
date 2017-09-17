import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { setResult } from './../../services/editSettings';


function SelectResult ({settings, vegobjekttyper}) {

    const handleChangeResult = (e) => {
        const newSettings = setResult(settings, e.target.value);
        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }

    let disabled = false;
    if(vegobjekttyper.hasOwnProperty(settings.vegobjekttype)) {
        if (vegobjekttyper[settings.vegobjekttype].stedfesting !== 'LINJE') {
            disabled = true;
        }
    }

    return (
        <select value={settings.result} onChange={handleChangeResult} >
            <option value="antall">Antall</option>
            <option value="strekningslengde" disabled={disabled}>Lengde</option>
        </select>
    );
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


export default connect(mapStateToProps)(SelectResult);