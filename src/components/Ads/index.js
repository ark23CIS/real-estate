import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './ads-styles';
import { Like, Dislike, CommentsIcon, Rating, Views } from '..';

function Ads({ cards, profile }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container spacing={4} style={{ margin: 0 }}>
        {cards.map((card) => (
          <Grid
            item
            key={card}
            xs={12}
            sm={6}
            md={(cards.length % 2 === 0) & (cards.length % 3 !== 0) ? 6 : 4}
          >
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={
                  card.photos.length
                    ? card.photos[0]
                    : 'https://media.giphy.com/media/l2JJDrvnFUEboRgSQ/giphy.gif'
                }
                title="Image title"
              >
                <div className={classes.imageInfo}>
                  <div>
                    <div>${card.price ? card.price : card.maxPrice}</div>
                    <div>{card.price ? 'price' : 'max price'}</div>
                  </div>
                  <div>
                    <div>
                      {card.footage}m<sup>2</sup>
                    </div>
                    <div>footage</div>
                  </div>
                </div>
              </CardMedia>

              <div className={classes.cardMainContent}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography className={classes.dateAndUser}>
                    <Link
                      href={`/#/profiles/${card.user._id}`}
                      className={classes.user}
                    >{`${card.user.firstName} ${card.user.lastName}`}</Link>
                    <div>{new Date(card.created).toDateString()}</div>
                  </Typography>
                </CardContent>
                <CardActions className={classes.rateContent}>
                  <Like
                    likeType={card.maxPrice ? 'renter' : 'estate'}
                    collectionID={card._id}
                    amountOflikes={card.amountOflikes}
                    isSearchPage={true}
                    isActive={profile ? card.likes.includes(profile.user._id) : false}
                    isClickable={!!profile}
                  />
                  <Dislike
                    dislikeType={card.maxPrice ? 'renter' : 'estate'}
                    collectionID={card._id}
                    amountOfDislikes={card.amountOfdislikes}
                    isSearchPage={true}
                    isActive={profile ? card.dislikes.includes(profile.user._id) : false}
                    isClickable={!!profile}
                  />
                  <Link
                    style={{ color: 'black', textDecoration: 'none' }}
                    href={`/#/${card.maxPrice ? 'renters' : 'estates'}/${card._id}`}
                  >
                    <CommentsIcon commentsAmount={card.amountOfcomments} />
                  </Link>
                  <Views amountOfViews={card.totalViews} />
                </CardActions>
                <CardActions>
                  <Rating
                    label={card.maxPrice ? 'renter' : 'estate'}
                    collectionID={card._id}
                    ratingValue={card.totalRating}
                    authUserID={profile ? profile.user._id : ''}
                    isSearchPage={true}
                    isClickable={!!profile}
                  />
                </CardActions>
              </div>
              <CardActions>
                <Button size="small" color="primary">
                  <Link href={`/#/${card.maxPrice ? 'renters' : 'estates'}/${card._id}`}>View</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}

Ads.propTypes = {
  cards: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};
export default Ads;
