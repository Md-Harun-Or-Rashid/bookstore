import React, { useState, useEffect } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddTodo from './AddTodo';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('https://mybookstore-645bc-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
    
  }
 
  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setTodos(valueKeys);
  } 

  const addnewbook = (newTodo) => {
    fetch('https://mybookstore-645bc-default-rtdb.europe-west1.firebasedatabase.app/books/.json',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }
 const deleteTodo = (id) => {
    fetch(`https://mybookstore-645bc-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
   {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }
  return (
    <div className="App">
    <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" noWrap >
           Welcome To My Book Store
          </Typography>
        </Toolbar>
      </AppBar>
      <AddTodo addnewbook={addnewbook} />
      <div className="ag-theme-material" style={ { height: 400 , width: 1100, marginTop: '10px', marginLeft:'50px'}}>
      <AgGridReact rowData={todos}>
        <AgGridColumn sortable={true} filter={true} field='author'/>
        <AgGridColumn sortable={true} filter={true} field='isbn'/>
        <AgGridColumn sortable={true} filter={true} field='price'/>
        <AgGridColumn sortable={true} filter={true} field='title'/>
        <AgGridColumn sortable={true} filter={true} field='year'/>
        <AgGridColumn 
            headerName=''
            field='id' 
            width={90}
            cellRendererFramework={ params => 
              <IconButton onClick={() => deleteTodo(params.value)} size="small" color="secondary">
                <DeleteIcon />
              </IconButton>
            }
          />      
      </AgGridReact>
      </div>
      
    </div>
  );
}

export default App;

