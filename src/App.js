import "./App.css";
import { Route, Routes } from "react-router-dom";
import Auth from './pages/auth/index'
import ExpenseTracker from "./pages/expense-tracker";

function App() {
  return (
   <div>
    <Routes>
      <Route path="/" exact element={<Auth/>} />
      <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
    </Routes>
   </div>
  );
}

export default App;
