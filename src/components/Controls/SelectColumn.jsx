import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

class SelectColumn extends Component {

    constructor() {
        super()
        this.state = {
            intervalValue: ''
        }
    }


    handleChangeColumn (value) {
        let newRoute = getRoute(this.props.routeParams, 'column', value);
        browserHistory.push(newRoute);
    }

    handleIntervalChange(intervalValue) {
        this.setState({
            intervalValue: intervalValue
        });  
    }

    handleIntervalKeyUp (event) {
        if (event.key === 'Enter') {
            this.handleIntervalSubmit(event.target.value);
        }
    }

    handleIntervalSubmit (value) {
        value = value.trim();
        value = value.replace(',', '.');

        let values = value.split(' ');
        values.sort(function(a, b) {
            return a - b;
        });

        let valuesString = values.join(',');
        let egenskapstypeId = this.props.routeParams.column.split(':')[1].split(';')[0];
        let columnValue = 'egenskapstype:' + egenskapstypeId + ';' + valuesString;

        let newRoute = getRoute(this.props.routeParams, 'column', columnValue);
        browserHistory.push(newRoute);
    }

    componentWillMount () {
        if (this.props.routeParams.column.split(';').length > 1) {
            let intervalValue = this.props.routeParams.column.split(';')[1].split(',').join(' ');
            this.setState({
                intervalValue: intervalValue
            });   
        } else {
            this.setState({
                intervalValue: ''
            });         
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.routeParams.column.split(';').length > 1) {
            let intervalValue = nextProps.routeParams.column.split(';')[1].split(',').join(' ');
            this.setState({
                intervalValue: intervalValue
            });   
        } else {
            this.setState({
                intervalValue: ''
            });         
        }
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

                        intervalInput = (
                            <input 
                                value={this.state.intervalValue}
                                type="text" 

                                onChange={(e) => { this.handleIntervalChange(e.target.value) }}
                                onBlur={(e) => { this.handleIntervalSubmit(e.target.value) }}
                                onKeyUp={(e) => { this.handleIntervalKeyUp(e) }}
                            />
                        )
                    }
                }
            })
        }

        return (
            <div>
                <select value={columnValue} onChange={(e) => { this.handleChangeColumn(e.target.value) }}>
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