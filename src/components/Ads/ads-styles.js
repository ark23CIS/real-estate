import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  dateAndUser: {
    display: 'flex',
  },
  user: {
    display: 'flex',
    paddingRight: '10px',
  },
  cardMainContent: {
    paddingLeft: '10px',
  },
  rateContent: {
    paddingLeft: '15px',
  },
  imageInfo: {
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      fontSize: '15px',
      background: 'rgba(0, 0, 0, 0.8)',
      textAlign: 'center',
      borderTopRightRadius: '1rem',
      width: '85px',
    },
    '& > div:nth-child(2)': {
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '0',
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
