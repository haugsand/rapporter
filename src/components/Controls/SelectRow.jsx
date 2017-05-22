import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

class SelectRow extends Component {

    handleChangeRow (value) {
        let newRoute = getRoute(this.props.routeParams, 'row', value);
        browserHistory.push(newRoute);
    }

    render() {

        let row = this.props.routeParams.row.split('-')[0].split(':')[0];

        if (this.props.routeParams.row.split('-')[1]) {
            row += '-' + this.props.routeParams.row.split('-')[1];
        }

        return (
            <select value={row}  onChange={(e) => { this.handleChangeRow(e.target.value) }}>
                <option value="region">Region</option>
                <option value="region-fylke">Region &rsaquo; Fylke</option>
                <option value="fylke">Fylke</option>
                <option value="fylke-kommune">Fylke &rsaquo; Kommune</option>
                <option value="kommune">Kommune</option>
                <option value="vegkategori">Vegkategori</option>
            </select>
        )
    }
}

export default SelectRow;