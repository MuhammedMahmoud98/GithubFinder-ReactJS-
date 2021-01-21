import logo from './logo.svg';
import './App.css';
import React, {Component, Fragment} from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// Components
import Navbar from './Components/Layouts/Navbar';
import UserItem from './Components/Users/UserItem';
import UserItems from './Components/Items/UserItems';
import Search from './Components/Search';
import About from './Pages/About';
import UserDetails from "./Pages/UserDetails";
class App extends Component {

    state = {
        loading: false,
        users: [],
        hasError: false,
        alertMessage: '',
        singleUser: {}
    }

    componentDidMount() {
        this.getUsers();
    }


    async getUsers() {
        this.setState({loading: true});
        const usersData = await axios.get('https://api.github.com/users');
        usersData.data.forEach(user => {
            user.userLoading = false;
        });
        this.setState({
            users: usersData.data,
            loading: false
        });
    }

    async getSearchedUsers(text) {
        if (text.trim()) {
            // make errMessage empty to not be displayed if input is not empty
            this.setState({alertMessage: ''});
            // fires the loading component
            this.setState({loading: true});
            // get the users with searched text
            const res = await axios.get(`https://api.github.com/search/users?q=${text}`).catch(err => this.setState({loading: false, hasError: true}));
            console.log(res);
            // check if the returned response is not empty
            if (res.data.items.length > 0) {
                this.setState({users: res.data.items, loading: false, hasError: false})
            } else {
                this.setState({users: res.data.items, loading: false, hasError: true})
            }
        }
    }


    // updates the single user object
    updateSingleUser = (e) => {
        this.setState({singleUser: e});
        console.log(e, 'Signle User');
    }

    // executes whenever user search in text field (PROP UP)
    searchText = (e) => {
        this.getSearchedUsers(e);
    }

    // executes when user click on clear btn (PROP UP)
    clearUsers = () => {
        this.setState({ users: [], loading: false, hasError: true});
    }

    // fires when user submit an empty field
    showAlert = (e) => {
        this.setState({alertMessage: e})
    }

    // update state with changes happens on single user
    updateStateWithUsers = (e) => {
        this.setState({users : e})
        console.log(this.state.users, 'State users');
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar title='GitHub Finder' gitHubIcon='fa fa-github'/>
                    <br/>
                    <Switch>
                        <Route exact path='/'>
                            <Search showClearBtn={this.state.users.length > 0} showAlert={this.showAlert}  clearUsers={this.clearUsers} searchText={this.searchText}/>
                            {/* Fragment is like <ng-container> in angular, will not be rendered in the dom */}
                            <Fragment>
                                {this.state.alertMessage ? <div className='error-found'>
                                    <i className="fa fa-exclamation-triangle" style={{margin: '0rem 0.5rem'}} aria-hidden="true"></i>
                                    {this.state.alertMessage}
                                </div> : null}
                            </Fragment>
                            <div className="users">
                                <UserItem hasErr={this.state.hasError} loading={this.state.loading} users={this.state.users} loadUserData={this.updateStateWithUsers} updateSingleUser={this.updateSingleUser}/>
                            </div>
                        </Route>
                        <Route path='/about'>
                            <About />
                        </Route>
                        <Route path='/user/:id'>
                            <UserDetails user={this.state.singleUser}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    };
}

export default App;
