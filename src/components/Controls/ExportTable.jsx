import React from 'react';
var FileSaver = require('file-saver');


function ExportTable () {

	const startExport = () => {
		console.log('horse');
		var data = new Blob([document.getElementById('dataTableDiv').innerHTML], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
		});

		FileSaver.saveAs(data, "sample.xls");
	}

    return (
    	<div>
        <button onClick={startExport}>Eksporter</button>
        </div>

    )

}

export default ExportTable;