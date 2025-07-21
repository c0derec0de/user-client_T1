import MenuBar from "../../widgets/MenuBar/MenuBar";
import "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className="page-layout">
      <div className="main-content-wrapper">
        <div className="content-center">
          <h1>Главный контент</h1>
          <p>Теперь контент действительно по центру, а меню справа</p>
          {/* Ваш основной контент здесь */}
        </div>
      </div>
      <aside className="menu-right">
        <MenuBar />
      </aside>
    </div>
  );
}
