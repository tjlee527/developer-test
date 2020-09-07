import React from 'react';
import {connect} from 'react-redux';
import {addItem, deleteItem, resetState} from './redux/actions'; //added reset state action for resubmitting

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
      <div id='app'>
        <h1>MY WISHLIST</h1>
        <div id='list'>
          {wishList.length ?
            wishList.map((item, i) => (
            <li onClick={() => this.handleItemClick(item)} key={i}>{item}</li>
            ))
            : null
          }
        </div>
        <div id='form'>
          <form onSubmit={this.handleAddClick}>
            <input
              type='text'
              name='item'
              onChange={this.handleInputChange}
              value={this.state.input}/>
            <input type='submit' value='Add'/>
          </form>
        </div>
        <div id='submit'>
          <form onSubmit={this.handleSubmitList}>
            <input type='submit' value='Submit'/>
          </form>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  wishList: state.wishList
}))(App);
