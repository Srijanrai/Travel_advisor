import { React, useState } from "react";
import GoogleMapReact from 'google-map-react'; // api for goole maps 
import { Paper, Typography, useMediaQuery } from '@material-ui/core'; // Paper - 
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import Rating from '@material-ui/lab/Rating';
import mapStyles from './mapStyles';
import useStyles from './styles';
const Map = ({ setCoordinates, setBounds, coordinates, places, setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const [childClicked, setChilClicked] = useState(null);
    // const coordinates = {lat : 0 , lng : 0}; 
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact bootstrap URLKeys={{ key: 'AIzaSyBGViolKgHB598yWW0GpHl6dNRFfF7gy1s' }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
                onChange={(e) => {

                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                inChildClick={(child) => (setChildClicked)(child)}
            >
                {
                    places?.map((place, i) => (
                        <div className={classes.mapContainer.markerContainer}
                            lat={Number(place.latitude)}
                            lng={Number(place.longitude)}
                            key={i}
                        >
                            {
                                !isDesktop ? (
                                    <LocationOnOutlinedIcon color="green" fontSize="large" />
                                ) : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant="subtitle2" gutterbottom>
                                            {place.name}
                                        </Typography>
                                        <img
                                            className={classes.pointer}
                                            src={place.photo ? place.photo.images.large.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Frestaurant&psig=AOvVaw0MH9s_Hrgah-pfJVsW5c2F&ust=1652530678820000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJCz6du63PcCFQAAAAAdAAAAABAD'}
                                            alt={place.name}
                                        />
                                        <Rating size="small" value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                            }
                        </div>
                    ))}

                {weatherData?.list?.map((data, i) => (
                    <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                        <img height={100} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
                    </div>
                ))}
            </GoogleMapReact>
 
        </div>

    )
}
export default Map;