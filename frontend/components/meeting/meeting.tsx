import React from "react";
import styles from "./index.module.scss";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  hour: number;
  title: string;
  day?: number;
  onOpen?: (
    event: React.MouseEvent<HTMLDivElement>,
    day: number,
    hour: number
  ) => void;
}

const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: "rgb(3, 155, 229)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 500,
    paddingLeft: "5px",
  },
});

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

const Meeting: React.FC<Props> = ({ hour, title, onOpen, day }) => {
  const classes = useStyles();

  return (
    <Paper
      onClick={(event) => onOpen(event, day, hour)}
      classes={{ root: classes.root }}
    >
      <div>{(!!title && title) || "(no title)"}</div>
      <div>
        {getHour(hour)}-{getHour(hour + 1)}
      </div>
    </Paper>
  );
};

export default Meeting;
