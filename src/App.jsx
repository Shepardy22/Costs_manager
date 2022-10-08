import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';

import Home from './components/pages/Home';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import Novoprojeto from './components/pages/Novoprojeto';
import Container from './components/layout/Container';



function App() {
  return (
    <>
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/Contato">Contato</Link>
        <Link to="/Empresa">Empresa</Link>
        <Link to="/Novoprojeto">Novo Projeto</Link>
      </div>
      
        
          <Container customClass="min-heigth">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route  path="/Contato" element={<Contato/>}/>
              <Route  path="/Empresa" element={<Empresa/>}/>
              <Route  path="/Novoprojeto" element={<Novoprojeto/>}/>
            </Routes>
          </Container>
        
      
          <p>Footer</p>
    </Router>
    
    </>
  );
}

export default App;
