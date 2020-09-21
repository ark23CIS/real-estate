import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Result, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Block } from "..";
import PropTypes from "prop-types";
import { confirm } from "../../redux/actions";

const formTextInfo = (confirmation_status) => {
  if (confirmation_status === "success") {
    return {
      status: "success",
      title: "Ready!",
      subtitle: "Account has been confirmed",
    };
  } else if (confirmation_status === "error") {
    return {
      status: "error",
      title: "Error",
      subtitle: "The hash doesnt exist or it is invalid",
    };
  } else {
    return {
      status: "info",
      title: "Confirm your E-mail",
      subtitle: "The link with confirmation has been sent to your email",
    };
  }
};

function index({ location }) {
  const dispatch = useDispatch();
  const { confirmation_status } = useSelector((state) => state.auth);
  const hash = location.search.split("hash=")[1];
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
            info.status === "success" && (
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

index.propTypes = {
  location: PropTypes.object,
};

export default React.memo(withRouter(index));
