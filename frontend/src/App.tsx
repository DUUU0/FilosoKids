import RoutesApp from "./routes/routes";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">

      <ToastContainer autoClose={2000} />
      <RoutesApp />

    </div>
  );
}

export default App;
