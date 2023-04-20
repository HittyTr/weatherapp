import { BrowserRouter } from "react-router-dom";
import Main from "./components/main";
import { LocationContextProvider } from "./context/LocationContext";
import  'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <LocationContextProvider>
      <Main/>
      </LocationContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
