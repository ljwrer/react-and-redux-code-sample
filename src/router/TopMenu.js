import React from 'react'
import {Link} from 'react-router-dom'
export default () => (<ul>
    <li><Link to='/home'>home</Link></li>
    <li><Link to='/about'>about</Link></li>
    <li><Link to='/not found'>404</Link></li>
    <li><Link to='/counter'>counter</Link></li>
</ul>)