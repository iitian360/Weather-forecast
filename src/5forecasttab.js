function Fore5(props){
    return(
        <>
        <p>Date: {props.dt_txt}</p>
        <p>Temperature: {Math.round(props.main.temp)}°C</p>
        <p>Description: {props.weather[0].description}</p>
        </>
    )
}

export default Fore5;