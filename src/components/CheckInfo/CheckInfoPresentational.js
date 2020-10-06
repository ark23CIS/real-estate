import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import PropTypes from 'prop-types';
import { Block } from '..';

function CheckInfoPresentational({ info }) {
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

CheckInfoPresentational.propTypes = {
  info: PropTypes.objectOf(PropTypes.string),
};

export default CheckInfoPresentational;
