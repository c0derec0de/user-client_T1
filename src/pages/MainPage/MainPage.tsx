import Header from "../../widgets/Header/Header";
import MenuBar from "../../widgets/MenuBar/MenuBar";
import UsersTable from "../../widgets/UsersTable/UsersTable";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <div className={styles.bottomContainer}>
        <aside className={styles.menuLeft}>
          <MenuBar />
        </aside>
        <div className={styles.contentCenter}>
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
