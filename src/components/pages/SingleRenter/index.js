import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getRenterByID, deleteRenter } from '../../../redux/actions';
import SingleRenterPresentational from './SingleRenterPresentational';
import '../SingleEstate/ad.scss';

function SingleRenter({ match, history }) {
  const dispatch = useDispatch();
  const {
    renter: { renter },
    auth: { user },
    profile: { profile },
  } = useSelector((state) => state);
  const renterID = match.params.renterID;

  const [isWindowOpen, setIsWindowOpen] = React.useState(false);

  React.useEffect(() => {
    if (renterID) dispatch(getRenterByID(renterID));
  }, [dispatch, renterID]);

  const toggleWindow = React.useCallback(() => {
    setIsWindowOpen((open) => !open);
  }, [isWindowOpen]);

  const onDeleteRenter = React.useCallback(
    (renterID) => {
      if (renterID) {
        dispatch(deleteRenter(renterID, history));
        toggleWindow();
      }
    },
    [dispatch],
  );

  return (
    <SingleRenterPresentational
      onDeleteRenter={onDeleteRenter}
      renter={renter}
      renterID={renterID}
      profile={profile}
      user={user}
      isWindowOpen={isWindowOpen}
      toggleWindow={toggleWindow}
    />
  );
}

SingleRenter.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleRenter));
