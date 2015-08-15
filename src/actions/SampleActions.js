import {
  INCREASE,
  DECREASE,
} from '../constants/actionTypes';

export function increase() {
  return {type: INCREASE};
}

export function decrease() {
  return {type: DECREASE};
}

