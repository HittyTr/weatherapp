import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, Spinner, FormFloating } from 'react-bootstrap';
import { LocationContext } from '../context/LocationContext';
import { useNavigate } from 'react-router-dom';

const Input = () => {
    const [input, setInput] = useState('');
    const [cities, setCities] = useState([]);
    const {location,dispatch} = useContext(LocationContext);
    const [loading, setLoading] = useState(false);
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const getCities = async () => {
        if(input!==''){
            
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
        const data = await response.json();
        setCities(data);
        }

        else {
            setCities([]);
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    useEffect(() => {
        !clicked&&getCities();// eslint-disable-next-line
    }, [input])

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput('');
        handleCurrentWeather();
    }

    const handleCurrentWeather = async () => {
        setLoading(true);
        if(location.lat!=='' && location.lon!==''){
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            const data = await response.json();
            const dataThrhrs = await fetch(`http://api.openweathermap.org/data/2.5/forecast/?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            const dataThrhrsJson = await dataThrhrs.json();
            dispatch({type:'SET_WEATHER', payload:data});
            dispatch({type:'SET_FORECAST', payload:dataThrhrsJson});
            setLoading(false);
            navigate('/info')
        }
       
    }

  


    const handleClickCity = async(e) => {
        const [lat, lon, name] = e.target.value.split(',');
       
        await dispatch({type:'SET_LOCATION', payload:{lat:lat, lon:lon}});
        setInput(name);
        setCities([]);
        setClicked(true);
    }

    return (
        <div className='input__area'>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <FormFloating>
            <Form.Control value={input&&input} onChange={handleChange} type="text" placeholder="Enter city" />
            <Form.Label>Enter city</Form.Label>
            </FormFloating>
        </Form.Group>
        <div className='city__options'>
        {cities.map((city) => (
                <option className='citiOpt'onClick={handleClickCity} key={city.lat} value={[city.lat,city.lon,city.name]}>{city.name} {city.country} </option>
                )
                )
        }
        </div>
        <Button className='mt-2' variant="secondary" type="submit">
            Submit
        </Button>

    </Form>
        {loading&&<Spinner animation="border" role="status">
        </Spinner>}
    
        </div>

    )
}

export default Input;