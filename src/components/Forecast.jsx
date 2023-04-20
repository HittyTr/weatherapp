

const Forecast=({hour,date, degree, img})=>{
    return(
        <div className="forecast__item">
            <div className="whtSpc">{`${date} ${hour}`}</div>
            <div className="forecast__icon"><img src={ `https://openweathermap.org/img/wn/${img}@2x.png`} alt=""/></div>
            <div className="whtSpc">{degree} °C</div>
        </div>
    )
}

export default Forecast;