import React from 'react';
import { browserHistory } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { removeRowFilter, removeSubrow, setRow, setSubrow } from './../../services/editSettings';


function SelectRow ({settings}) {

    const handleChangeRow = (e) => {
        const newRowArray = e.target.value.split('-');

        let newSettings = removeSubrow(settings);

        if (newRowArray[0] !== settings.row) {
            newSettings = removeRowFilter(newSettings);
            newSettings = setRow(newSettings, newRowArray[0]);
        }

        if (newRowArray.length > 1) {
            newSettings = setSubrow(newSettings, newRowArray[1]);
        }

        const newRoute = makeRoute(newSettings);
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