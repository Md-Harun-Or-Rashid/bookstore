import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
function AddTodo(props){
    const [open, setOpen] = React.useState(false);
    const [newbook, setNewbook] = React.useState({title:'', author:'', year:'', isbn:'', price:''});

    const handleOpen = () => {
      setOpen(true);
    }
  
    const handleClose = () => {
      setOpen(false);
    }
    const inputChanged=(event)=>{
        setNewbook({...newbook,[event.target.name]:event.target.value});
    }
    const handleSave = () => {
        props.addnewbook(newbook);
        handleClose();
      }
      
return (
<div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add New Book
      </Button>
      <Dialog open={open}>
        <DialogTitle>New Book</DialogTitle>
        <DialogContent>
        <TextField
            name="title"
            value={newbook.title}
            onChange={inputChanged}
            margin="dense"
            label="Title"
            fullWidth
          />
           <TextField
            name="author"
            value={newbook.author}
            onChange={inputChanged}
            margin="dense"
            label="Author"
            fullWidth
          />
           <TextField
            name="year"
            value={newbook.year}
            onChange={inputChanged}
            margin="dense"
            label="Year"
            fullWidth
          />
           <TextField
            name="isbn"
            value={newbook.isbn}
            onChange={inputChanged}
            margin="dense"
            label="Isbn"
            fullWidth
          />
           <TextField
            name="price"
            value={newbook.price}
            onChange={inputChanged}
            margin="dense"
            label="Price"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>
        </DialogActions>
       </Dialog> 
</div>
)
}
export default AddTodo;