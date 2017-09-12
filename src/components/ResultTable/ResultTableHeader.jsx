import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import SelectColumn from './../Controls/SelectColumn';
import SelectRow from './../Controls/SelectRow';

import { getRoute } from './../../services/getRoute';
import { sortColumn } from './../../services/sortValues';


class ResultTableHeader extends Component {

    state = {
        sortedColumn: '',
        direction: ''
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            sortedColumn: '',
            direction: ''
        });  
    }

    handleSortColumn(columnValue, direction) {

        sortColumn(this.props.routeParams, columnValue, direction);

        if (direction === 'reset') {

            this.setState({
                sortedColumn: '',
                direction: ''
            });  

        } else {

            if (columnValue === '') {
                columnValue = 'sum';
            }

            this.setState({
                sortedColumn: columnValue,
                direction: direction
            });  
        }
    }

    render() {


        const {
            columnValues,
            routeParams,
            settings
        } = this.props;


        const colspan = columnValues.length + 1;


        let removeRowFilter = '';
        if (settings.hasRowfilter) {
            let newRow = settings.row;

            if (settings.hasSubrow) {
                newRow += '-' + settings.subrow;
            } 

            const newRoute = getRoute(routeParams, 'row', newRow);
            removeRowFilter = <Link to={newRoute}>Vis alle</Link>;
        }


        let columnHeaders = [];
        columnValues.forEach((value, index) => {
            let sortedLabel = '';
            let direction = 'desc';

            if (this.state.sortedColumn === value.id) {

                if (this.state.direction === 'desc') {
                    sortedLabel = '! ';
                    direction = 'asc';
                } else if (this.state.direction === 'asc') {
                    sortedLabel = '!! ';
                    direction = 'reset';
                }
            }

            columnHeaders.push(
                <th 
                    onClick={(e) => { this.handleSortColumn(value.id, direction) }} 
                    key={index}
                >
                    {sortedLabel}
                    {value.navn}
                </th>
            )
        });

        let sortedLabelSum = '';
        let directionSum = 'desc';

        if (this.state.sortedColumn === 'sum') {

            if (this.state.direction === 'desc') {
                sortedLabelSum = '! ';
                directionSum = 'asc';
            } else if (this.state.direction === 'asc') {
                sortedLabelSum = '!! ';
                directionSum = 'reset';
            }
        }

        columnHeaders.push(
            <th 
                onClick={(e) => { this.handleSortColumn('', directionSum) }} 
                key='sum'
            >
                {sortedLabelSum}
                Sum
            </th>
        )


        return (
            <thead>
                <tr>
                    <th>
                        {removeRowFilter}
                    </th>
                    <th colSpan={colspan}>
                        <SelectColumn routeParams={routeParams} settings={settings} />
                    </th>
                </tr>
                <tr>
                    <th>
                        <SelectRow routeParams={routeParams} />
                    </th>
                    {columnHeaders}
                </tr>
            </thead>
        );
    }

}

const mapStateToProps = (state) => ({
    columnValues: state.columnValues.items
})


ResultTableHeader = connect(mapStateToProps)(ResultTableHeader);
export default ResultTableHeader;