import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core';
import { getEstatesByUserID, getRentersByUserID } from '../../redux/actions';
import TabPresentational from './TabPresentational';
import { useStyles } from './TabComponentHelper';

function TabComponentContainer({ tabItems }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profile);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (profiles && profiles.length) dispatch(getRentersByUserID(profiles[0].user._id));
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

  const handleTabChange = (_, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <TabPresentational
      handleTabChange={handleTabChange}
      classes={classes}
      value={value}
      onTabClick={onTabClick}
      handleChangeIndex={handleChangeIndex}
      tabItems={tabItems}
      theme={theme}
    />
  );
}

TabComponentContainer.proptypes = {
  tabItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabComponentContainer;
