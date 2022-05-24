// 'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
//'X-RapidAPI-Key': '146cd2a286mshf62068b98403891p137dd5jsn55a3962acf34'
//'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
import axios from 'axios';
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        
        'X-RapidAPI-Key': '51bba9bf55msh7b91241eca6c32dp155954jsn52a236c815b6',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      }
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}
// to know the weather of the place 
export const getWeatherData = async(lat,lng) => {
  try {
    const {data} = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather' , 
    {
      params: {
       
        lon: lng,  lat: lat,
       },
      headers: {
        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
        'X-RapidAPI-Key': '51bba9bf55msh7b91241eca6c32dp155954jsn52a236c815b6'
      }
    });
     return data ; 
  } catch(error) {
    console.log(error)
  }
}