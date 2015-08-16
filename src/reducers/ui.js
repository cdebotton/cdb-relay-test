import {
  SET_TITLE,
} from '../constants/actionTypes';

const initialState = {
  title: null,
};

export default function ui(state=initialState, action) {
  switch (action.type) {
  case SET_TITLE:
    return {
      ...state,
      title: action.title,
    };
  default:
    return state;
  }
}
