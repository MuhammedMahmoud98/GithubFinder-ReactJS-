import React from 'react';
import spinner from './assets/spinner.gif';

const Spinner = (props) => {
    return(
        <div className='spinner'>
            <img src={spinner} alt="Loading"/>
        </div>
    );
}


export default Spinner;