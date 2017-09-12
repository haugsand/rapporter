import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import IntervalInput from './IntervalInput';
import { getRoute } from './../../services/getRoute';

class SelectColumn extends Component {


    handleChangeColumn = (e) => {
        let newRoute = getRoute(this.props.routeParams, 'column', e.target.value);
        browserHistory.push(newRoute);
    }

    render() {

        let vegobjekttype = this.props.routeParams.vegobjekttype;

        let egenskapstyper = [];
        if (this.props.egenskapstyper.items[this.props.routeParams.vegobjekttype]) {
            egenskapstyper = this.props.egenskapstyper.items[vegobjekttype].filter(egenskapstype => {
                return [2, 30, 31].indexOf(egenskapstype.datatype) > -1;
            });
        }

        let column = this.props.routeParams.column;
        let columnValue = column.split(';')[0];

        let intervalInput = '';

        if (column.split(':').length > 1) {
            let egenskapstypeId = parseInt(column.split(':')[1].split(';')[0], 10);

            egenskapstyper.forEach(item => {
                if (item.id === egenskapstypeId) {
                    if (item.datatype === 2) {

                        intervalInput = <IntervalInput routeParams={this.props.routeParams} />;

                    }
                }
            })
        }

        return (
            <div>
                <select value={columnValue} onChange={this.handleChangeColumn}>
                    <option value="vegkategori">Vegkategori</option>
                    {egenskapstyper.map(egenskapstype =>
                        <option key={egenskapstype.id} value={'egenskapstype:'+egenskapstype.id}>{egenskapstype.navn}</option>
                    )}
                </select>
                {intervalInput}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    egenskapstyper: state.egenskapstyper
})

SelectColumn = connect(mapStateToProps)(SelectColumn);
export default SelectColumn;