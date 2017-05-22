import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

class SelectVegobjekttype extends Component {

    handleChangeVegobjekttype (value) {
        let newRoute = getRoute(this.props.routeParams, 'vegobjekttype', value);
        browserHistory.push(newRoute);
    }

    render() {

        let vegobjekttyper = [];

        Object.keys(this.props.vegobjekttyper).forEach(id => {
            vegobjekttyper.push(this.props.vegobjekttyper[id]);
        });

        vegobjekttyper.sort(function(a, b){
            if(a.navn < b.navn) return -1;
            if(a.navn > b.navn) return 1;
            return 0;
        });

        return (
            <select 
                className="select--vegobjekttype" 
                value={this.props.routeParams.vegobjekttype}  
                onChange={(e) => { this.handleChangeVegobjekttype(e.target.value) }}>
                {vegobjekttyper.map((vegobjekttype) =>
                    <option key={vegobjekttype.id} value={vegobjekttype.id}>{vegobjekttype.navn}</option>
                )}
            </select>
        );
    }
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


SelectVegobjekttype = connect(mapStateToProps)(SelectVegobjekttype);
export default SelectVegobjekttype;