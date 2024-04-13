import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function App() {
  return (
    <section>
      <nav class="navbar navbar-light bg-light mb-3" style={{background:'#FFDEAD'}}>
        <div class="container-fluid bg-danger">
          <div class="d-flex align-items-center">
            <img class="mx-2" style={{width:'30px'}}src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png"/>
            <a class="navbar-brand">My bookshop</a>
          </div>
            <Dropdown class="my-2">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="">Art</Dropdown.Item>
                <Dropdown.Item href="">Biography</Dropdown.Item>
                <Dropdown.Item href="">Children</Dropdown.Item>
                <Dropdown.Item href="">Fantasy</Dropdown.Item>
                <Dropdown.Item href="">History</Dropdown.Item>
                <Dropdown.Item href="">Medicine</Dropdown.Item>
                <Dropdown.Item href="">Music</Dropdown.Item>
                <Dropdown.Item href="">Mystery and Detectives</Dropdown.Item>
                <Dropdown.Item href="">Plays</Dropdown.Item>
                <Dropdown.Item href="">Recipes</Dropdown.Item>
                <Dropdown.Item href="">Religion</Dropdown.Item>
                <Dropdown.Item href="">Romance</Dropdown.Item>
                <Dropdown.Item href="">Science Fiction</Dropdown.Item>
                <Dropdown.Item href="">Textbooks</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
  </div>
</nav>
      
    <container class="mx-5">
      <ListBooks/>
    </container>
    </section>
    
  );
}
function ListBooks(){
  const BASE_URL="https://openlibrary.org/search.json"
  const[books,setBooks]=useState([]);
  useEffect(()=> {
    const fetchData= async()=>{
      const response = await fetch(BASE_URL+"?q=subject=romance");
      const jsonData = await response.json();
      console.log(jsonData);
      setBooks(jsonData.docs);
      console.log(jsonData)
    }
    fetchData();
  },[]);
  console.log(books)
  return (
    <div class="row row-cols-1 row-cols-lg-2 h-75 d-flex justify-content-between mx-5">
      { books.map(function(item){
        return <div class="card p-0 mb-3 mx-1" style={{maxWidth: "530px"}}>
        <div class="row g-0 w-100">
          <img src={"https://covers.openlibrary.org/b/id/"+item.cover_i+'.jpg'} class="col-4 h-100 ps-0 img-fluid rounded-start" alt="Picture is not available"/>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">'{item.title}'</h5>
              <p class="card-text">Author: {item.author_name}</p>
              <p class="card-text">Publication Year: {item.first_publish_year}</p>
              <a class="btn btn-primary" href={'https://openlibrary.org/'+item.key}>Read more</a>
            </div>
          </div>
        </div>
       </div>
      })}
      </div>
  );
}

export default App;
