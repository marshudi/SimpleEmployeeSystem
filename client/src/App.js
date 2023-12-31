import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Home from './Components/Home';
import Display from './Components/Display';
import Register from './Components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className='container-fluid'>
        {/* Navbar */}
        <div className='row'>
          <Nav />
        </div>

        {/* Content */}
        <main className='row mt-4 mb-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Display" element={<Display />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className='fixed-bottom'>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
