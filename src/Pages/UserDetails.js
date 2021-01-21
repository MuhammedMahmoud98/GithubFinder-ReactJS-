import React from "react";
import {useHistory} from "react-router-dom";

const UserDetails = (props) => {
    const history = useHistory();
    const returnToHome = () => {
        history.push('/');
    }

    if (!props.user.name) {
       returnToHome();
    }
    return (
        <div className={userDetails}>
            <img src={props.user.avatar_url} alt="user-image"/>
            <br/>
            <span>{props.user.name}</span>
            <span><i className="fa fa-github" aria-hidden="true"></i> Followers : {props.user.followers}</span>
            <span><i className="fa fa-github" aria-hidden="true"></i> Repos : {props.user.public_repos}</span>
            <p>{props.user.bio ? props.user.bio : 'No Bio'}</p>
            <button onClick={() => returnToHome()}>Back</button>
        </div>
    );
}

const userDetails = ['user-details'].join(' ');


export default UserDetails;