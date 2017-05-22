import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

class SelectResult extends Component {

    handleChangeResult (value) {
        let newRoute = getRoute(this.props.routeParams, 'result', value);
        browserHistory.push(newRoute);
    }


    render() {

        let disabled = false;
        if(this.props.vegobjekttyper.hasOwnProperty(this.props.routeParams.vegobjekttype)) {
            if (this.props.vegobjekttyper[this.props.routeParams.vegobjekttype].stedfesting !== 'LINJE') {
                disabled = true;
            }
        }


        return (
            <select value={this.props.routeParams.result}  onChange={(e) => { this.handleChangeResult(e.target.value) }}>
                <option value="antall">Antall</option>
                <option value="strekningslengde" disabled={disabled}>Lengde</option>
            </select>
        );
    }
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


SelectResult = connect(mapStateToProps)(SelectResult);

export default SelectResult;