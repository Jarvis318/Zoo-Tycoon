// import {
//     UPDATE_PRODUCTS,
//     ADD_TO_CART,
//     UPDATE_CART_QUANTITY,
//     REMOVE_FROM_CART,
//     ADD_MULTIPLE_TO_CART,
//     UPDATE_CATEGORIES,
//     UPDATE_CURRENT_CATEGORY,
//     CLEAR_CART,
//     TOGGLE_CART,
//   } from './actions';
  
//   // TODO: To get a better understand of how a reducer works - add comments to the various actions in the reducer
//   export const reducer = (state, action) => {
//     switch (action.type) {
//       // TODO: Add a comment describing the functionality of the UPDATE_PRODUCTS case
//       // Your comment here Returns a copy of state with an update of products array. We use the action.products property and spread it's contents into the new array.
//       case UPDATE_PRODUCTS:
//         return {
//           ...state,
//           products: [...action.products],
//         };
  
//       case ADD_TO_CART:
//         return {
//           ...state,
//           cartOpen: true,
//           cart: [...state.cart, action.product],
//         };
  
//       case ADD_MULTIPLE_TO_CART:
//         return {
//           ...state,
//           cart: [...state.cart, ...action.products],
//         };
//       // TODO: Add a comment describing the functionality of the UPDATE_CART_QUANTITY case
//       // Your comment here- Returns a copy of state, sets the cartOpen to true and maps through the items in the cart. If the item's 'id' that was provided in the action.payload, we update the purchacse quantity.
//       case UPDATE_CART_QUANTITY:
//         return {
//           ...state,
//           cartOpen: true,
//           cart: state.cart.map((product) => {
//             if (action._id === product._id) {
//               product.purchaseQuantity = action.purchaseQuantity;
//             }
//             return product;
//           }),
//         };
  
//       // TODO: Add a comment describing the functionality of the REMOVE_FROM_CART case
//       // Your comment here- First we interate through each item in the cart and check to see if the 'product._id' matches the 'action._id'
//       // If so, we remove it from our cart and set the updated state to a variable called 'newState'
//       case REMOVE_FROM_CART:
//         let newState = state.cart.filter((product) => {
//           return product._id !== action._id;
//         });
  
//         return {
//           ...state,
//           cartOpen: newState.length > 0,
//           cart: newState,
//         };
  
//       case CLEAR_CART:
//         return {
//           ...state,
//           cartOpen: false,
//           cart: [],
//         };
  
//       case TOGGLE_CART:
//         return {
//           ...state,
//           cartOpen: !state.cartOpen,
//         };
  
//       case UPDATE_CATEGORIES:
//         return {
//           ...state,
//           categories: [...action.categories],
//         };
  
//       case UPDATE_CURRENT_CATEGORY:
//         return {
//           ...state,
//           currentCategory: action.currentCategory,
//         };
  
//       // TODO: Add a comment describing what the default case is for
//       // Your comment here- Return 
//       default:
//         return state;
//     }
//   };
  