import React, { Component } from 'react';

import {getErrorMessage} from './validation';




class FormExample extends Component {

    constructor(props) {
        super(props);

        let state = {};

        props.fields.forEach(field => {
            state[field] = {
                value: '',
                errorMessage: false,
                valid: true
            }
        });

        this.state = state;
    }


    validateField = (field) => {
        let valid = true;
        let errorMessage = false;

        if (!field.validity.valid) {
            valid = false;
            errorMessage = getErrorMessage(field)
        }

        this.setState({
            [field.id]: {
                ...this.state[field.id],
                valid: valid,
                errorMessage: errorMessage
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let isFormValid = true;

        this.props.fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.validity.valid) {
                isFormValid = false;
            }
            this.validateField(field);
        })

        if (isFormValid) {
            alert('valid form');
        }



    }

    handleInputChange = (e) => {
        //console.log(e.target);

        this.setState({
            [e.target.id]: {
                ...this.state[e.target.id],
                value: e.target.value
            }
        })
    }

    handleInputBlur = (e) => {
        //console.log(e.target.validity);
        this.validateField(e.target);

    }

    render() {


        return (

            <form onSubmit={this.handleSubmit} noValidate>
                <label htmlFor="fieldName">Navn</label>
                <input 
                    id="fieldName" 
                    type="text" 
                    value={this.state.fieldName.value} 
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    minLength="3"
                    required />
                    <p>{this.state.fieldName.errorMessage}</p>

                <label htmlFor="fieldDescription">Beskrivelse (frivillig)</label>
                <input 
                    id="fieldDescription" 
                    type="text" 
                    value={this.state.fieldDescription.value} 
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur} />
                    <p>{this.state.fieldDescription.errorMessage}</p>

                <label htmlFor="fieldTotalAmount">Totalt behov</label>
                <input 
                    className={!this.state.fieldTotalAmount.valid && 'invalidField'}
                    id="fieldTotalAmount" 
                    type="number" 
                    value={this.state.fieldTotalAmount.value} 
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    min="5"
                    required />
                    <p>{this.state.fieldTotalAmount.errorMessage}</p>

                <label htmlFor="fieldDeposit">Innskudd</label>
                <input 
                    id="fieldDeposit"
                    type="number" 
                    value={this.state.fieldDeposit.value} 
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    min="5"
                    max={this.state.fieldTotalAmount.value}
                    required />
                    <p>{this.state.fieldDeposit.errorMessage}</p>

                <input type="submit" value="Submit" />
            </form>

        )
    }
}

export default FormExample;