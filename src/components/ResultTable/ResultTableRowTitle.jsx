import React from 'react';
import { Link } from 'react-router';

import {makeRoute} from './../../services/makeRoute';
import { setRowFilter } from './../../services/editSettings';


function ResultTableRowTitle ({item, subrow, settings}) {

    if (item) {

        if (subrow) {
            return <td className="subrow_title" key="title">{item.navn}</td>;

        } else {

            const newSettings = setRowFilter(settings, item.nummer);
            const newRoute = makeRoute(newSettings);

            return <td className="row_title" key="title"><Link to={newRoute}>{item.navn}</Link></td>;
        }

    } else {
        return <td className="row_title" key="title">Hele landet</td>;
    }

}

export default ResultTableRowTitle;