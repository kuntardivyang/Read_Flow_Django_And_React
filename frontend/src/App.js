// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './User/components/Signup';
import Login from './User/components/Login';
import Home from './Home/pages/Home';
import BookDeatil from './Books/pages/BookDetail';
import FictionDetail from './Books/components/FictionDetail';
import SearchResult from './Home/components/SearchList';
import UserProfile from './User/components/UserProfile';
import Wishlist from './Books/pages/Wishlist';
import Buylist from './Home/pages/Buy';
import WishlistPage from './Home/pages/Buy';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/:bookId" element={<BookDeatil />} />
        <Route path="/fiction" element={<FictionDetail />} />
        <Route path="/search/:bookName" element={<SearchResult />} />
        {/* <Route path='/search/' element={<Home />}/> */}
        <Route exact path="/user" element={<UserProfile/>} />
        <Route exact path="/wishlist" element={<WishlistPage/>} />
        <Route exact path="/buylist" element={<Buylist/>} />



      </Routes>
    </Router>
  );
}

export default App;

































// import './App.css';
// import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';


// axios.defaults.xsrfCookieName = 'csrftoken';
// axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// axios.defaults.withCredentials = true;

// const client = axios.create({
//   baseURL: "https://manushi1224.pythonanywhere.com",
//   headers: {
//     "Access-Control-Allow-Origin": "*", // Allow any origin
//     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
//   },
// });

// function App() {

//   const [currentUser, setCurrentUser] = useState();
//   const [registrationToggle, setRegistrationToggle] = useState(false);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     client.get("/api/user/")
//     .then(function(res) {
//       console.log('hello')
//       setCurrentUser(true);
//     })
//     .catch(function(error) {
//       setCurrentUser(false);
//     });
//   }, []);

//   function update_form_btn() {
//     if (registrationToggle) {
//       document.getElementById("form_btn").innerHTML = "Register";
//       setRegistrationToggle(false);
//     } else {
//       document.getElementById("form_btn").innerHTML = "Log in";
//       setRegistrationToggle(true);
//     }
//   }

//   function submitRegistration(e) {
//     e.preventDefault();
//     client.post(
//       "/api/register/",
//       {
//         email: email,
//         username: username,
//         password: password
//       }
//     ).then(function(res) {
//       client.post(
//         "/api/login/",
//         {
//           email: email,
//           password: password
//         }
//       ).then(function(res) {
//         setCurrentUser(true);
//       });
//     });
//   }

//   function submitLogin(e) {
//     e.preventDefault();
//     client.post(
//       "/api/login/",
//       {
//         email: email,
//         password: password
//       }
//     ).then(function(res) {
//       setCurrentUser(true);
//     });
//   }

//   function submitLogout(e) {
//     e.preventDefault();
//     client.post(
//       "/api/logout/",
//       {withCredentials: true}
//     ).then(function(res) {
//       setCurrentUser(false);
//     });
//   }

//   if (currentUser) {
//     return (
//       <div>
//         <Navbar bg="dark" variant="dark">
//           <Container>
//             <Navbar.Brand>Authentication App</Navbar.Brand>
//             <Navbar.Toggle />
//             <Navbar.Collapse className="justify-content-end">
//               <Navbar.Text>
//                 <form onSubmit={e => submitLogout(e)}>
//                   <Button type="submit" variant="light">Log out</Button>
//                 </form>
//               </Navbar.Text>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//           <div className="center">
//             <h2>You're logged in!</h2>
//           </div>
//         </div>
//     );
//   }
//   return (
//     <div>
//     <Navbar bg="dark" variant="dark">
//       <Container>
//         <Navbar.Brand>Authentication App</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Navbar.Text>
//             <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
//           </Navbar.Text>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     {
//       registrationToggle ? (
//         <div className="center">
//           <Form onSubmit={e => submitRegistration(e)}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>        
//       ) : (
//         <div className="center">
//           <Form onSubmit={e => submitLogin(e)}>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Submit
//             </Button>
//           </Form>
//         </div>
//       )
//     }
//     </div>
//   );
// }

// export default App;

//   // {/* <div>
//   //   <h1>Sign Up</h1>
//   //   <form onSubmit={handleSignup}>
//   //     <input
//   //       type="text"
//   //       placeholder="Username"
//   //       value={username}
//   //       onChange={(e) => setUsername(e.target.value)}
//   //     />
//   //     <input type="submit" />
//   //     </form>
//   //   </div> */}
//     // const [username, setUsername] = useState('');
//     // const handleSignup = async (e) => {
//     //   e.preventDefault();
//     //   try {
//     //     await axios.post('http://localhost:5000/signup', {
//     //       username
//     //     });
//     //     alert('User signed up successfully.');
//     //     setUsername('');
//     //   } catch (error) {
//     //     console.error('Error signing up:', error);
//     //     alert('An error occurred.');
//     //   }
//     // }