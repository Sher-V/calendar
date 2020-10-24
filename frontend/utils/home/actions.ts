import {Actions, ActionTypes, DayOfWeekType, MeetingsWeekType} from "./types";

export const setTitle = (title: string): Actions => ({
  type: ActionTypes.SET_TITLE,
  title,
});

export const setAnchor = (target: HTMLDivElement): Actions => ({
  type: ActionTypes.SET_ANCHOR,
  target,
});

export const setOpened = (
  value: { day: DayOfWeekType; hour: number } | null
): Actions => ({
  type: ActionTypes.SET_OPENED,
  value,
});

export const setMeetings = (meetings: MeetingsWeekType): Actions => ({
  type: ActionTypes.SET_MEETINGS,
  meetings,
});

export const setPastMeetings = (
  meetings: MeetingsWeekType | null
): Actions => ({
  type: ActionTypes.SET_PAST_MEETINGS,
  meetings,
});

export const undo = (): Actions => ({
  type: ActionTypes.UNDO,
});

export const remove = (): Actions => ({
  type: ActionTypes.REMOVE,
});
