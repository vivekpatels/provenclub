import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import Axios from 'axios'

 function App() {

  const [data, setData] = useState([]);
  const [bookid, setBookId] = useState('')
  const [memberId, setMemberId] = useState('')

  const getData = async () => {
    const response = await Axios.post("http://localhost:4000/api/getAllBooks");
    setData(response.data);
  }

  useEffect(() => {
    getData();
  }, [])

 async function handleCheckout(){
    const response = await Axios.post("http://localhost:4000/api/checkoutBook", {
      body : {
        memberId:memberId,
        bookId: bookid
      }
    });
   
    console.log(response.message);

  }
 
  return (
    <div>
   

      <p>List of Available Books</p>
      {data.map((item) => {
        return (
          <div>{item.BookName} : {item.NumberOfCopies}</div>
        )
      })}

<p>Enter Your MemberID</p>
      <input placeholder='Enter Your Member ID' onChange={(e) => {
          setMemberId(e.target.value)
      }} />
        <input placeholder='Enter Your Book ID' onChange={(e) => {
          setBookId(e.target.value)
      }} />
      <button onClick={handleCheckout}>Submit</button>
    </div>
  );
}

export default App;
