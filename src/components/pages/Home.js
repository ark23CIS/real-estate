import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <div>Home</div>
      <Link to="/estates">Estates</Link>
    </Fragment>
  );
}

export default Home;
