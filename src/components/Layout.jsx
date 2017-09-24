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
import ExportTable from './Controls/ExportTable';


const Layout = ({settings}) => {



    return (
        <div>
            <section className="setup">
                <SelectVegobjekttype2 settings={settings} />
                <EgenskapsFilterForm settings={settings} />
                <OverlappFilterForm settings={settings} />
            </section>
            <section className="filters">
            	<FilterList settings={settings} />
            </section>
            <section className="tools">
                <StartFetching settings={settings} />
                <SelectResult settings={settings} />
                <ExportTable />
            </section>
            <section className="report" id="dataTableDiv">
                <table id="dataTable">
                    <ResultTableCaption settings={settings} />
                    <ResultTableHeader settings={settings} />
                    <ResultTableRows settings={settings} />
                </table>
            </section>
        </div>
    );
};

export default Layout;