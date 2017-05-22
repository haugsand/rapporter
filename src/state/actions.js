

export const requestArea = (area) => {
  return {
    type: 'REQUEST_AREA',
    area: area
  }
}

export const recieveArea = (area, items) => {
  return {
    type: 'RECIEVE_AREA',
    area: area,
    items: items
  }
}

export const requestResult = () => {
  return {
    type: 'REQUEST_RESULT'
  }
}

export const recieveResult = (id, result) => {
  return {
    type: 'RECIEVE_RESULT',
    id: id,
    result: result
  }
}

export const increaseFinishedQueries = (number) => {
  return {
    type: 'INCREASE_FINISHED_QUERIES',
    number: number
  }
}

export const setTotalQueries = (number) => {
  return {
    type: 'SET_TOTAL_QUERIES',
    number: number
  }
}
export const finalizeQueries = () => {
  return {
    type: 'FINALIZE_QUERIES'
  }
}


export const setColumnValues = (columnValues) => {
  return {
    type: 'SET_COLUMN_VALUES',
    columnValues: columnValues
  }
}

export const setRowValues = (rowValues) => {
  return {
    type: 'SET_ROW_VALUES',
    rowValues: rowValues
  }
}

export const setSubrowValues = (subrowValues) => {
  return {
    type: 'SET_SUBROW_VALUES',
    subrowValues: subrowValues
  }
}




export const requestVegobjekttyper = () => {
  return {
    type: 'REQUEST_VEGOBJEKTTYPER'
  }
}

export const recieveVegobjekttyper = (items) => {
  return {
    type: 'RECIEVE_VEGOBJEKTTYPER',
    items: items
  }
}



export const requestEgenskapstyper = () => {
  return {
    type: 'REQUEST_EGENSKAPSTYPER'
  }
}

export const recieveEgenskapstyper = (vegobjekttype, egenskapstyper) => {
  return {
    type: 'RECIEVE_EGENSKAPSTYPER',
    vegobjekttype: vegobjekttype,
    egenskapstyper: egenskapstyper
  }
}
