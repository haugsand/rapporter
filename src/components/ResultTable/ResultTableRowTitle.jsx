import React from 'react';
import { Link } from 'react-router';
import { getRoute } from './../../services/getRoute';


function ResultTableRowTitle ({item, routeParams, subrow, settings}) {

    if (item) {

        if (subrow) {
            return <td className="subrow_title" key="title">{item.navn}</td>;

        } else {
            const newRoute = getRoute(routeParams, 'row', settings.row + ':' + item.nummer);

            return <td className="row_title" key="title"><Link to={newRoute}>{item.navn}</Link></td>;
        }

    } else {
        return <td className="row_title" key="title">Hele landet</td>;
    }

}

export default ResultTableRowTitle;