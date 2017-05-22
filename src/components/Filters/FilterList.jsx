import React from 'react';

import { getOverlappFilters, getAreaFilters, getVegreferanseFilters, getEgenskapFilterString } from './../../services/routeParamsTools';
import { filterStringToList } from './../../services/filterString';

import EgenskapsFilterItem from './EgenskapsFilterItem';
import OverlappFilterItem from './OverlappFilterItem';
import AreaFilterItem from './AreaFilterItem';
import VegreferanseFilterItem from './VegreferanseFilterItem';


const FilterList = ({routeParams}) => {

    let filters = []

    const egenskapsFilterString = getEgenskapFilterString(routeParams.query);
    const activeFilters = filterStringToList(egenskapsFilterString);
    activeFilters.forEach(filter => {
        filters.push(
            <EgenskapsFilterItem
                key={filter.filter}
                filter={filter}
                routeParams={routeParams}
            />
        );
    });



    const overlappFilters = getOverlappFilters(routeParams.query);
    overlappFilters.forEach((value, index) => {
        filters.push(
            <OverlappFilterItem 
                key={value}
                value={value}
                routeParams={routeParams}
            />
        );
    });

    const areaFilters = getAreaFilters(routeParams.query);
    areaFilters.forEach(value => {
        filters.push(
            <AreaFilterItem 
                key={value.type+value.id}
                type={value.type}
                id={value.id}
                routeParams={routeParams}
            />
        );
    });

    const vegreferanseFilters = getVegreferanseFilters(routeParams.query);
    vegreferanseFilters.forEach(value => {
        filters.push(
            <VegreferanseFilterItem 
                key={value}
                vegreferanse={value}
                routeParams={routeParams}
            />
        );
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