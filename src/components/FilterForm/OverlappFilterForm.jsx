import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { addAreaFilter, addOverlappFilter } from './../../services/editSettings';


class OverlappFilterForm extends Component {


    constructor() {
        super()
        this.state = {
            query: '', 
            suggestions: [], 
            selected: -1
        }
    }


    addOverlappFilter (suggestion) {

        const newSettings = addOverlappFilter(this.props.settings, suggestion.id);
        const newRoute = makeRoute(newSettings);

        this.getDefaultState();

        browserHistory.push(newRoute);
    }


    addAreaFilter (suggestion) {

        const newSettings = addAreaFilter(this.props.settings, suggestion.areaType, suggestion.nummer);
        const newRoute = makeRoute(newSettings);

        this.getDefaultState();

        browserHistory.push(newRoute);
    }


    handleAddFilter(suggestion) {

        if (suggestion.filterType === 'overlapp') {
            this.addOverlappFilter(suggestion);

        } else if (suggestion.filterType === 'area') {
            this.addAreaFilter(suggestion)

        }
    }

    getDefaultState () {
        this.setState({
            query: '',
            suggestions: [], 
            selected: -1
        });
    }


    handleChangeQuery (query) {

        let suggestions =  [];
        let selectedIndex = -1;

        

        if (query.length > 0) {
            if (query.match(/^([erfkps]){1}$/i)) {
                suggestions.push({
                    filterType: 'area',
                    areaType: 'vegreferanse',
                    navn: query,
                    nummer: query
                });
            }
        }


        if (query.length > 1) {

            ['region', 'fylke', 'kommune'].forEach((areaType, index) => {  

                this.props.areas[areaType].items.forEach(area => {
                    if (area.navn.toLowerCase().includes(query.toLowerCase())) {
                        area.filterType = 'area';
                        area.areaType = areaType;
                        suggestions.push(area);
                    }

                });

            });

            // TODO Ikke la det mulig å legge til eksisterende area filter


            const existingFilters = this.props.settings.overlappFilter.map(filter => {
                return filter.vegobjekttype;
            });

            const filteredKeys = Object.keys(this.props.vegobjekttyper).filter(id => {
                return parseInt(id, 10) !== this.props.settings.vegobjekttype;
            }).filter(id => {
                return existingFilters.indexOf(parseInt(id, 10)) < 0;
            })

            filteredKeys.forEach(id => {  
                if (this.props.vegobjekttyper[id].navn.toLowerCase().includes(query.toLowerCase())) {
                    this.props.vegobjekttyper[id].filterType = 'overlapp';
                    suggestions.push(this.props.vegobjekttyper[id]);
                }
            });
        }

        if (suggestions.length > 0) {
            selectedIndex = 0;

            suggestions.sort(function(a, b){
                if(a.navn < b.navn) return -1;
                if(a.navn > b.navn) return 1;
                return 0;
            });

        }

        this.setState({ 
            query: query,
            suggestions: suggestions,
            selected: selectedIndex
        });

    }


    handleKeyDown (e) {


        switch(e.key) {

            case 'Enter':
                if (this.state.selected > -1) {
                    const selectedVegobjekttype = this.state.suggestions[this.state.selected];

                    // Kall i stedet en funksjon som finner ut hvilken filter det er, og velger riktig funksjon
                    this.handleAddFilter(selectedVegobjekttype);
                }
                break;

            case 'ArrowUp':
                if (this.state.selected > 0) {
                    this.setState({ 
                        selected: this.state.selected - 1
                    });
                }
                e.preventDefault();
                break;

            case 'ArrowDown':
                if (this.state.selected < this.state.suggestions.length - 1) {
                    this.setState({ 
                        selected: this.state.selected + 1
                    });   
                }
                break;

            case 'Escape':
                this.getDefaultState();
                break;

            default: 

        }
    }


    render() {



        let searchResult = [];
        this.state.suggestions.forEach((suggestion, index) => {

            let classNames = 'filters__resultlistitem';
            if (this.state.selected === index) {
                classNames += ' filters__resultlistitem--selected';
            }

            searchResult.push(
                <li key={index} className={classNames}>
                    <button onMouseDown={(e) => { this.handleAddFilter(suggestion) }}>{suggestion.navn}</button>
                </li>
            );
        });

        return (

            <dl className="filters__filter">
                <dt className="filters__filter-label">
                    Begrens søkeområdet <b>(valgfritt)</b>
                </dt>
                <dd className="filters__filter-input">
                    <input 
                        type="text" 
                        className="filters__searchinput" 
                        placeholder="Overlappfilter"
                        value={this.state.query} 
                        onChange={(e) => { this.handleChangeQuery(e.target.value) }} 
                        onKeyDown={(e) => { this.handleKeyDown(e) }} 
                        onBlur={() => { this.getDefaultState() }} 
                    />
                    <ul className="filters__resultlist">
                        {searchResult}
                    </ul>
                </dd>
            </dl>

        )
    }
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items,
    areas: state.areas
})


OverlappFilterForm = connect(mapStateToProps)(OverlappFilterForm);
export default OverlappFilterForm;