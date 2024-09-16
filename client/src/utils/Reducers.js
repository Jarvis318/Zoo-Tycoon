import {
    UPDATE_ENVIRONMENTS,
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
      // Your comment here Returns a copy of state with an update of environments array. We use the action.products property and spread it's contents into the new array.
      case UPDATE_ENVIRONMENTS:
        return {
          ...state,
          environmentsData: [...action.environmentsData],
        };
  
     
  
      // TODO: Add a comment describing what the default case is for
      default:
        return state;
    }
  };
  