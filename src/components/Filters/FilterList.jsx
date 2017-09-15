import React from 'react';

import EgenskapsFilterItem from './EgenskapsFilterItem';
import OverlappFilterItem from './OverlappFilterItem';
import AreaFilterItem from './AreaFilterItem';
import VegreferanseFilterItem from './VegreferanseFilterItem';


function FilterList ({routeParams, settings}) {

    const {
        egenskapFilter,
        overlappFilter,
        regionFilter,
        fylkeFilter,
        kommuneFilter,
        vegreferanseFilter
    } = settings;


    let filters = [];

    egenskapFilter.forEach(filter => {
        filters.push(<EgenskapsFilterItem key={filter.filterString} filter={filter} routeParams={routeParams} />);
    });

    overlappFilter.forEach(filter => {
        filters.push(<OverlappFilterItem key={filter.filterString} value={filter.filterString} filter={filter} routeParams={routeParams} />);
    });

    regionFilter.forEach(filter => {
        filters.push(<AreaFilterItem key={'region' + filter} type={'region'} id={filter} routeParams={routeParams} />);
    });

    fylkeFilter.forEach(filter => {
        filters.push(<AreaFilterItem key={'fylke' + filter} type={'fylke'} id={filter} routeParams={routeParams} />);
    });

    kommuneFilter.forEach(filter => {
        filters.push(<AreaFilterItem key={'kommune' + filter} type={'kommune'} id={filter} routeParams={routeParams} />);
    });

    vegreferanseFilter.forEach(filter => {
        filters.push(<VegreferanseFilterItem key={filter} vegreferanse={filter} routeParams={routeParams} />);
    });

    // https://medium.com/@joethedave/achieving-ui-animations-with-react-the-right-way-562fa8a91935#.6fwwubqe2
    // https://facebook.github.io/react/docs/animation.html

    return (
        <ul className="filters__filterlist">
            {filters}
        </ul>
    )

}

export default FilterList;