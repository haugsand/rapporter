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
        let columnValue = 'egenskapstype:' + this.props.settings.columnEgenskapstype + ';' + valuesString;

        let newRoute = getRoute(this.props.routeParams, 'column', columnValue);
        browserHistory.push(newRoute);
    }



    componentWillMount () {

        if (this.props.settings.hasColumnInterval) {
            this.setState({
                intervalValue: this.props.settings.columnInterval
            });   
        } else {
            this.setState({
                intervalValue: ''
            });         
        }
    }

    /*

    Hva gjør denne`Trengs den?

    componentWillReceiveProps (nextProps) {
        console.log('WillReceiveProps');
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
    */

  

    render() {

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

