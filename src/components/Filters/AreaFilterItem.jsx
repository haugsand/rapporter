import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { getRoute } from './../../services/getRoute';
import { getRow } from './../../services/routeParamsTools';


const removeAreaFilter = (type, id, routeParams) => {
    console.log(type + ' ' + id);
    console.log(routeParams);
    const newRoute = getRoute(routeParams, 'removeQuery', {[type]: id});
    console.log(newRoute);
    browserHistory.push(newRoute);
}

let AreaFilterItem = ({type, id, routeParams, areas}) => {

    const row = getRow(routeParams.row);

    let warning = '';
    if (['region', 'fylke', 'kommune'].indexOf(row) > -1) {
        warning = '(!)';
    } 

    let navn = id; 
    if (areas[type].items) {
        areas[type].items.forEach(area => {
            if (area.nummer+'' === id+'') {
                navn = area.navn
            }
        })
    }

    return (
    	<li className="filters__filterlistitem">
    		{navn} ({type}) {warning}
            <button 
                className="filters__removebutton"
                onClick={() => { removeAreaFilter(type, id, routeParams) }}>x</button>
    	</li>
    )

}

const mapStateToProps = (state) => ({
    areas: state.areas
})


AreaFilterItem = connect(mapStateToProps)(AreaFilterItem);
export default AreaFilterItem;