import React, {useState} from 'react';
import axios from 'axios';

const Card = () => {

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function cen(temp){
        return temp - 273;
    }

    const [data, setDatabase] = useState({})
    const today = new Date();
    const formattedDate = formatDate(today);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=22.959074879855734&lon=88.54107807467085&appid=de6e101b768213ada424823c3207e03a`
    
        axios.get(url).then((response) => {
            setDatabase(response.data)
        })

        return (
            <div className="m-10 items-center text-center flex flex-col md:flex-row md:justify-center">
                <div className="w-1/3 transition duration-500 ease-in-out transform bg-white rounded-lg hover:scale-105 cursor-pointer flex flex-col justify-center items-center text-center p-6">
                    <div className="text-md font-bold flex flex-col text-gray-900">
                        <span className="uppercase text-2xl">Today</span>{" "}
                        <span className="font-normal text-gray-700 text-xl">{formattedDate}</span>
                    </div>
                    <div className="m-4 flex flex-col items-center justify-center text-5xl font-bold w-32 h-32">
                        {data.weather ? <div className="m-1">{data.weather[0].main}</div> : null}
                        <div className="m-1">
                            {data.main ? <h1>{cen(Math.floor(data.main.temp))}°C</h1> : null}
                        </div>
                    </div>
                    <p className="text-gray-700 mb-2">Feels Like</p>
                    {data.main ?<div className="text-3xl font-bold text-gray-900 mb-6">
                        {cen(Math.floor(data.main.feels_like))}°C
                    </div> : null}
                    <p className="text-gray-700 mb-2">Humidity</p>
                    {data.main ? <div className="text-3xl font-bold text-gray-900 mb-6">
                        {data.main.humidity}%
                    </div> : null}
                    <p className="text-gray-700 mb-2">Wind Speed</p>
                    {data.wind ? <div className="text-3xl font-bold text-gray-900 mb-6">
                        {Math.floor(data.wind.speed)} MPH
                    </div>: null}
                </div>
            </div>
        );
    

}

export default Card;