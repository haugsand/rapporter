import React from 'react';
import { browserHistory } from 'react-router';

import { getRoute } from './../../services/getRoute';
import { getRow } from './../../services/routeParamsTools';

const removeVegreferanseFilter = (vegreferanse, routeParams) => {
    const newRoute = getRoute(routeParams, 'removeQuery', {'vegreferanse': vegreferanse});
    browserHistory.push(newRoute);
}


const VegreferanseFilterItem = ({vegreferanse, routeParams}) => {

    const row = getRow(routeParams.row);

    let warning = '';
    if (row === 'vegkategori') {
        warning = '(!)';
    } 

    return (
    	<li className="filters__filterlistitem">
    		{vegreferanse} (vegreferanse) {warning}
            <button 
                className="filters__removebutton"
                onClick={() => { removeVegreferanseFilter(vegreferanse, routeParams) }}>x</button>
    	</li>
    )

}

export default VegreferanseFilterItem;