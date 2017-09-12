import React from 'react';
import { connect } from 'react-redux';

function formatNumber (number) {
	return number.toLocaleString();
}

function ResultTableCell ({parameters, result, resultParam}) {
    return (
        <td title={parameters}>
        	{result && formatNumber(result[resultParam])}
        </td>
    );
}


const mapStateToProps = (state, {parameters}) => ({
    result: state.result.data[parameters]
})


export default connect(mapStateToProps)(ResultTableCell);