import DashBoard from "./dashboard/DashBoard";
import Header from "./header/Header";
import Filter from "./filter/Filters";

function Home() {
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
    },

    leftPanel: {
      flex: 1,
      backgroundColor: "#f0f0f0",
    },

    rightPanel: {
      flex: 3,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#e0e0e0",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <Filter />
      </div>

      <div style={styles.rightPanel}>
        <Header />
        <DashBoard />
      </div>
    </div>
  );
}

export default Home;