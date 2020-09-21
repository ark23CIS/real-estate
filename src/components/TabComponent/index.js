import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { AppBar, Tabs, Tab, useTheme } from "@material-ui/core";
import { useStyles, a11yProps, TabPanel } from "./TabComponentHelper";

export default function FullWidthTabs({ tabItems }) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
              />
            ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
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

FullWidthTabs.proptypes = {
  tabItems: PropTypes.arrayOf(PropTypes.object),
};
