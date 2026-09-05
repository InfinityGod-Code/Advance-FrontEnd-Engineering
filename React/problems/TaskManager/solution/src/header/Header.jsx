import { Button, Dialog,Portal } from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {addTask} from "../dashboard/state/reducer";

function Header() {

  const dispatch = useDispatch();
  

  const styles = {
    header: {
      display: "flex", // flex row so button can be aligned left/right via justifyContent
      justifyContent: "flex-start", // button on left for now; change to space-between when adding title/search
      alignItems: "center", // vertically center content
      backgroundColor: "var(--code-bg)", // theme-aware bg instead of hardcoded lightgray
      border: "1px solid var(--border)", // theme border matching kanban
      padding: "12px 16px", // comfortable header padding
      borderRadius: "8px", // matches kanban radius for visual consistency
      margin: "12px", // outer spacing from page edge (replaces 0 10px 10px 10px margin that + width:100% caused overflow)
      width: "auto", // auto + boxSizing lets margin work without 100% overflow (100% + margin = horizontal scroll)
      boxSizing: "border-box", // padding+border included in width calculation
    },
    button: {
      backgroundColor: "var(--accent)", // theme accent purple
      color: "#fff", // white text contrasts on purple in both light/dark
      border: "none", // remove default button border
      padding: "8px 16px", // button padding
      borderRadius: "6px", // rounded button
      fontSize: "14px", // readable size
      fontWeight: 600, // semi-bold
      cursor: "pointer", // hand cursor indicates clickable
      transition: "opacity 0.2s, transform 0.15s", // smooth hover feedback
      boxShadow: "var(--shadow)", // subtle depth
      lineHeight: "1", // tight line height for button
    },
  };

  return (
    // header wrapper: full-width bar with theme colors, now uses width:auto + margin so no overflow
    <div style={styles.header}>
      {/* Add Task button: primary action, accent color makes it stand out */}
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button style={styles.button}>Add Task</button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>

              <Dialog.Header>
                <Dialog.Title>
                  Add Task
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                Content of the dialog
                <Button onClick={() => {dispatch(addTask({
                  data : {
                    title: "TODO",
                    columnId: 3,
                    task : {
                      name: `Task ${Math.floor(Math.random() * 100)}`,
                      tag: "Low Priority",
                    }
                  }
                }))}}>Submit</Button>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}

export default Header;
