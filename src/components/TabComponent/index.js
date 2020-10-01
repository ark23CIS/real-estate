import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab, useTheme } from '@material-ui/core';
import { getEstatesByUserID, getRentersByUserID } from '../../redux/actions';
import { useStyles, a11yProps, TabPanel } from './TabComponentHelper';

function TabComponent({ tabItems }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (profiles) if (profiles[0]) dispatch(getRentersByUserID(profiles[0].user._id));
  }, [dispatch, profiles]);

  const onTabClick = React.useCallback(
    (label) => {
      console.log(label);
      if (label === 'Renters') {
        dispatch(getRentersByUserID(profiles[0].user._id));
      } else if (label === 'Estates') {
        dispatch(getEstatesByUserID(profiles[0].user._id));
      }
    },
    [dispatch],
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabItems &&
            tabItems.map(({ label }, index) => (
              <Tab
                key={`${label}_${index}`}
                label={label}
                {...a11yProps(index)}
                onClick={() => onTabClick(label)}
              />
            ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabItems &&
          tabItems.map(({ tabComponent }, index) => (
            <TabPanel value={value} index={index} dir={theme.direction}>
              {tabComponent}
            </TabPanel>
          ))}
      </SwipeableViews>
    </div>
  );
}

TabComponent.proptypes = {
  tabItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabComponent;
