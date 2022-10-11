import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import Novoprojeto from './components/pages/Novoprojeto';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Projetos from './components/pages/Projetos';
import Projeto from './components/pages/Projeto';



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
              <Route  path="/Projeto/:id" element={<Projeto/>}/>
            </Routes>
          </Container>
        
      
          <Footer />
    </Router>
    
    </>
  );
}

export default App;
