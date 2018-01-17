import React from 'react';
import filterType from '../filterType'
import Link from "./Link";
const Filter = function () {
    return (<div>
        <Link status={filterType.all}>{filterType.all}</Link>
        <Link status={filterType.completed}>{filterType.completed}</Link>
        <Link status={filterType.unCompleted}>{filterType.unCompleted}</Link>
    </div>)
}
export default Filter