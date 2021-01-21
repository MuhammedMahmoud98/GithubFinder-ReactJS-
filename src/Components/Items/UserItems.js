import React, {Component} from 'react';


const UserItems = (props) => {

        return (
            <div className='user-new-item'>
                <ul>
                    {props.items.map((item, index) =>
                        <li key={index}>{item}</li>
                    )}
                </ul>
            </div>
        );
}

UserItems.defaultProps = {
    items: []
}



export default UserItems;