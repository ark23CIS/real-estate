import React from 'react';
import { GiFamilyHouse, GiPerson } from 'react-icons/gi';
import CreateAdFormContainer from './CreateAdFormContainer';

const ADFields = [
  { name: 'contactNumber', label: 'Contact Number' },
  { name: 'title', label: 'Title' },
  { name: 'text', label: 'Text' },
  { name: 'footage', label: 'Footage' },
  { name: 'price', label: 'Price', belongs: 'estate' },
  { name: 'maxPrice', label: 'Max Price', belongs: 'renter' },
  { name: 'region', label: 'Region' },
  { name: 'country', label: 'Country', type: 'location', belongs: 'estate' },
  { name: 'city', label: 'City', type: 'location', belongs: 'estate' },
  { name: 'street', label: 'Street', type: 'location', belongs: 'estate' },
  {
    name: 'buildingNumber',
    label: 'Building Number',
    type: 'location',
    belongs: 'estate',
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
