import Input from "./Input";
import Info from "./Info";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const Main= () => {
    const {weather} = useContext(LocationContext);
    const WeatherRequired = ({children}) => {
       return weather.name? children : <Navigate to='/'/>
    }
    return (
        <Routes>
            <Route path="/" element={<Input/>}/>
            <Route path="/info" element={<WeatherRequired>
                <Info/>
            </WeatherRequired>}/>
        </Routes>
            
           

    )
}

export default Main;