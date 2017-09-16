import React, { Component } from 'react';

class SelectColumnInterval extends Component {

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
        let intervalString = e.target.value.trim();

        let intervalArray = []
        if (intervalString === '') {
            intervalArray = false;

        } else {
            intervalString = intervalString.replace(',', '.');

            intervalArray = intervalString.split(' ');

            // remove duplicates
            intervalArray = intervalArray.filter((item, index, inputArray) => {
                return inputArray.indexOf(item) === index;
            })

            intervalArray.sort(function(a, b) {
                return a - b;
            });
            
        }

        this.props.changeColumnInterval(intervalArray);
    }


    componentWillMount () {

        if (this.props.settings.hasColumnInterval) {
            this.setState({
                intervalValue: this.props.settings.columnInterval.join(' ')
            });   
        } else {
            this.setState({
                intervalValue: ''
            });         
        }
    }


    componentWillReceiveProps (nextProps) {
        if (nextProps.settings.columnEgenskapstype !== this.props.settings.columnEgenskapstype) {
            this.setState({
                intervalValue: ''
            });        
        } else {
            this.setState({
                intervalValue: nextProps.settings.columnInterval.join(' ')
            });   
        }
    }
    

    render() {
    	return (
            <input 
                type="text" 
                value={this.state.intervalValue}
                onChange={this.handleIntervalChange}
                onBlur={this.handleIntervalSubmit}
                onKeyUp={this.handleIntervalKeyUp}
            />
    	)
    }
}

export default SelectColumnInterval;

