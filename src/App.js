import logo from './logo.svg';
import './App.css';
import Data from "./fetchData"


function App() {
  return (
  <div>
    <header>
      <h1>Bem vindo aos Dados dos usuarios</h1>
        <img src="https://stratlab.com.br/wp-content/uploads/2021/08/businessman-hand-create-artificial-intelligence-for-technology-and-picture-id1221155808_www.jpg" alt='usuario'></img>
    </header>

<main>
<h2>aqui tera os dados pessoas dos usuarios:</h2>
<Data/>
</main>

<footer>Dados dos usuarios de 2024</footer>

  </div>
  
  
    
  );
}

export default App;
