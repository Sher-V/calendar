import {
  Actions,
  ActionTypes,
  OpenedMeetingType,
} from "./types";
import React from "react";

export const setTitle = (title: string): Actions => ({
  type: ActionTypes.SET_TITLE,
  title,
});

export const openEditor = (
  event: React.MouseEvent<HTMLDivElement>,
  meeting: OpenedMeetingType
): Actions => ({
  type: ActionTypes.OPEN_EDITOR,
  target: event.target as HTMLDivElement,
  meeting,
});

export const closeEditor = (): Actions => ({
  type: ActionTypes.CLOSE_EDITOR,
});

export const setOpenedMeeting = (meeting: OpenedMeetingType): Actions => ({
  type: ActionTypes.SET_OPENED_MEETING,
  meeting,
});
