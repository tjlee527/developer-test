import React from 'react';
import {connect} from 'react-redux';
import {addItem, deleteItem, resetState} from './redux/actions'; //added reset state action for resubmitting
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleItemClick = (item) => {
    this.props.dispatch(deleteItem(item));
  }

  handleInputChange = (e) => {
    let input = e.target.value;
    this.setState({
      input,
    })
  }

  handleAddClick = (e) => {
    e.preventDefault();
    let { wishList, dispatch } = this.props;
    let input = this.state.input;
    if (input.length && wishList.indexOf(input) === -1) {
      dispatch(addItem(input));
    }
    this.setState({
      input: ''
    })
  }

  handleSubmitList = (e) => {
    e.preventDefault();
    if (this.props.wishList.length) {
      alert('Wish list submitted to Santa!');
      this.props.dispatch(resetState()); // added reset state to handle submission
    }
  }

  render() {
    let { wishList } = this.props;

    return (
      <div className='App'>
        <h1>MY WISHLIST</h1>
        <div className='list'>
          {wishList.length ?
            wishList.map((item, i) => (
            <ul onClick={() => this.handleItemClick(item)} key={i}>{item}</ul>
            ))
            : null
          }
        </div>
        <div className='form'>
          <form onSubmit={this.handleAddClick}>
            <input
              id='text-input'
              type='text'
              name='item'
              onChange={this.handleInputChange}
              value={this.state.input}/>
            <input id='add' type='submit' value='Add'/>
          </form>
          <form onSubmit={this.handleSubmitList}>
            <input id='submit' type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  wishList: state.wishList
}))(App);
