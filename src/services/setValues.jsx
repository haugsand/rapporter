import store from './../state/store';
import * as actions from './../state/actions';
import { getRow, getSubrow, getRowfilter, getColumn, getColumnId, getColumnInterval } from './routeParamsTools';

export function setRowValues(location) {

    let routeParams = location.pathname.split('/');

    const row = getRow(routeParams[3]);
    const subrow = getSubrow(routeParams[3]);
    const rowfilter = getRowfilter(routeParams[3]);

    (function getArea() {

        if (store.getState().areas[row].items) {
            clearTimeout(getArea);

            // Deep copy, do not modify areas
            let rowValues = JSON.parse(JSON.stringify(store.getState().areas[row].items));

            if (rowfilter) {
                rowValues = rowValues.filter(value => {
                    return rowfilter === value.nummer + '';
                });
            }
            store.dispatch(actions.setRowValues(rowValues));
        } else {
            setTimeout(getArea, 100)
        }
    })();



    if (subrow) {

        (function getSubrowArea() {

            if (store.getState().areas[subrow].items) {
                clearTimeout(getSubrowArea);

                // Deep copy, do not modify areas
                let subrowArea = JSON.parse(JSON.stringify(store.getState().areas[subrow].items));
                
                let subrowValues = {};
                subrowArea.forEach(function(area) {
                    if (subrowValues[area[row]]) {
                        subrowValues[area[row]].push(area);
                    } else {
                        subrowValues[area[row]] = [area];
                    }
                })
                store.dispatch(actions.setSubrowValues(subrowValues));
            } else {
                setTimeout(getSubrowArea, 100)
            }
        })();
  
    } else {
        store.dispatch(actions.setSubrowValues({}));
    }
}

export function setColumnValues(location) {

    let routeParams = location.pathname.split('/');
    let vegobjekttype = routeParams[1];

    const column = getColumn(routeParams[2]);
    const egenskapstypeId = getColumnId(routeParams[2]);
    const interval = getColumnInterval(routeParams[2]);

    let columnValues = [];
    if (column === 'egenskapstype') {

        (function getEgenskapstyper() {

            if (store.getState().egenskapstyper.items[vegobjekttype]) {

                let egenskapstype = store.getState().egenskapstyper.items[vegobjekttype].filter(egenskapstype => {
                    return egenskapstype.id === parseInt(egenskapstypeId, 10);
                });

                if (egenskapstype[0].tillatte_verdier) {
                    columnValues = egenskapstype[0].tillatte_verdier;

                } else {


                    if (interval) {

                        columnValues.push({
                            id: [false, interval[0]],
                            navn: '≤ ' + interval[0]
                        });

                        for (let i = 1; i < interval.length; i++) {
                            columnValues.push({
                                id: [interval[i-1], interval[i]],
                                navn: interval[i-1] + '-' + interval[i]
                            })
                        };

                        columnValues.push({
                            id: [interval[interval.length-1], false],
                            navn: interval[interval.length-1] + ' <'
                        });

                        columnValues.push({
                            id: 'null',
                            navn: 'Ingen verdi'
                        });
                    }
                }
                store.dispatch(actions.setColumnValues(columnValues));

            } else {

                setTimeout(getEgenskapstyper, 100)
            }
        })();


    } else if (column === 'vegkategori') {
        
        columnValues = store.getState().areas.vegkategori.items;
        store.dispatch(actions.setColumnValues(columnValues));
    }
}
