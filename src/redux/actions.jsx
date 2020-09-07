export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const RESET_STATE = 'RESET_STATE'; // not sure how to reset state after submitting without an action

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    payload: item,
  };
};


// added this to handle the reset
export const resetState = () => {
  return {
    type: RESET_STATE,
  }
}