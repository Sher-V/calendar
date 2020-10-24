import { Actions, ActionTypes, State } from "./types";

export const initialState: State = {
  meetings: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
  pastMeetings: null,
  anchor: null,
  title: "",
  openedMeeting: null,
};

const reducer = (state = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionTypes.SET_MEETINGS:
      return {
        ...state,
        meetings: action.meetings,
      };
    case ActionTypes.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case ActionTypes.SET_OPENED:
      return {
        ...state,
        openedMeeting: action.value,
      };
    case ActionTypes.SET_PAST_MEETINGS:
      return {
        ...state,
        pastMeetings: action.meetings,
      };
    case ActionTypes.SET_ANCHOR:
      return {
        ...state,
        anchor: action.target,
      };
    case ActionTypes.UNDO:
      if (state.pastMeetings) {
        return {
          ...state,
          meetings: state.pastMeetings,
          pastMeetings: null,
        };
      }
      return state;
    case ActionTypes.REMOVE:
      const {
        meetings,
        openedMeeting: { hour, day },
      } = state;
      return {
        meetings: {
          ...meetings,
          [day]: meetings[day].filter((meeting) => meeting.hour !== hour),
        },
        openedMeeting: null,
        anchor: null,
        title: "",
        pastMeetings: null,
      };

    default:
      return state;
  }
};

export default reducer;
