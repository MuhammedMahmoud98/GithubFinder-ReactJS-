import React, {Component} from 'react';
import axios from 'axios';
import Spinner from '../Spinner'
import { useHistory } from "react-router-dom";
const UserItem = (props) => {
    const {users, loading, hasErr} = props;
    const history = useHistory();

    const userDetailsNavigation = async (i, name) => {
        const newUsers = [...users];
        newUsers.forEach((user, index) => {
            const newUser = {...user};
            newUsers[index] = newUser;
        })
        newUsers[i].userLoading = true;

        props.loadUserData(newUsers);
        const res = await axios.get(`https://api.github.com/users/${name}`);
        props.updateSingleUser(res.data);
        history.push(`/user/${name}`);
        newUsers.forEach(user => {
            user.userLoading = false;
        });
        props.loadUserData(newUsers);
    }

    if (loading) {
        return <Spinner/>
    } else if (hasErr) {
        return (
            <div className='error-found'>
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                <span style={{margin: '0rem 0.5rem'}}>No users found!</span>
            </div>
        );
    } else {
        return (
            <div className='user-item'>
                {users.map((user, index) =>
                    <div className='user-wrapper' key={index} onClick={() => userDetailsNavigation(index, user.login)}>
                        <img src={user.avatar_url} alt="Image" title={user.login}/>
                        <p>{user.login}</p>

                        <a href={user.html_url} target='_blank'><i className="fa fa-github"
                                                                   aria-hidden="true"></i> Go
                            To
                            Github</a>
                        {user.userLoading ? <Spinner/> : null}
                    </div>
                )}
            </div>
        );
    }
}

export default UserItem;