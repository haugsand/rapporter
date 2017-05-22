import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as thunks from './../state/thunks';
import { setRowValues, setColumnValues } from './../services/setValues';

import Layout from './Layout';


class App extends Component {


    loadEgenskapstyper (location) {
        this.props.fetchEgenskapstyper(location.pathname.split('/')[1]);

        if (Object.prototype.hasOwnProperty.call(location.query, 'overlapp')) {
            location.query.overlapp.split(',').forEach(overlappFilter => {
                //console.log(overlappFilter);
                this.props.fetchEgenskapstyper(overlappFilter.split('(')[0]);
            });
        }
    }

    componentWillMount () {

        browserHistory.listen( location =>  {
            this.loadEgenskapstyper(location);
            setColumnValues(location);
            setRowValues(location);

        });

        let routeParams = this.props.routeParams;
        if (!routeParams.vegobjekttype || !routeParams.column || !routeParams.row || !routeParams.result) {
            browserHistory.replace('/105/vegkategori/fylke/antall');
        } else {
            this.loadEgenskapstyper(this.props.location);
            setRowValues(this.props.location);
            setColumnValues(this.props.location);
        }
    }

    render() {

        let routeParams = this.props.routeParams;
        routeParams.query = this.props.location.query;
        if (!routeParams.vegobjekttype || !routeParams.column || !routeParams.row || !routeParams.result) {
            return (
                <div>Redirecting to default settings</div>
            )
        } else {
            return (
                <Layout routeParams={routeParams} />
            )
        }

    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
    fetchEgenskapstyper: (vegobjekttype) => dispatch(thunks.fetchEgenskapstyper(vegobjekttype))
})


App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;

