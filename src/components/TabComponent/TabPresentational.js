import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { a11yProps, TabPanel } from './TabComponentHelper';

function TabPresentational({
  classes,
  value,
  onTabClick,
  handleTabChange,
  handleChangeIndex,
  tabItems,
  theme,
}) {
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleTabChange}
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

TabPresentational.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
  tabItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabPresentational;
