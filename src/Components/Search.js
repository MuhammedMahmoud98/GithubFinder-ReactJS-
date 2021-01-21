import React, {Component} from 'react';


class Search extends Component {
    state = {
        text: ''
    };

    submitForm = (e) => {
        e.preventDefault();
        if (this.state.text.trim() === '') {
            this.props.showAlert('Please enter user name');
        }
        this.props.searchText(this.state.text);
    }

    onChange = (e) => {
        this.setState({text: e.target.value})
    }

    render() {
        return (
            <div className='form'>
                <form onSubmit={this.submitForm} style={{display: 'block'}}>
                    <input type="text" onChange={this.onChange} className='search-control'
                           placeholder='Search for people' name="text"/>
                    <input type="submit" value='Search' style={searchBtn}/>
                </form>
                {this.props.showClearBtn ?
                    <button onClick={this.props.clearUsers} style={clearBtn}>Clear</button> : null}
            </div>
        );
    }
}


const clearBtn = {
    width: '100px',
    margin: '1rem',
    backgroundColor: '#a8dadc',
    color: '#fff',
    padding: '0.5rem 2rem',
    border: 'none',
    cursor: 'pointer'
}

const searchBtn = {
    padding: '0.5rem 2rem',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2D1457',
    height: '100%',
    transform: 'translateX(-2%)',
    color: '#fff'
}


export default Search;