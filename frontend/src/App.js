import './App.css';
import Layout from './Layouts/Layout';
import AdminDashboard from './pages/AdminDashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/admin/view/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
