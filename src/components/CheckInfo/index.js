import React from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CheckInfoPresentational from './CheckInfoPresentational';
import { confirm } from '../../redux/actions';
import { formTextInfo } from './checkInfo-helper';

function CheckInfoConteiner({ location }) {
  const dispatch = useDispatch();
  const { confirmation_status } = useSelector((state) => state.auth);
  const hash = location.search.split('hash=')[1];
  const [info, setInfo] = React.useState(formTextInfo(confirmation_status));

  React.useEffect(() => {
    if (hash) {
      dispatch(confirm(hash));
    }
  }, [hash]);

  React.useEffect(() => {
    setInfo(formTextInfo(confirmation_status));
  }, [hash, confirmation_status]);

  return <CheckInfoPresentational info={info} />;
}

CheckInfoConteiner.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(withRouter(CheckInfoConteiner));
