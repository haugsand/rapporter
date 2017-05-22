import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getRoute } from './../../services/getRoute';

class SelectVegobjekttype2 extends Component {


    constructor() {
        super()
        this.state = {
            query: '', 
            suggestions: [], 
            selected: -1
        }
    }

    handleChangeVegobjekttype (id) {
        this.getDefaultState();

        let newRoute = getRoute(this.props.routeParams, 'vegobjekttype', id);
        browserHistory.push(newRoute);
    }

    setVegobjekttypeName (props) {
        const id = props.routeParams.vegobjekttype;

        if (props.vegobjekttyper.hasOwnProperty(id)) {
            this.setState({
                query: props.vegobjekttyper[id].navn
            });
        }
    }

    componentWillMount () {
        this.setVegobjekttypeName(this.props);
    }

    componentWillReceiveProps (nextProps) {
        this.setVegobjekttypeName(nextProps);
    }

    clearQuery () {
        this.setState({
            query: ''
        });
        ReactDOM.findDOMNode(this.searchField).focus();
    }


    getDefaultState () {
        this.setState({
            suggestions: [], 
            selected: -1
        });
        this.setVegobjekttypeName(this.props);
    }


    handleChangeQuery (query) {

        let suggestions =  [];
        let selectedIndex = -1;

        
        if (query.length > 0) {

            Object.keys(this.props.vegobjekttyper).forEach(id => {  
                if (this.props.vegobjekttyper[id].navn.toLowerCase().includes(query.toLowerCase())) {
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

                    this.handleChangeVegobjekttype(selectedVegobjekttype.id)
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
                    <button onMouseDown={(e) => { this.handleChangeVegobjekttype(suggestion.id) }}>{suggestion.navn}</button>
                </li>
            );
        });

        return (

            <div className="filters__filter">
                <input 
                    type="text" 
                    className="filters__searchinput" 
                    placeholder="Søk etter vegobjekttype"
                    value={this.state.query} 
                    onChange={(e) => { this.handleChangeQuery(e.target.value) }} 
                    onKeyDown={(e) => { this.handleKeyDown(e) }} 
                    onBlur={() => { this.getDefaultState() }} 
                    ref={node => this.searchField = node}
                />

                {this.state.query ? <button onClick={() => { this.clearQuery() }} >x</button> : '' }


                <ul className="filters__resultlist">
                    {searchResult}
                </ul>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    vegobjekttyper: state.vegobjekttyper.items
})


SelectVegobjekttype2 = connect(mapStateToProps)(SelectVegobjekttype2);
export default SelectVegobjekttype2;