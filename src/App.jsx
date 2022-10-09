import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import Novoprojeto from './components/pages/Novoprojeto';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projetos from './components/pages/Projetos';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      
        
          <Container customClass="min-heigth">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route  path="/Contato" element={<Contato/>}/>
              <Route  path="/Empresa" element={<Empresa/>}/>
              <Route  path="/Novoprojeto" element={<Novoprojeto/>}/>
              <Route  path="/Projetos" element={<Projetos/>}/>
            </Routes>
          </Container>
        
      
          <Footer />
    </Router>
    
    </>
  );
}

export default App;
