import {useSelector} from "react-redux";



function DashBoard() { 
const state = useSelector((state) => state.dashboard);


  const styles = {
    main: {
      display: "flex", // creates a flex row so columns sit side-by-side
      gap: "12px", // consistent spacing between columns (better than margin on children, no overflow)
      padding: "0 12px", // inset from page edges so content doesn't touch border
      width: "100%", // take full width of parent (#root is 1126px max)
      boxSizing: "border-box", // padding is included in width, prevents 100% + padding overflow
      alignItems: "flex-start", // columns align at top, don't stretch to tallest column height
    },
    column: {
      flex: "1 1 0", // flex-grow:1 = share available space equally, flex-shrink:1 = allow shrink, flex-basis:0 = equal base width regardless of content
      display: "flex", // make column itself a flex container for vertical stacking
      flexDirection: "column", // stack header on top of task list vertically
      gap: "12px", // space between header and task list inside each column
      minWidth: 0, // critical for flex children: allows column to shrink below intrinsic content width and prevents overflow
      minHeight: "200px", // gives empty columns visible height
    },
    kanbanHeader: {
      display: "flex", // flex row to place title and count on same line
      justifyContent: "space-between", // pushes title to left and task count to right, uses all horizontal space
      alignItems: "center", // vertically centers title and count pill
      backgroundColor: "var(--code-bg)", // theme-aware background (light: #f4f3ec, dark: #1f2028) instead of hardcoded lightgray
      border: "1px solid var(--border)", // uses design token border so it matches app and supports dark mode
      padding: "12px 14px", // internal breathing room
      borderRadius: "8px", // soft rounded corners matching app style
      width: "100%", // fill the full width of parent column (column is flex:1, so this = all available space)
      boxSizing: "border-box", // padding + border included in 100% width, prevents overflow caused by margin+width
    },
    headerTitle: {
      fontSize: "14px", // compact kanban title, smaller than page h2 (24px) to fit column
      fontWeight: 600, // semi-bold for emphasis
      letterSpacing: "0.5px", // slight tracking for uppercase readability
      textTransform: "uppercase", // kanban convention: TODO, PROGRESS, DONE
      color: "var(--text-h)", // theme heading color (light: #08060d, dark: #f3f4f6)
      margin: 0, // remove default h2 margin (index.css adds 0 0 8px) for tight header
    },
    taskCount: {
      fontSize: "12px", // small pill text
      fontWeight: 500, // medium weight for readability
      color: "var(--text)", // muted text color from theme
      backgroundColor: "var(--social-bg)", // subtle pill background from theme
      padding: "2px 8px", // pill padding
      borderRadius: "20px", // fully rounded pill shape
      whiteSpace: "nowrap", // prevents "1 tasks" from wrapping
      border: "1px solid var(--border)", // subtle border to define pill
    },
    taskList: {
      display: "flex", // flex column for stacking task cards
      flexDirection: "column", // stack cards vertically
      gap: "10px", // space between cards
      minHeight: "60px", // visible drop area even when empty
      backgroundColor: "var(--code-bg)", // subtle column background to group cards visually
      border: "1px solid var(--border)", // defines column boundary
      borderRadius: "8px", // matches header radius
      padding: "10px", // inner padding for cards
      boxSizing: "border-box", // padding included in width
      flex: 1, // fill remaining vertical space in column, makes empty columns look balanced
    },
    taskCard: {
      backgroundColor: "var(--bg)", // card pops against column bg (white vs light gray)
      border: "1px solid var(--border)", // card border from theme
      borderRadius: "8px", // rounded card
      padding: "12px", // card internal spacing
      display: "flex", // flex column for name + tag stacking
      flexDirection: "column", // stack name above tag
      gap: "8px", // space between name and tag
      boxShadow: "var(--shadow)", // subtle shadow from theme for depth (same as docs cards)
      transition: "box-shadow 0.2s, transform 0.15s", // smooth hover effect
      cursor: "default", // indicates non-draggable for now (change to grab when dnd added)
    },
    taskName: {
      fontSize: "14px", // readable task name size
      fontWeight: 500, // medium weight
      color: "var(--text-h)", // heading color for emphasis
      lineHeight: "1.4", // comfortable line height
      margin: 0, // remove default p margin
    },
    taskTag: {
      fontSize: "11px", // small tag text
      fontWeight: 600, // bold tag for visibility
      letterSpacing: "0.3px", // slight tracking
      textTransform: "uppercase", // tag convention
      color: "var(--accent)", // theme accent color (purple) for high priority
      backgroundColor: "var(--accent-bg)", // light accent bg (10% opacity) to highlight
      border: "1px solid var(--accent-border)", // accent border at 50% opacity for definition
      padding: "2px 6px", // compact tag padding
      borderRadius: "4px", // small radius for tag
      alignSelf: "flex-start", // tag only as wide as content, not full width
      display: "inline-flex", // allows padding and centering
    },
    emptyState: {
      fontSize: "13px", // muted empty text size
      color: "var(--text)", // muted color
      textAlign: "center", // centered in column
      padding: "20px 10px", // breathing room
      border: "1px dashed var(--border)", // dashed border indicates drop zone
      borderRadius: "6px", // rounded dashed area
      backgroundColor: "transparent", // blends with taskList bg
      fontStyle: "italic", // distinguishes empty state from real content
    },
  };

  return (
    <div>
      {/* main flex row: holds 3 columns side-by-side with gap spacing */}
      <div style={styles.main}>
        {state.map((column) => {
          return (
            // column wrapper: flex:1 ensures equal width and lets kanbanHeader take all available space
            // without this, header width:100% would only be as wide as content (shrink-wrapped)
            <div key={column.id} style={styles.column}>
              {/* kanbanHeader: now fills column width because parent is flex:1 + header is width:100% + box-sizing:border-box */}
              <div style={styles.kanbanHeader}>
                {/* headerTitle: uppercase, tight margin, theme color */}
                <h2 style={styles.headerTitle}>{column.title}</h2>
                {/* taskCount: pill showing number of tasks, pushed right by justifyContent:space-between */}
                <span style={styles.taskCount}>{column.content.length} tasks</span>
              </div>
              {/* taskList: column background + stacked cards, flex:1 fills remaining height */}
              <div style={styles.taskList}>
                {column.content.length === 0 ? (
                  // emptyState: shown when no tasks, dashed border indicates where cards will appear
                  <div style={styles.emptyState}>No tasks yet</div>
                ) : (
                  column.content.map((task, index) => {
                    return (
                      // taskCard: individual card with shadow, border, and hover potential
                      <div key={index} style={styles.taskCard}>
                        {/* taskName: primary text, heading color */}
                        <p style={styles.taskName}>{task.name}</p>
                        {/* taskTag: accent pill, e.g. High Priority */}
                        <span style={styles.taskTag}>{task.tag}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}

export default DashBoard;
