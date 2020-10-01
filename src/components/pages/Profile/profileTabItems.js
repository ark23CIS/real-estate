import React from 'react';
import { Ads } from '../..';

export const profileTabItems = (
  ownerID,
  profile = null,
  rentersCards = [],
  estatesCards = [],
  reservatedCards = [],
) => [
  {
    label: 'Renters',
    tabComponent: (
      <Ads
        cards={rentersCards}
        needToRenderBanner={true}
        profile={profile}
        pageType="specific"
        pageOwnerID={ownerID}
      />
    ),
  },
  {
    label: 'Estates',
    tabComponent: (
      <Ads
        cards={estatesCards}
        needToRenderBanner={true}
        profile={profile}
        pageType="specific"
        pageOwnerID={ownerID}
      />
    ),
  },
  {
    label: 'Reservated',
    tabComponent: (
      <Ads
        cards={reservatedCards}
        needToRenderBanner={true}
        profile={profile}
        pageType="specific"
        pageOwnerID={ownerID}
      />
    ),
    ownerID,
  },
];
