import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { addEgenskapFilter, addOverlappEgenskapFilter } from './../../services/editSettings';


class EgenskapsFilterForm extends Component {


    constructor() {
        super()
        this.state = {
            selectedEgenskapstype: 0,
            selectedEgenskapstypeData: {},
            selectedOperator: '=',
            selectedVerdi: ''
        }
    }

    handleChangeEgenskapstype (egenskapstype, egenskapstyper) {

        egenskapstype = parseInt(egenskapstype, 10);

        let selectedEgenskapstypeData = {};
        let selectedVerdi = '';

        if (egenskapstype !== 0) {
            egenskapstyper.forEach((element, index) => {
                if (element.id === egenskapstype) {
                    selectedEgenskapstypeData = element;
                }
            })
        }

        this.setState({
            selectedEgenskapstype: egenskapstype,
            selectedEgenskapstypeData: selectedEgenskapstypeData,
            selectedVerdi: selectedVerdi
        });   

    }

    handleChangeOperator (operator) {
        let newOperator = operator;

        if (operator === '!=null') {
            this.handleAddFilter('null', '!=');
        } else if (operator === '=null') {
            this.handleAddFilter('null', '=');
        } else { 
            this.setState({
                selectedOperator: newOperator
            });   
        }
    }

    handleChangeVerdiSelect (verdi) {
        
        this.setState({
            selectedVerdi: verdi
        });
        
    }

    handleChangeVerdi (verdi) {
        this.setState({
            selectedVerdi: verdi
        });
    }

    handleChangeVerdiNumber (verdi) {
        verdi = verdi.replace(',', '.');

        this.setState({
            selectedVerdi: verdi
        });
    }


    handleKeyPress (event) {
        if (event.key === 'Enter') {
            this.handleAddFilter(event.target.value);
        }
    }

    handleAddFilter (verdi, operator) {


        let newValue = this.state.selectedVerdi;
        if (verdi) {
            newValue = verdi;
        }

        if (this.state.selectedEgenskapstypeData.datatype === 1) {
            newValue = '\'' + newValue + '\'';
        } 

        let newOperator = this.state.selectedOperator;
        if (operator) {
            newOperator = operator;
        }

        const egenskapFilter = {
            filterString: this.state.selectedEgenskapstype + newOperator + newValue,
            egenskapstype: this.state.selectedEgenskapstype,
            operator: newOperator,
            verdi: newValue
        };

        // TODO: ikke la det være mulig å legge til eksisterende egenskapsfilter

        let newSettings = {};

        if (this.props.overlapp) {
            newSettings = addOverlappEgenskapFilter(this.props.settings, this.props.overlapp, egenskapFilter);
        } else {
            newSettings = addEgenskapFilter(this.props.settings, egenskapFilter);
        }

        const newRoute = makeRoute(newSettings);

        browserHistory.push(newRoute);


        this.setState({
            selectedEgenskapstype: 0,
            selectedEgenskapstypeData: {},
            selectedOperator: '=',
            selectedVerdi: ''
        });

    }


    render() {


        let vegobjekttype = 0;
        if (this.props.overlapp) {
            vegobjekttype = this.props.overlapp;
        } else {
            vegobjekttype = this.props.settings.vegobjekttype;
        }

        let egenskapstyper = [];
        if (this.props.egenskapstyperAll[vegobjekttype]) {
            egenskapstyper = this.props.egenskapstyperAll[vegobjekttype];
        }


        let selectOperator = '';
        let selectVerdi = '';
        let addFilter = '';
        if (this.state.selectedEgenskapstype !== 0) {

            let operatorer = [
                <option key="=">=</option>,
                <option key="!=">!=</option>
            ];


            switch (this.state.selectedEgenskapstypeData.datatype) {
                case 30: // FlerverdiAttributt, Tekst
                case 31: // Flerverdiattributt, Tall
                    let tillatte_verdier = this.state.selectedEgenskapstypeData.tillatte_verdier;

                    selectVerdi = (
                        <select
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdiSelect(e.target.value) }}
                        >
                            <option value="">Velg verdi</option>
                            {tillatte_verdier.map((verdi, index) => 
                                <option key={index} value={verdi.id}>{verdi.navn}</option>
                            )}
                        </select>
                    );
                    break;
                case 1: // Tekst
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdi(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder='Skriv inn tekst'
                        />
                    );
                    break;
                case 2: // Tall
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdiNumber(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder='Skriv inn tall'
                        />
                    );
                    operatorer.push(<option key="<" value="<">&lt;</option>);
                    operatorer.push(<option key=">" value=">">&gt;</option>);
                    operatorer.push(<option key="<=" value="<=">&lt;=</option>);
                    operatorer.push(<option key=">=" value=">=">&gt;=</option>);
                    break;
                case 8: // Dato
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdi(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder='Eks. 2007-03-30'
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        />
                    );
                    operatorer.push(<option key="<" value="<">&lt;</option>);
                    operatorer.push(<option key=">" value=">">&gt;</option>);
                    operatorer.push(<option key="<=" value="<=">&lt;=</option>);
                    operatorer.push(<option key=">=" value=">=">&gt;=</option>);
                    break;
                case 9: // KortDato
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdi(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder='Eks. 08-31'
                        />
                    );
                    break;
                case 10: // KLokkeslett
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdi(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder='Eks. 13:45'
                        />
                    );
                    break;
                default: // Se https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/datatyper
                    selectVerdi = (
                        <input 
                            value={this.state.selectedVerdi}
                            onChange={(e) => { this.handleChangeVerdi(e.target.value) }}
                            onKeyUp={(e) => { this.handleKeyPress(e) }}
                            type="text" 
                            placeholder={this.state.selectedEgenskapstypeData.datatype_tekst}
                        />
                    )
                    break;
            }

            operatorer.push(<option key="!=null" value="!=null">Har verdi</option>);
            operatorer.push(<option key="=null"value="=null">Har ikke verdi</option>);


            selectOperator = (
                <select
                    value={this.state.selectedOperator} 
                    onChange={(e) => { this.handleChangeOperator(e.target.value) }}
                >
                    {operatorer}
                </select>
            );

            
            if (this.state.selectedVerdi) {
                addFilter = (
                    <button onClick={(e) => { this.handleAddFilter() }} >
                        +
                    </button>
                )
            }
            

        }

        return (

            <dl className="filters__filter">
                <dt className="filters__filter-label">
                    Filtrer etter egenskap <b>(valgfritt)</b>
                </dt>
                <dd className="filters__filter-input">
                    <select 
                        value={this.state.selectedEgenskapstype} 
                        onChange={(e) => { this.handleChangeEgenskapstype(e.target.value, egenskapstyper) }}
                    >
                        <option value={0}>Velg egenskapstype</option>
                        {egenskapstyper.map((egenskapstype, index) =>
                            <option key={index} value={egenskapstype.id}>
                                {egenskapstype.navn}
                            </option>
                        )}
                    </select>

                    <br />

                    {selectOperator}
                    {selectVerdi}

                    <br />

                    {addFilter}
                </dd>

            </dl>

        )
    }
}

const mapStateToProps = (state) => ({
    egenskapstyperAll: state.egenskapstyper.items
})


EgenskapsFilterForm = connect(mapStateToProps)(EgenskapsFilterForm);


export default EgenskapsFilterForm;