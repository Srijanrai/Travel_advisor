import React from "react";
import { useEffect, useState } from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { getPlacesData ,getWeatherData} from "./api";
const App = () => {

    const [places, setPlaces] = useState([]);
    const[coordinates , setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    //lifting state up by map - > to  share items to the closest ancestor 
    const[childClicked , setChilClicked] = useState(null);
    const[isLoading , setIsLoading] = useState(false);
    const [type,setType] = useState('restaurants');
    const [rating,setRating] = useState('');
    const[filteredPlaces,setFilteredPlaces] = useState([]);
    
    const [weatherData , setWeatherData] = useState([]);

     // console.log(bounds); 
     useEffect(() => {
      // to get the current location of the user 
      navigator.geolocation.getCurrentPosition(({coords : {latitude,longitude}}) => {
          setCoordinates({lat:latitude , lng : longitude}) ;
      })
     },[]);
     
     // for rating purpose  
     useEffect(() => {
       const filteredPlaces =places.filter((place)=>place.rating > rating ) ;   
       setFilteredPlaces(filteredPlaces); 
     } , [rating]) ;

    useEffect(() => {
        // pass the bounds to fetch the restaurants near you 
        if(bounds.sw && bounds.ne){
        setIsLoading(true); 

        getWeatherData(coordinates.lat , coordinates.lng)
        .then((data) => setWeatherData(data));

  

        getPlacesData(type , bounds.sw , bounds.ne)
        .then((data) => {
           console.log(data) ; 
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setFilteredPlaces([]);
            setIsLoading(false);
        })
    }
    }, [type ,bounds]);
    return (
        <>
            <CssBaseline />
            <Header 
            setCoordinates = {setCoordinates}
            />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
               
                    <List  
                    places= {filteredPlaces.length ? filteredPlaces : places}
                    childClicked = {childClicked}
                    isLoading = {isLoading}
                    type= {type}
                    setType = {setType}
                    rating = {rating}
                    setRating = {setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    setCoordinates = {setCoordinates}
                    setBounds = {setBounds}
                    coordinates = {coordinates} 
                    places= {filteredPlaces.length ? filteredPlaces : places}
                    setChilClicked = {setChilClicked}
                    weatherData  = {weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}
export default App; 