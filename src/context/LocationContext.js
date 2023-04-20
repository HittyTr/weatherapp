import { createContext } from "react";
import { useReducer } from "react";
import { locationReducer } from "../reducer/LocationReducer";

const INITIAL_STATE = {
    location:{
        lat:'',
        lon:''
    },
    weather:{
    },
    forecast:[]
};
export const LocationContext = createContext();

export const LocationContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(locationReducer, INITIAL_STATE);
    return (
        <LocationContext.Provider value={{location:state.location, weather:state.weather,forecast:state.forecast,dispatch}}>
            {children}
        </LocationContext.Provider>
    )
}
