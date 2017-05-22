import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultTableCaption extends Component {

    render() {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        let vegobjekttype = '';
        if (this.props.vegobjekttyper.items[this.props.routeParams.vegobjekttype]) {
            vegobjekttype = this.props.vegobjekttyper.items[this.props.routeParams.vegobjekttype].navn;
        }

        return (
            <caption>
                Vegobjekttype: {vegobjekttype}<br />
                Dato: {date}
            </caption>
        );
    }
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper
})


ResultTableCaption = connect(mapStateToProps)(ResultTableCaption);
export default ResultTableCaption;