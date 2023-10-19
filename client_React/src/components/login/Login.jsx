import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link , useNavigate} from "react-router-dom" // אופציה ב למעבר למוצרים useNavigate
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import axios from "axios";


function Login() {
  const [mailLogin, setMailLogin] = useState("");
  const [mailPassword, setMailPassword] = useState("");

  const navigate = useNavigate() // אופציה ב למעבר למוצרים

  async function clickLogin() {
    const loginObject = {
      email: mailLogin,
      password: mailPassword
    }
    try {
      const result = await axios.post("/api/login", loginObject)
      console.log(result.data);
      if (result.data === "Couldn't find user") {
        alert("Couldn't find user")
      }
      else {
        const checkBox = document.getElementById("flexCheckDefault");
        if (checkBox.checked) {
          localStorage.setItem('user', JSON.stringify(result.data));
        }
        // window.location.href = "/searchProducts"; // מעבר למוצרים אופציה א
        navigate("/products") // אופציה ב למעבר למוצרים - יתרון לא מרענן את הדף שימוש של ריאקט
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <div>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1>Login</h1>

      <MDBInput value={mailLogin} onChange={(e) => setMailLogin(e.target.value)}
        wrapperClass='mb-4' label='Email address' id='form1' type='email' />
      <MDBInput value={mailPassword} onChange={(e) => setMailPassword(e.target.value)}
        wrapperClass='mb-4' label='Password' id='form2' type='password' />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      </div>
      <Button variant="primary" onClick={clickLogin} className="mb-4">Sign in</Button>

      <div className="text-center">
        <p>Not a member? <Link to="/signUp">Register</Link></p>
      </div>

    </MDBContainer>
    
    </div>
  )
}

export default Login;