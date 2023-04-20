import React, {useContext} from 'react';
import {LocationContext} from '../context/LocationContext';
import NavigationIcon from '@mui/icons-material/Navigation';
import {Col, Row} from 'react-bootstrap';
import Forecast from './Forecast';

const Info = () => {
    const {weather,forecast} = useContext(LocationContext);

    const timeBuilder = (tz) => {
        let Utchour= new Date().getUTCHours();
        let UtcMinute= new Date().getUTCMinutes();
        const hour = Utchour + tz/3600;
        const minute = UtcMinute;
        const ampm = hour >= 12 ? 'pm' : 'am'; 
        const correctedHour = hour % 12;
        const zeroPaddedMinute = minute < 10 ? `0${minute}` : minute;
        const zeroPaddedHour = correctedHour < 10 ? `0${correctedHour}` : correctedHour;      
        return `${zeroPaddedHour}:${zeroPaddedMinute} ${ampm}`
    }
    const handledate = (date) => {
        const day = date.slice(8,10);
        const month = date.slice(5,7);
        const hour = date.slice(11,13);
        const minute = date.slice(14,16);
       return [`${day}/${month}`,`${hour}:${minute}`]
    }

    
    return (
        <Row className="info__area">
            <Col className="current" >
            <Row style={{width:'400px'}} >
                <div>
                <div className="city__title">{weather.name} {weather.sys.country} </div>
                <span style={{textAlign:'right'}}> <p>{timeBuilder(weather.timezone)}</p></span>
            </div>
            <div>
                <div> <img src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weatherIcon'/>
                </div>
                <div className="degree__area">
                 {Math.round(weather.main.temp)} °C  </div>
            </div>
            <div>
                <div>Humidity : {weather.main.humidity} %</div>
            </div>
            <div>
                <div>Wind : <NavigationIcon  style={{transform:`rotate(${weather.wind.deg+180}deg)`, color:'42413d'}}/>{weather.wind.speed} m/s</div>
                <div></div>
            </div>
            </Row>
           
        </Col>
        <Col className="forecast">
            {forecast.list.map((item,index)=>{
                if(index>0 && index<6){
                    return(
                        <Forecast
                        date={handledate(item.dt_txt)[0]}
                        hour={handledate(item.dt_txt)[1]}
                        degree={Math.round(item.main.temp)}
                        img={item.weather[0].icon}
                        />
                    )
                }
                else return null;
                
            }
            )}
        
        </Col>
        </Row>
    )
}

export default Info;