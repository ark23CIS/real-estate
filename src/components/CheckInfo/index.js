import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Result, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Block } from '..';
import { confirm } from '../../redux/actions';
import { formTextInfo } from './checkInfo-helper';

function CheckInfo({ location }) {
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

  return (
    <div>
      <Block>
        <Result
          status={info.status}
          title={info.title}
          subTitle={info.subtitle}
          extra={
            info.status === 'success' && (
              <Button type="primary" key="console">
                <Link to="/signin">Sign In</Link>
              </Button>
            )
          }
        />
      </Block>
    </div>
  );
}

CheckInfo.propTypes = {
  location: PropTypes.object.isRequired,
};

export default React.memo(withRouter(CheckInfo));
