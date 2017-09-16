import React from 'react';
import { connect } from 'react-redux';

// TODO: Move to own file
function formatNumber (number) {
	return number.toLocaleString();
}

function ResultTableCell ({parameters, query, result, resultParam}) {
    return (
        <td title={parameters} className="js-resultcell" data-query={query}>
        	{result && formatNumber(result[resultParam])}
        </td>
    );
}


const mapStateToProps = (state, {parameters}) => ({
    result: state.result.data[parameters]
})


export default connect(mapStateToProps)(ResultTableCell);