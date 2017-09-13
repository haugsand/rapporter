export default function getSettings (routeParams) {

	let settings = {};

	settings = {
		vegobjekttype: routeParams.vegobjekttype,
		result: routeParams.result,

		row: routeParams.row.split('-')[0].split(':')[0],
		hasSubrow: false,
		subrow: '',
		hasRowfilter: false,
		rowfilter: '',

		column: routeParams.column.split(';')[0],
		columnType: routeParams.column.split(':')[0],
		hasColumnEgenskapstype: false,
		columnEgenskapstype: '',
		hasColumnInterval: false,
		columnInterval: '' 

	}


	if (routeParams.row.split('-').length > 1) {
		settings.hasSubrow = true;
		settings.subrow = routeParams.row.split('-')[1];
	}

    if (routeParams.row.split(':').length > 1) {
    	settings.hasRowfilter = true;
        settings.rowfilter = routeParams.row.split('-')[0].split(':')[1];
    }

    if (routeParams.column.split(':').length > 1) {
    	settings.hasColumnEgenskapstype = true;
        settings.columnEgenskapstype = parseInt(routeParams.column.split(':')[1].split(';')[0], 10);
    }

	if (routeParams.column.split(';').length > 1) {
		settings.hasColumnInterval = true;
		settings.columnInterval = routeParams.column.split(';')[1].split(',');
	}

	return settings;
}