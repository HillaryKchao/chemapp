import React from "react";
import styles from "./App.module.scss";
import NamePage from "./components/name_page/NamePage";

function App() {
  return (
    <div className={styles.App}>
      <NamePage></NamePage>
    </div>
  );
}

export default App;
