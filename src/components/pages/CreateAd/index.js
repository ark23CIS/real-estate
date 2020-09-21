import React from "react";
import { tabItems } from "./createAdHelper";
import { TabComponent } from "../..";

function index() {
  return (
    <div>
      <TabComponent tabItems={tabItems} />
    </div>
  );
}

export default index;
