import { createContext, useContext, useReducer } from "react";
import { reducer } from './Reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    environmentsData: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentEnvironment: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
