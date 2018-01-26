import React from 'react';
import {connect} from 'react-redux';

function GlobalCounter({value}) {
    return (
        <div>
            <span>Total click Count: {value}</span>
        </div>
    );
}
const mapStateToProps = (state) => ({
    value: state.global
})

export default connect(mapStateToProps, null)(GlobalCounter);

