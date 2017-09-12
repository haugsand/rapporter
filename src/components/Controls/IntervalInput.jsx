import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';


class IntervalInput extends Component {


    state = {
        intervalValue: ''
    }


    handleIntervalChange = (e) => {
        this.setState({
            intervalValue: e.target.value
        });  
    }

    handleIntervalKeyUp = (e) => {
        if (e.key === 'Enter') {
            this.handleIntervalSubmit(e);
        }
    }

    handleIntervalSubmit = (e) => {
        let value = e.target.value.trim();
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

    	console.log('horse');

    	return (

            <input 
                value={this.state.intervalValue}
                type="text" 

                onChange={this.handleIntervalChange}
                onBlur={this.handleIntervalSubmit}
                onKeyUp={this.handleIntervalKeyUp}
            />

    	)
    }
}

export default IntervalInput;

