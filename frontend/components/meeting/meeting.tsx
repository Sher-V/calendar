import React from "react";
import { isEqual } from "lodash";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  DayOfWeekType,
  MeetingType,
  OpenedMeetingType,
} from "../../utils/home/types";

interface Props {
  hour: number;
  meetingsByDay: MeetingType[];
  day: DayOfWeekType;
  openedMeeting: OpenedMeetingType;
  onOpen: (
    event: React.MouseEvent<HTMLDivElement>,
    day: DayOfWeekType,
    hour: number
  ) => void;
}

const useStyles = makeStyles( theme =>({
  root: {
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: "16px",
    fontWeight: theme.typography.fontWeightMedium,
    paddingLeft: theme.spacing(1),
  },
}));

const getHour = (hour: number) => {
  switch (true) {
    case hour === 0:
      return `12pm`;
    case hour < 12:
      return `${hour}am`;
    case hour - 12 === 0:
      return `12am`;
    default:
      return `${hour - 12}pm`;
  }
};

const Meeting = React.memo<Props>(
  ({ hour, meetingsByDay, onOpen, day, openedMeeting }) => {
    let meeting;

    if (openedMeeting?.day === day && openedMeeting?.hour === hour) {
      meeting = openedMeeting;
    } else meeting = meetingsByDay.find((meeting) => meeting.hour === hour);


    if (!meeting) return null;

    const classes = useStyles();

    return (
      <Paper
        onClick={(event) => onOpen(event, day, hour)}
        classes={{ root: classes.root }}
      >
        <div>{(!!meeting.title && meeting.title) || "(no title)"}</div>
        <div>
          {getHour(hour)}-{getHour(hour + 1)}
        </div>
      </Paper>
    );
  },
  (oldProps, nextProps) => isEqual(oldProps, nextProps)
);

export default Meeting;
