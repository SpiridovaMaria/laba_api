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
      <ShowNavBar/>
        <container class="mx-5">
          <FilterAndSearchBooks/>
        </container>
    </section>
    
  );
}


const ShowNavBar =()=>{
    return (
      <nav class="navbar navbar-light bg-light mb-3" style={{background:'#FFDEAD'}}>
        <div class="container-fluid bg-danger">
          <div class="d-flex align-items-center">
            <img class="mx-2" style={{width:'30px'}}src="https://cdn-icons-png.flaticon.com/512/2702/2702134.png"/>
            <a class="navbar-brand">My bookshop</a>
          </div>
         </div>
     </nav> 
    );
}


function FilterAndSearchBooks(){
  const BASE_URL="https://openlibrary.org/search.json"
  const[books,setBooks]=useState([]);
  useEffect(()=> {
    const fetchData= async()=>{
      const response = await fetch(BASE_URL+"?q=harry%20potter&limit=30");
      const jsonData = await response.json();
      setBooks(jsonData.docs);
    }
    fetchData();
  },[]);
  console.log(books);
    
 //фильтрация    
  const publishers = Array.from(new Set(books.map(function(item){
      if (item.publisher!=null){
        var sortedKeys = Object.keys(item.publisher).sort()
        return item.publisher[sortedKeys[0]];   
      }
  })));
  const[filterTerm,setFilterTerm] = useState('');
  const filterChange=(event)=> {
    setFilterTerm(event.target.value);
  }
  
  //поиск
  const[searchTerm, setSearchTerm] = useState('');
  const[searchPermTerm, setSearchPermTerm] = useState('');
  const handleSearchChange = (event) => {
    setSearchPermTerm(event.target.value);
  }
  const searchChange = (event) => {
    setSearchTerm(searchPermTerm);
  }
    
  //карточки, подходящие по поиску и фильтрации
  const searchCards = books.filter(function(item){
    return filterTerm!="" ? String(item.title).toLowerCase().includes(searchTerm.toLowerCase()) & String(item.publisher).includes(filterTerm): String(item.title).toLowerCase().includes(searchTerm.toLowerCase());
  });
    
  return (
      <div>
        <div class="d-flex justify-content-center mb-5">
            <div class="input-group w-25">
                <input type="search" placeholder="Search for title" class="form-control shadow-none" onChange={handleSearchChange} />
                <button onClick={searchChange} type="button" class="btn btn-danger">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <div class="form-outline mx-3">
              <select class="form-select col-6 shadow-none" aria-label="Choose category" onChange={filterChange}>
                  <option value=''>Choose the publisher</option>
                  <ListCategories list={publishers}/>
               </select>
            </div>
        </div>
        <ShowBookCard list={searchCards}/>
    </div>  
  );
}


const ShowBookCard = (props) =>{
  return(
     <div class="row row-cols-1 row-cols-lg-2 h-75 d-flex justify-content-between mx-5">
      { props.list.map(function(item){
        return <div class="card p-0 mb-3 mx-1" style={{maxWidth: "530px"}}>
        <div class="row g-0 w-100">
          <img src={"https://covers.openlibrary.org/b/id/"+item.cover_i+'.jpg'} class="object-fit-fill h-md-125 col-md-4 ps-0 img-fluid rounded-start" alt="Picture is not available"/>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">'{item.title}'</h5>
              <p class="card-text">Author: {item.author_name}</p>
              <p class="card-text">Publication Year: {item.first_publish_year}</p>
              <a class="btn btn-danger" href={'https://openlibrary.org/'+item.key}>Read more</a>
            </div>
          </div>
        </div>
       </div>
      })}
      </div>
  );
}


const ListCategories = (props) => {
  return( <>
    {props.list.map(function(item){
      return <option>{item}</option>
    })}
  </>);
}


// список категорий
export default App;
