import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  anchor: null,
  title: "",
  openedMeeting: null,
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.SET_OPENED_MEETING:
      return {
        ...state,
        openedMeeting: action.meeting,
      };
    case ActionTypes.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case ActionTypes.OPEN_EDITOR:
      if (!!state.openedMeeting) return state;

      return {
        ...state,
        openedMeeting: action.meeting,
        title: action.meeting.title,
        anchor: action.target,
      };
    case ActionTypes.CLOSE_EDITOR:
      return {
        ...state,
        openedMeeting: null,
        title: "",
      };
    default:
      return state;
  }
};

export default reducer;
