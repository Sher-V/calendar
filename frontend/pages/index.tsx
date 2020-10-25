import React, { useCallback, useReducer, useRef } from "react";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { ClickAwayListener } from "@material-ui/core";
import Days from "../components/days/days";
import Hours from "../components/hours/hours";
import Editor from "../components/editor/editor";
import Meeting from "../components/meeting/meeting";
import styles from "./index.module.scss";
import reducer, { initialState } from "../utils/home/reducer";
import {
  closeEditor,
  openEditor,
  setOpenedMeeting,
  setTitle,
} from "../utils/home/actions";
import { DayOfWeekType } from "../utils/home/types";
import {
  useDeleteMeetingMutation,
  useMeetingsQuery,
  useSaveMeetingMutation,
} from "../generated/graphql";

const Index = () => {
  const { data, loading, error, refetch } = useMeetingsQuery();
  const [saveMeeting] = useSaveMeetingMutation();
  const [deleteMeeting] = useDeleteMeetingMutation();

  const [{ anchor, title, openedMeeting }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // to handle clicks on editor
  const editorRef = useRef<HTMLDivElement>();

  const handleClickOutside = (event: React.MouseEvent<Document>) => {
    if (editorRef.current) {
      if (!editorRef.current.contains(event.target as Node))
        dispatch(closeEditor());
      else dispatch(setOpenedMeeting({ ...openedMeeting, title }));
    }
  };

  const createMeeting = (event: any) => {
    const data = event.target.getAttribute("data-id");

    if (data) {
      if (!!openedMeeting) {
        dispatch(closeEditor());
        return;
      }
    } else return;

    const [day, hour]: [DayOfWeekType, number] = data.split(" ").map(Number);

    dispatch(openEditor(event, { day, hour, title: "" }));
  };

  const onSave = async () => {
    await saveMeeting({
      variables: { ...openedMeeting, title },
    });
    await refetch();
    dispatch(closeEditor());
  };

  const onDelete = async () => {
    await deleteMeeting({
      variables: { id: openedMeeting.id },
    });
    await refetch();
    dispatch(closeEditor());
  };

  const onOpen = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
      day: DayOfWeekType,
      hour: number
    ) => {
      const meeting = data.meetings[day].find(
        (meeting) => meeting.hour === hour
      );
      dispatch(openEditor(event, { ...meeting, day }));
    },
    [data]
  );

  const onClose = () => dispatch(closeEditor());

  if (loading) return <CircularProgress className={styles.loader} />;

  if (error)
    return (
      <Box display="flex" width={"100%"} height={1000}>
        <Box m={"auto"}>An error occurred. Please try again.</Box>
      </Box>
    );

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
                  {Array.from({ length: 7 }, (__, day: DayOfWeekType) => (
                    <div
                      className={styles.hour}
                      key={`${day} ${hour}`}
                      data-id={`${day} ${hour}`}
                      onClick={createMeeting}
                    >
                      <Meeting
                        hour={hour}
                        openedMeeting={openedMeeting}
                        meetingsByDay={data.meetings[day]}
                        day={day}
                        onOpen={onOpen}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ClickAwayListener>
        </div>
        <Editor
          remove={onDelete}
          save={onSave}
          openedMeeting={openedMeeting}
          title={title}
          setTitle={(title) => dispatch(setTitle(title))}
          ref={editorRef}
          anchor={anchor}
          isOpen={!!openedMeeting}
          onClose={onClose}
        />
      </Box>
    </Container>
  );
};

export default Index;
