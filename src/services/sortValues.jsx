import { buildParametersAll } from './parameters';
import store from './../state/store';
import * as actions from './../state/actions';

export function sortColumn(routeParams, columnValue, direction) {

    let rowValues = JSON.parse(JSON.stringify(store.getState().rowValues.items));
    let subrowValues = JSON.parse(JSON.stringify(store.getState().subrowValues.items));
    let resultValues = store.getState().result.data;

    rowValues.forEach((rowValue, index) => {

        let resultKey = buildParametersAll(routeParams, rowValue.nummer, columnValue)
        
        let result = 0;
        if (resultValues.hasOwnProperty(resultKey)) {
            result = resultValues[resultKey][routeParams.result];
        }

        rowValues[index].result = result;

        if (Object.keys(subrowValues).length > 0) {

            subrowValues[rowValue.nummer].forEach((subrowValue, subindex) => {

                let resultKey = buildParametersAll(routeParams, subrowValue.nummer, columnValue, true);

                let result = 0;
                if (resultValues.hasOwnProperty(resultKey)) {
                    result = resultValues[resultKey][routeParams.result];
                }

                subrowValues[rowValue.nummer][subindex].result = result;

            })

            subrowValues[rowValue.nummer].sort(function(a, b) { 
                return b.result - a.result;
            });


            store.dispatch(actions.setSubrowValues(subrowValues));

        }
        

    })

    rowValues.sort(function(a, b) {
        if (direction === 'desc') {
            return b.result - a.result;
        } else if (direction === 'asc') {
            return a.result - b.result;
        } else {
            return a.index - b.index;
        }
    });

    store.dispatch(actions.setRowValues(rowValues));


}
