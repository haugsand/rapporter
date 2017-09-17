import React from 'react';
import { connect } from 'react-redux';

import * as thunks from './../../state/thunks';


function StartFetching ({fetchResultAll, result, settings}) {


    const startFetching = () => {


        const resultcells = document.querySelectorAll('.js-resultcell');

        const queries = [];

        resultcells.forEach(cell => {
            queries.push(cell.dataset.query);
        })

        fetchResultAll(settings.vegobjekttype, queries);

    }



    let progress = 0;
    if (result.totalQueries !== 0) {
        let percent = (result.finishedQueries / result.totalQueries) * 100;
        progress = percent + '%';
    }

    if (result.isFetching) {
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
                onClick={startFetching} 
                title={result.finishedQueries + ' / ' + result.totalQueries} 
            >
                Start rapportuttak
            </button>
        );
    }

}

const mapStateToProps = (state) => ({
    result: state.result
})

const mapDispatchToProps = (dispatch) => ({
    fetchResultAll: (id, queries) => dispatch(thunks.fetchResultAll(id, queries))
})


export default connect(mapStateToProps, mapDispatchToProps)(StartFetching);