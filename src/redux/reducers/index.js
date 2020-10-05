import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import profile from './profile';
import estate from './estate';
import renter from './renter';
import reservation from './reservation';
import success from './success';

export default combineReducers({ auth, error, profile, estate, renter, reservation, success });
