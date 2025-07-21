import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import Header from "./widgets/Header/Header";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <MainPage />
      </div>
    </div>
  );
}

export default App;
