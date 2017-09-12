import React from 'react';

import ResultTableCaption from './ResultTable/ResultTableCaption';
import ResultTableHeader from './ResultTable/ResultTableHeader';
import ResultTableRows from './ResultTable/ResultTableRows';

import EgenskapsFilterForm from './Filters/EgenskapsFilterForm';
import OverlappFilter from './Filters/OverlappFilter';
import FilterList from './Filters/FilterList';

import SelectResult from './Controls/SelectResult';
import SelectVegobjekttype2 from './Controls/SelectVegobjekttype2';
import StartFetching from './Controls/StartFetching';

const Layout = ({routeParams}) => {
    return (
        <div>
            <section className="setup">
                <SelectVegobjekttype2 routeParams={routeParams} />
                <EgenskapsFilterForm routeParams={routeParams} />
                <OverlappFilter routeParams={routeParams} />
            </section>
            <section className="filters">
            	<FilterList routeParams={routeParams} />
            </section>
            <section className="tools">
                <StartFetching routeParams={routeParams} />
                <SelectResult routeParams={routeParams} />
            </section>
            <section className="report">
                <table>
                    <ResultTableCaption routeParams={routeParams} />
                    <ResultTableHeader routeParams={routeParams} />
                    <ResultTableRows routeParams={routeParams} />
                </table>
            </section>
        </div>
    );
};

export default Layout;