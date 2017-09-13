import React from 'react';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

function SelectRow ({routeParams, settings}) {

    const handleChangeRow = (e) => {
        const newRoute = getRoute(routeParams, 'row', e.target.value);
        browserHistory.push(newRoute);
    }

    let activeRow = settings.row; 
    if (settings.hasSubrow) {
        activeRow += '-' + settings.subrow;
    }

    return (
        <select value={activeRow} onChange={handleChangeRow}>
            <option value="region">Region</option>
            <option value="region-fylke">Region &rsaquo; Fylke</option>
            <option value="fylke">Fylke</option>
            <option value="fylke-kommune">Fylke &rsaquo; Kommune</option>
            <option value="kommune">Kommune</option>
            <option value="vegkategori">Vegkategori</option>
        </select>
    )

}

export default SelectRow;