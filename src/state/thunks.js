import { batchActions } from 'redux-batched-actions';

import store from './store';
import * as actions from './actions';

// var throttle = require('lodash.throttle');

var Bottleneck = require("bottleneck")




const api = 'https://www.vegvesen.no/nvdb/api/v2';
const options = {
    headers: {
        'Accept': 'application/vnd.vegvesen.nvdb-v2+json',
        'X-Client': "Test av NVDB API v2"
    }
};



export function fetchArea(area, parameter) {

  return function (dispatch) {


    dispatch(actions.requestArea(area));


    fetch(api + '/omrader/' + parameter, options)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            json.forEach((item, index) => {
                json[index].index = index;
            });
            dispatch(actions.recieveArea(area, json));
        })

  }
}


export function fetchResultAll(vegobjekttype, queries) {

  return function (dispatch) {

    dispatch(actions.requestResult());

    let totalQueries = queries.length;
    dispatch(actions.setTotalQueries(totalQueries));

    let returnedActions = [];

    let dispatchReturnedActions = setInterval(() => {
        dispatch(batchActions(returnedActions));
        returnedActions = [];
    }, 500);

    var limiter = new Bottleneck(1000, 2);

    var fn = function(url, options) {
        return fetch(url, options);
    };

    Promise.all(queries.map((query, index) => {

        let url = api + '/vegobjekter/' + vegobjekttype + '/statistikk?' + query;
        let id = vegobjekttype + '?' + query;

        //return fetch(url, options)

        return limiter.schedule(fn, url, options)
            .then(function(response) {
                if (response.status >= 200 && response.status < 300) {
                    return response.json()
                } else {
                    var error = new Error(response.statusText)
                    error.response = response
                    throw error
                }
            }).then(function(json) {
                //dispatch(actions.recieveResult(id, json));
                returnedActions.push(actions.recieveResult(id, json));
            }).catch(function(error) {
                let result = {
                    antall: '?',
                    strekningslengde: '?'
                };
                returnedActions.push(actions.recieveResult(id, result));
                //console.log('request failed', error)
            })

    })).then(values => {
        clearTimeout(dispatchReturnedActions);
        dispatch(batchActions(returnedActions));
        dispatch(actions.finalizeQueries());
    })

  }
}



export function fetchVegobjekttyper() {

  return function (dispatch) {


    dispatch(actions.requestVegobjekttyper());


    fetch(api + '/vegobjekttyper/', options)
        .then(function(response) {
            return response.json()
        }).then(function(json) {

            let vegobjekttyper = {}

            json.forEach(function(item, index) {
                vegobjekttyper[item.id] = item
            })
            dispatch(actions.recieveVegobjekttyper(vegobjekttyper));
        })

  }
}


export function fetchEgenskapstyper(vegobjekttype) {

  return function (dispatch) {

    let fetchedEgenskapstyper = store.getState().egenskapstyper.items;

    if(!fetchedEgenskapstyper.hasOwnProperty(vegobjekttype)) {

        dispatch(actions.requestEgenskapstyper());

        fetch(api + '/vegobjekttyper/' + vegobjekttype + '?inkluder=egenskapstyper', options)
            .then(function(response) {
                return response.json()
            }).then(function(json) {

                json.egenskapstyper.forEach((egenskapstype, index) => {
                    if (egenskapstype.hasOwnProperty('tillatte_verdier')) {

                        json.egenskapstyper[index].tillatte_verdier.sort(function(a, b) { 
                            return a.sorteringsnummer - b.sorteringsnummer;
                        });

                        json.egenskapstyper[index].tillatte_verdier.push({
                            id: 'null',
                            navn: 'Ingen verdi'
                        });

                    }
                })

                dispatch(actions.recieveEgenskapstyper(vegobjekttype, json.egenskapstyper));
            })

    }

  }

}

