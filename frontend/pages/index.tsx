import React, { useReducer, useRef } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { useEventsQuery } from "../generated/graphql";
import { ClickAwayListener } from "@material-ui/core";
import Days from "../components/days/days";
import Hours from "../components/hours/hours";
import Editor from "../components/editor/editor";
import Meeting from "../components/meeting/meeting";
import styles from "./index.module.scss";
import reducer, { initialState } from "../utils/home/reducer";
import {
  remove,
  setAnchor,
  setMeetings,
  setOpened,
  setPastMeetings,
  setTitle,
  undo,
} from "../utils/home/actions";
import { DayOfWeekType } from "../utils/home/types";

const Index = () => {
  const { data, loading, error } = useEventsQuery();
  const [{ meetings, anchor, title, openedMeeting }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const editorRef = useRef<HTMLDivElement>();

  const handleClickOutside = (event: React.MouseEvent<Document>) => {
    if (editorRef.current && !editorRef.current.contains(event.target as Node))
      closeEditor();
  };

  const createMeeting = (event: any) => {
    const data = event.target.getAttribute("data-id");

    if (data) {
      if (!!openedMeeting) {
        closeEditor();
        return;
      }
    } else return;

    const [day, hour]: [DayOfWeekType, number] = data
      .split(" ")
      .map(Number);

    openEditor(event, day, hour);
    dispatch(setPastMeetings(meetings));
    dispatch(
      setMeetings({
        ...meetings,
        [day]: [...meetings[day], { title: "", hour }],
      })
    );
  };

  const openEditor = (
    event: React.MouseEvent<HTMLDivElement>,
    day: DayOfWeekType,
    hour: number
  ) => {
    if (!!openedMeeting) return;

    const meeting = meetings[day].find((meeting) => meeting.hour === hour);

    dispatch(setOpened({ day, hour }));
    dispatch(setTitle(meeting?.title || ""));
    dispatch(setAnchor(event.target as HTMLDivElement));
  };

  const closeEditor = () => {
    dispatch(setOpened(null));
    dispatch(setTitle(""));
    dispatch(undo());
  };

  const save = () => {
    dispatch(
      setMeetings({
        ...meetings,
        [openedMeeting.day]: meetings[openedMeeting.day].map((meeting) => {
          if (meeting.hour === openedMeeting.hour) return { ...meeting, title };
          return meeting;
        }),
      })
    );
    dispatch(setPastMeetings(null));
    dispatch(setTitle(""));
    dispatch(setOpened(null));
  };

  const renderMeetings = (hour: number, day: number) => {
    const meeting = meetings[day].find((meeting) => meeting.hour === hour);

    if (meeting)
      return (
        <Meeting
          onOpen={openEditor}
          title={meeting.title}
          day={day}
          hour={hour}
        />
      );

    return null;
  };

  return (
    <Container>
      <Box my={4}>
        <Days />
        <div className={styles.content}>
          <Hours />
          <ClickAwayListener onClickAway={handleClickOutside}>
            <div className={styles.days}>
              {Array.from({ length: 24 }, (_, hour) => (
                <div className={styles.hours} key={hour}>
                  {Array.from({ length: 7 }, (__, day) => (
                    <div
                      className={styles.hour}
                      key={`${day} ${hour}`}
                      data-id={`${day} ${hour}`}
                      onClick={createMeeting}
                    >
                      {renderMeetings(hour, day)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ClickAwayListener>
        </div>
        <Editor
          remove={() => dispatch(remove())}
          save={save}
          title={title}
          setTitle={(title) => dispatch(setTitle(title))}
          ref={editorRef}
          anchor={anchor}
          isOpen={!!openedMeeting}
          onClose={closeEditor}
        />
      </Box>
    </Container>
  );
};

export default Index;
