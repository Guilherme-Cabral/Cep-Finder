import { useState } from 'react';
import { FiSearch } from 'react-icons/fi'
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handlesearch() {

    var re = /^([\d]{2})\.?([\d]{3})-?([\d]{3})/;

    if (!re.test(input)) return alert("CEP inválido!"); setInput('');
    if (input === '') return alert("digite um cep"); setInput({});

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('')

    } catch (e) {
      alert('erro na aplicação 🥶')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Cep Searcher </h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handlesearch}>
          <FiSearch size={25} color="#000 " />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2> CEP: {cep.cep} </h2>
          <span> {cep.logradouro} </span>
          <span> Complemento: {cep.complemento} </span>
          <span>Bairro: {cep.bairro} </span>
          <span> {cep.localidade} - {cep.uf} </span>
        </main>
      )}


    </div>
  );
}

export default App;
