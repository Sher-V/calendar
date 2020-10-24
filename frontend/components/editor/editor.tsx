import React from "react";
import Popper from "@material-ui/core/Popper";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./index.module.scss";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  isOpen: boolean;
  anchor: HTMLDivElement;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
  save: () => void;
  remove: () => void;
}

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
  },
});

const Editor = React.forwardRef<HTMLDivElement, Props>(
  ({ isOpen, anchor, onClose, title, setTitle, save, remove }, ref) => {
    const classes = useStyles();

    return (
      <Popper
        data-id={"editor"}
        open={isOpen}
        anchorEl={anchor}
        placement={"left"}
        modifiers={{
          offset: {
            enabled: true,
            offset: "0,10",
          },
        }}
      >
        <Card ref={ref}>
          <div className={styles.header}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <CardContent>
            <TextField
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(event.currentTarget.value)
              }
              label={"Title"}
              placeholder={"Add title"}
            />
          </CardContent>
          <CardActions>
            <Button onClick={remove} classes={{ root: classes.root }}>
              Remove
            </Button>
            <Button onClick={save} classes={{ root: classes.root }}>
              Save
            </Button>
          </CardActions>
        </Card>
      </Popper>
    );
  }
);

export default Editor;
