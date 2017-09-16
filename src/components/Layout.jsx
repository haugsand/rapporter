import React from 'react';

import ResultTableCaption from './ResultTable/ResultTableCaption';
import ResultTableHeader from './ResultTable/ResultTableHeader';
import ResultTableRows from './ResultTable/ResultTableRows';

import EgenskapsFilterForm from './FilterForm/EgenskapsFilterForm';
import OverlappFilterForm from './FilterForm/OverlappFilterForm';
import FilterList from './FilterList/FilterList';

import SelectResult from './Controls/SelectResult';
import SelectVegobjekttype2 from './Controls/SelectVegobjekttype2';
import StartFetching from './Controls/StartFetching';

import getSettings from './../services/settings';
import makeRoute from './../services/makeRoute';

const Layout = ({routeParams}) => {

    const settings = getSettings(routeParams);
    console.log(routeParams);
    console.log(settings);
    console.log(makeRoute(settings));

    return (
        <div>
            <section className="setup">
                <SelectVegobjekttype2 settings={settings} />
                <EgenskapsFilterForm routeParams={routeParams} />
                <OverlappFilterForm routeParams={routeParams} />
            </section>
            <section className="filters">
            	<FilterList routeParams={routeParams} settings={settings} />
            </section>
            <section className="tools">
                <StartFetching settings={settings} />
                <SelectResult settings={settings} />
            </section>
            <section className="report">
                <table>
                    <ResultTableCaption settings={settings} />
                    <ResultTableHeader routeParams={routeParams} settings={settings} />
                    <ResultTableRows routeParams={routeParams} settings={settings} />
                </table>
            </section>
        </div>
    );
};

export default Layout;