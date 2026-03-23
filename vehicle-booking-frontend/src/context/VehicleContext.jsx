import { createContext, useReducer, useContext } from "react";

const VehicleContext = createContext();

const initialState = {
  vehicles: [],
  selectedVehicle: null,
  total: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_VEHICLES":
      return { ...state, vehicles: action.payload };
    case "SELECT_VEHICLE":
      return { ...state, selectedVehicle: action.payload };
    case "SET_TOTAL":
      return { ...state, total: action.payload };
    default:
      return state;
  }
}

export function VehicleProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VehicleContext.Provider value={{ state, dispatch }}>
      {children}
    </VehicleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVehicleContext() {
  return useContext(VehicleContext);
}