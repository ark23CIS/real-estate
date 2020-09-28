import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import profile from './profile';
import estate from './estate';
import renter from './renter';

export default combineReducers({ auth, error, profile, estate, renter });
