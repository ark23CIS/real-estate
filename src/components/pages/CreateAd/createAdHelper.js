import React from "react";
import CreateRenter from "./CreateRenter";
import CreateEstate from "./CreateEstate";
import { GiFamilyHouse, GiPerson } from "react-icons/gi";

export const tabItems = [
  {
    label: "Renter",
    tabComponent: <CreateRenter />,
    iconComponent: <GiFamilyHouse />,
  },
  {
    label: "Estate",
    tabComponent: <CreateEstate />,
    iconComponent: <GiPerson />,
  },
];
