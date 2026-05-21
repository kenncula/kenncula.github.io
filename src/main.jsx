import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Layout from './components/Layout';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import './cursorClickSpark';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="resume.pdf" element={<Resume />} />
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);