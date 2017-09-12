import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as thunks from './../../state/thunks';
import { buildParameters } from './../../services/parameters';


class StartFetching extends Component {


    startFetching () {

        let columnValues = this.props.columnValues;
        let rowValues = this.props.rowValues;
        let subrowValues = this.props.subrowValues;

        let vegobjekttype = this.props.routeParams.vegobjekttype;


        let subrow = '';
        if (this.props.routeParams.row.split('-').length === 2) {
            subrow = this.props.routeParams.row.split('-')[1];
        }
        

        let queries = []

        queries.push(buildParameters(this.props.routeParams, '', ''));

        columnValues.forEach((columnValue, index) => {
            queries.push(buildParameters(this.props.routeParams, '', columnValue.id));
        })



        rowValues.forEach((rowValue, index) => {
            queries.push(buildParameters(this.props.routeParams, rowValue.nummer, ''));
            
            columnValues.forEach((columnValue, index) => {
                queries.push(buildParameters(this.props.routeParams, rowValue.nummer, columnValue.id));
            })
        })

        if (subrow) {


            let activeRows = Object.keys(subrowValues);
            if (this.props.routeParams.row.split('-')[0].split(':')[1]) {
                activeRows = [this.props.routeParams.row.split('-')[0].split(':')[1]];
            }

            activeRows.forEach(key => {

                subrowValues[key].forEach((subrowValue, index) => {
                    queries.push(buildParameters(this.props.routeParams, subrowValue.nummer, '', subrow));

                    
                    columnValues.forEach((columnValue, index) => {
                        queries.push(buildParameters(this.props.routeParams, subrowValue.nummer, columnValue.id, subrow));
                    })
                })


            })


        }




        this.props.fetchResultAll(vegobjekttype, queries);

    }

    render() {

        let progress = 0;
        if (this.props.result.totalQueries !== 0) {
            let percent = (this.props.result.finishedQueries / this.props.result.totalQueries) * 100;
            progress = percent + '%';
        }

        if (this.props.result.isFetching) {
            document.querySelector('body').style.cursor = 'progress';

            return (
                <span className="report-progress">
                    <span className="report-progress__background" style={{width: progress}}></span>
                    <span className="report-progress__title">Henter statistikk ...</span>
                </span>
            );
        } else {
            document.querySelector('body').style.cursor = 'auto';

            return (
                <button 
                    className="start-button"
                    onClick={(e) => { this.startFetching() }} 
                    title={this.props.result.finishedQueries + ' / ' + this.props.result.totalQueries} 
                >
                    Start rapportuttak
                </button>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    columnValues: state.columnValues.items,
    rowValues: state.rowValues.items,
    subrowValues: state.subrowValues.items,
    result: state.result
})

const mapDispatchToProps = (dispatch) => ({
    fetchResultAll: (id, queries) => dispatch(thunks.fetchResultAll(id, queries))
})


StartFetching = connect(mapStateToProps, mapDispatchToProps)(StartFetching);
export default StartFetching;