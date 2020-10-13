import React from 'react';
import { GiFamilyHouse, GiPerson } from 'react-icons/gi';
import CreateAdFormContainer from './CreateAdFormContainer';

const ADFields = [
  { name: 'contactNumber', label: 'Contact Number', required: true },
  { name: 'title', label: 'Title', required: true },
  { name: 'text', label: 'Text', required: true },
  { name: 'footage', label: 'Footage', required: true },
  { name: 'price', label: 'Price', belongs: 'estate', required: true },
  { name: 'maxPrice', label: 'Max Price', belongs: 'renter', required: true },
  { name: 'region', label: 'Region', required: false },
  { name: 'country', label: 'Country', type: 'location', belongs: 'estate', required: false },
  { name: 'city', label: 'City', type: 'location', belongs: 'estate', required: false },
  { name: 'street', label: 'Street', type: 'location', belongs: 'estate', required: false },
  {
    name: 'buildingNumber',
    label: 'Building Number',
    type: 'location',
    belongs: 'estate',
    required: false,
  },
];

export const tabItems = [
  {
    label: 'Renter',
    tabComponent: (
      <CreateAdFormContainer label="renter" iconComponent={<GiFamilyHouse />} fields={ADFields} />
    ),
  },
  {
    label: 'Estate',
    tabComponent: (
      <CreateAdFormContainer label="estate" iconComponent={<GiPerson />} fields={ADFields} />
    ),
  },
];
