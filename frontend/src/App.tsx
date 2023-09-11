import RoutesApp from "./routes";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      
      <AuthProvider> 
        <ToastContainer autoClose={3000}/>
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
