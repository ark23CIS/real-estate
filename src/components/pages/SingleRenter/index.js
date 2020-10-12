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

  React.useEffect(() => {
    if (renterID) dispatch(getRenterByID(renterID));
  }, [dispatch, renterID]);

  const onDeleteRenter = React.useCallback(
    (renterID) => {
      if (renterID) {
        dispatch(deleteRenter(renterID, history));
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
    />
  );
}

SingleRenter.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default React.memo(withRouter(SingleRenter));
