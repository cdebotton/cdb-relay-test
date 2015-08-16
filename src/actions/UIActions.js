import {
  SET_TITLE,
} from '../constants/actionTypes';

export function setTitle(title) {
  return {
    type: SET_TITLE,
    title,
  };
}
