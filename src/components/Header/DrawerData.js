import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { AiFillHome, AiOutlineForm } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { GoSignIn, GoSignOut } from 'react-icons/go';

export const DrawerData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome />,
  },
  {
    title: 'Search',
    path: '/search',
    icon: <FaSearch />,
    logged: true,
  },
  {
    title: 'Profile',
    path: '/profiles/me',
    icon: <ImProfile />,
    logged: true,
  },
  {
    title: 'Log out',
    path: '/signin',
    icon: <GoSignOut />,
    logged: true,
  },
  {
    title: 'Sign In',
    path: '/signin',
    icon: <GoSignIn />,
    logged: false,
  },
  {
    title: 'Sign Up',
    path: '/signup',
    icon: <AiOutlineForm />,
    logged: false,
  },
];
