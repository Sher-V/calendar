export enum ActionTypes {
  SET_OPENED = "SET_OPENED",
  SET_TITLE = "SET_TITLE",
  SET_PAST_MEETINGS = "SET_PAST_MEETINGS",
  SET_MEETINGS = "SET_MEETINGS",
  SET_ANCHOR = "SET_ANCHOR",
  UNDO = "UNDO",
  REMOVE = "REMOVE",
}

// state
export type State = Readonly<{
  meetings: MeetingsWeekType;
  pastMeetings: MeetingsWeekType;
  anchor: HTMLDivElement | null;
  title: string;
  openedMeeting: OpenedMeetingType;
}>;

export type DayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type MeetingsWeekType = {
  [key in DayOfWeekType]: MeetingType[];
};

export type MeetingType = {
  hour: number;
  title: string;
};

export type OpenedMeetingType = {
  day: DayOfWeekType;
  hour: number;
};

// actions
type SetOpenedAction = {
  type: ActionTypes.SET_OPENED;
  value: {
    day: DayOfWeekType;
    hour: number;
  };
};

type SetTitleAction = {
  type: ActionTypes.SET_TITLE;
  title: string;
};

type SetMeetingsAction = {
  type: ActionTypes.SET_MEETINGS;
  meetings: MeetingsWeekType;
};

type SetPastMeetingsAction = {
  type: ActionTypes.SET_PAST_MEETINGS;
  meetings: MeetingsWeekType;
};

type SetAnchorAction = {
  type: ActionTypes.SET_ANCHOR;
  target: HTMLDivElement;
};

type UndoAction = {
  type: ActionTypes.UNDO;
};

type RemoveAction = {
  type: ActionTypes.REMOVE
}

export type Actions =
  | SetOpenedAction
  | SetTitleAction
  | SetMeetingsAction
  | SetPastMeetingsAction
  | SetAnchorAction
  | UndoAction | RemoveAction;
