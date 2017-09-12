import React from 'react';
import { connect } from 'react-redux';

function ResultTableCaption ({settings, vegobjekttyper}) {

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    let vegobjekttype = '';
    if (vegobjekttyper.items[settings.vegobjekttype]) {
        vegobjekttype = vegobjekttyper.items[settings.vegobjekttype].navn;
    }

    return (
        <caption>
            Vegobjekttype: {vegobjekttype}<br />
            Dato: {date}
        </caption>
    );
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper
})


export default connect(mapStateToProps)(ResultTableCaption);