import React from 'react';
import { browserHistory } from 'react-router';

import makeRoute from './../../services/makeRoute';
import { removeVegreferanseFilter } from './../../services/editSettings';


function VegreferanseFilterItem ({vegreferanse, settings}) {

    const removeFilter = (e) => {
        const newSettings = removeVegreferanseFilter(settings, e.target.dataset.vegreferanse);
        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }

    let showWarning = false;
    if (settings.row === 'vegkategori') {
        showWarning = true;
    } 

    return (
    	<li className="filters__filterlistitem">
    		{vegreferanse} (vegreferanse) 

            {showWarning && <span>(!)</span>}

            <button 
                className="filters__removebutton"
                data-vegreferanse={vegreferanse} 
                onClick={removeFilter}
            >
                x
            </button>
    	</li>
    )

}

export default VegreferanseFilterItem;