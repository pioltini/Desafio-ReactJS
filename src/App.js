import React,{ useState, useEffect } from "react";
import api from './services/api';
import Header from './components/Header';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
      api.get('repositories').then(response =>{
        setRepositories(response.data);
        
      })
  },[])

  
  async function handleAddRepository() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const response = await api.post('repositories',{
      title: `Repositorio de ${time}`,
      owner: "Bruno",
      techs: [
        "Node.JS",
        "HTML",
        "CSS"
      ]
    })
    const repository = response.data;
    setRepositories([...repositories, repository])
    
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryIndex = repositories.filter( repository => repository.id !==id);
   
    setRepositories(repositoryIndex)  
  }

  return (
    <div>
      <Header title="Repositories"/>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id}>
        
        {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>
      
      <button class="Add" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
