import { createContext, useContext, useReducer } from "react";
import { reducer } from './Reducers'

const GameContext = createContext();
const { Provider } = GameContext;

const GameProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    environmentsData: [],
    //cart: [],
    unlocked: false,
    //categories: [],
    currentEnvironment: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameProvider, useGameContext };
