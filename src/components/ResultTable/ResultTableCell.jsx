import React from 'react';
import { connect } from 'react-redux';


const formatNumber = (number) => {
   	let newNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return newNumber;
}


let ResultTableCell = ({parameters, result, resultParam}) => {
    return (
        <td title={parameters}>
        	{result ? formatNumber(result[resultParam]) : ''}
        </td>
    );
}


const mapStateToProps = (state, {parameters}) => ({
    result: state.result.data[parameters]
})


ResultTableCell = connect(mapStateToProps)(ResultTableCell);
export default ResultTableCell;