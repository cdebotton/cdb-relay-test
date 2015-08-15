import {
  INCREASE,
  DECREASE,
} from '../constants/actionTypes';

export default function sample(state=0, action) {
  switch (action.type) {
  case INCREASE:
    return state + 1;
  case DECREASE:
    return state - 1;
  default:
    return state;
  }
}
