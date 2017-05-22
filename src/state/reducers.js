import { combineReducers } from 'redux'



const areasInitialState = {
    region: {},
    fylke: {},
    kommune: {},
    vegkategori: {
        isFetching: false,
        items: [
            {   
                id: 'E',
                nummer: 'E',
                navn: 'Europaveg',
                index: 0
            },
            {   
                id: 'R',
                nummer: 'R',
                navn: 'Riksveg',
                index: 1
            },
            {   
                id: 'F',
                nummer: 'F',
                navn: 'Fylkesveg',
                index: 2
            },
            {   
                id: 'K',
                nummer: 'K',
                navn: 'Kommunal veg',
                index: 3
            },
            {   
                id: 'P',
                nummer: 'P',
                navn: 'Privat veg',
                index: 4
            },
            {   
                id: 'S',
                nummer: 'S',
                navn: 'Skogsbilveg',
                index: 5
            }
        ]
    }
};

const areas = (state = areasInitialState, action) => {
  switch (action.type) {
    case 'REQUEST_AREA':
      return {
        ...state,
        [action.area]: {
            isFetching: true  
        }

      }    
    case 'RECIEVE_AREA':
      return {
        ...state,
        [action.area]: {
            isFetching: false,
            items: action.items
        }
      }
    default:
      return state
  }
}


const vegobjekttyperInitialState = {
    isFetching: false,
    items: {}
};

const vegobjekttyper = (state = vegobjekttyperInitialState, action) => {
  switch (action.type) {
    case 'REQUEST_VEGOBJEKTTYPER':
      return {
        ...state,
        isFetching: true  
      }    
    case 'RECIEVE_VEGOBJEKTTYPER':
      return {
        ...state,
        isFetching: false,
        items: action.items,
      }    
    default:
      return state
  }
}

const egenskapstyperInitialState = {
    isFetching: false,
    items: {}
};

const egenskapstyper = (state = egenskapstyperInitialState, action) => {
  switch (action.type) {
    case 'REQUEST_EGENSKAPSTYPER':
      return {
        ...state,
        isFetching: true  
      }    
    case 'RECIEVE_EGENSKAPSTYPER':
        return {
            ...state,
            isFetching: false,
            items: {
                ...state.items,
                [action.vegobjekttype]: action.egenskapstyper
            }
        }    
    default:
      return state
  }
}



const columnValuesInitialState = {
    items: []
}


const columnValues = (state = columnValuesInitialState, action) => {
  switch (action.type) {
    case 'SET_COLUMN_VALUES':
      return {
        ...state,
        items: action.columnValues
      }  
    default:
      return state
  }
}

const rowValuesInitialState = {
    items: []
}


const rowValues = (state = rowValuesInitialState, action) => {
  switch (action.type) {
    case 'SET_ROW_VALUES':
      return {
        ...state,
        items: action.rowValues
      }  
    default:
      return state
  }
}


const subrowValuesInitialState = {
    items: {}
}

const subrowValues = (state = subrowValuesInitialState, action) => {
  switch (action.type) {
    case 'SET_SUBROW_VALUES':
      return {
        ...state,
        items: action.subrowValues
      }  
    default:
      return state
  }
}


const resultInitialState = {
    isFetching: false,
    totalQueries: 0,
    finishedQueries: 0,
    data: {}
}

const result = (state = resultInitialState, action) => {
    switch (action.type) {
        case 'REQUEST_RESULT':
            return {
                ...state,
                isFetching: true  
            }    
        case 'RECIEVE_RESULT':
            return {
                ...state,
                finishedQueries: state.finishedQueries + 1,
                data: {
                    ...state.data,
                    [action.id]: action.result
                }
            }
        case 'SET_TOTAL_QUERIES':
            return {
                ...state,
                totalQueries: action.number
            }
        case 'INCREASE_FINISHED_QUERIES':
            return {
                ...state,
                finishedQueries: action.number
            }
        case 'FINALIZE_QUERIES':
            return {
                ...state,
                isFetching: false,
                totalQueries: 0,
                finishedQueries: 0
            }    
        default:
            return state
    }
}


const rootReducer = combineReducers({
    areas, 
    vegobjekttyper,
    egenskapstyper,
    columnValues,
    rowValues,
    subrowValues,
    result
})

export default rootReducer