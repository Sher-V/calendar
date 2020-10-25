export enum ActionTypes {
  SET_TITLE = "SET_TITLE",
  CLOSE_EDITOR = "CLOSE_EDITOR",
  OPEN_EDITOR = "OPEN_EDITOR",
  SET_OPENED_MEETING = "SET_OPENED_MEETING",
}

// state
export type State = Readonly<{
  anchor: HTMLDivElement | null;
  title: string;
  openedMeeting: OpenedMeetingType;
}>;

export type DayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type MeetingsWeekType = {
  [key in DayOfWeekType]: MeetingType[];
};

export type MeetingType = {
  id: number;
  hour: number;
  title: string;
};

export type OpenedMeetingType = {
  id?: number;
  title: string;
  day: DayOfWeekType;
  hour: number;
};

// actions

type SetTitleAction = {
  type: ActionTypes.SET_TITLE;
  title: string;
};

type OpenEditorAction = {
  type: ActionTypes.OPEN_EDITOR;
  target: HTMLDivElement;
  meeting: OpenedMeetingType;
};

type CloseEditorAction = {
  type: ActionTypes.CLOSE_EDITOR;
};

type SetOpenedMeetingAction = {
  type: ActionTypes.SET_OPENED_MEETING;
  meeting: OpenedMeetingType;
};

export type Actions =
  | SetTitleAction
  | OpenEditorAction
  | CloseEditorAction
  | SetOpenedMeetingAction;
