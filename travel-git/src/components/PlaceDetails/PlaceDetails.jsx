import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
const PlaceDetails = ({ place,selected,refProp }) => {
    const classes = useStyles();
    
    if(selected) refProp?.current?.scrollIntoview({behavior:"smooth",block :"start"})

    return (
        <Card elevation={5}>
            <CardMedia
                style={{ height: 300 }}
                image={place.photo ? place.photo.images.large.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Frestaurant&psig=AOvVaw0MH9s_Hrgah-pfJVsW5c2F&ust=1652530678820000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJCz6du63PcCFQAAAAAdAAAAABAD'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant= "h6"  color ="secondary">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between" color ="secondary">
                   <Rating value = {Number(place.rating)} readOnly />
                    <Typography gutterBottom variant="subtitle1" color ="secondary">Out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" color ="secondary" >
                    <Typography variant="subtitle1" color ="secondary">Price</Typography>
                    <Typography gutterBottom variant="subtitle1" color ="secondary" >{place.price_level}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" color ="secondary" >Ranking </Typography>
                    <Typography gutterBottom variant="subtitle1" color ="secondary" >{place.ranking}</Typography>
                </Box>
                {
                    // which award did the partcular restaurant got 
                    place?.awards?.map((awards) => (
                        //my = marginn along y-axis . 
                        <Box my={1} display="flex" justifyContent="space-between" align="center">
                            <img src={awards.images.small} alt={awards.display_name} />
                            <Typography varaint="subtitle2" color="secondary">{awards.display_name}</Typography>
                        </Box>

                    ))
                }
                   
                {
                     //cuisine of the restaurant
                    place?.cuisine?.map(({ name }) => (
                        <Chip key={name} size="small" color = "secondary" label={name} className={classes.chip}></Chip>

                    ))
                }

                {
                    // place of the restaurant 
                    place?.address && (
                        <Typography gutterbottom variant = "subtitle2" color ="secondary" className={classes.subtitle}>
                          <LocationOnIcon />{place.address}
                        </Typography>

                    )
                }
                {
                    // for contact no. of the restaurant 
                    place?.phone && (
                        <Typography gutterbottom varaint = "subtitle2" color = "secondary" className= {classes.spacing}>
                            <PhoneIcon />{place.phone}
                        </Typography>

                    )
                }
              <CardActions>
                  <Button size ="small" color = "secondary" onClick = {() => window.open(place.web_url,'_blank')}>
                      Trip Advisor
                  </Button>
                  <Button size ="small" color = "secondary" onClick = {() => window.open(place.website,'_blank')}>
                     Website
                  </Button>

              </CardActions>
            </CardContent>
        </Card>
    )
}
export default PlaceDetails;