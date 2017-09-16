import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import makeRoute from './../../services/makeRoute';
import { removeAreaFilter } from './../../services/editSettings';


function AreaFilterItem ({type, id, areas, settings}) {

    const removeFilter = (e) => {
        const newSettings = removeAreaFilter(settings, e.target.dataset.type, parseInt(e.target.dataset.area, 10));
        const newRoute = makeRoute(newSettings);
        browserHistory.push(newRoute);
    }

    let showWarning = false;
    if (['region', 'fylke', 'kommune'].indexOf(settings.row) > -1) {
        showWarning = true;
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
    		{navn} ({type})

            {showWarning && <span>(!)</span>}

            <button 
                className="filters__removebutton"
                data-type={type}
                data-area={id}
                onClick={removeFilter}>x</button>
    	</li>
    )

}

const mapStateToProps = (state) => ({
    areas: state.areas
})


export default connect(mapStateToProps)(AreaFilterItem);