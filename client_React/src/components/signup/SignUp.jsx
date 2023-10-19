import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function SignUp() {
    // יוצר יוז-סטייט לכל אינפוט כדי להוציא את המידע ממנו ואז אצור שרשור של אובייקט עם הנתונים של היוזרים
    const [oneName, setOneName] = useState("");
    const [oneMail, setOneMail] = useState("");
    const [onePhone, setOnePhone] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function ClickRegister() {
        console.log(oneName, oneMail, onePhone, firstPassword, confirmPassword);
        if (oneName === "") {
            alert("Please enter a name")
            return
        }
        if (oneMail === "") {
            alert("Please enter an Email")
            return
        }
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!(oneMail.match(mailformat))) {
            alert("Please enter a valid Email")
            return
        }
        if (onePhone.length != 10) {
            alert("Please enter a valid phone number")
            return
        }
        if (firstPassword.length < 4 || firstPassword.length > 12) {
            alert("Please enter password length between 4 to 12")
            return
        }
        if (firstPassword !== confirmPassword) {
            alert("The Password is not equal")
            return
        }
        // ליצור אובייקט של יוזר חדש מכל הנתונים (4) 
        console.log("go to the server");

        const signUpObject = {
            name: oneName,
            email: oneMail,
            phone: onePhone,
            password: firstPassword
        }
        signupToServer(signUpObject)
    }

    async function signupToServer(signUpObject) {
        try {
            await axios.post("/api/signup", signUpObject)
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>
            <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                <div className="d-flex flex-row mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill signUpIcon" viewBox="0 0 16 16">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    </svg>
                                    <MDBInput value={oneName} onChange={(e) => setOneName(e.target.value)} label='Your Name' id='form1' type='text' className='w-100' />
                                </div>

                                <div className="d-flex flex-row mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill signUpIcon" viewBox="0 0 16 16">
                                        <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z" />
                                        <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                                    </svg>
                                    <MDBInput value={oneMail} onChange={(e) => setOneMail(e.target.value)} label='Your Email' id='form2' type='email' />
                                </div>

                                <div className="d-flex flex-row mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill signUpIcon" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                    <MDBInput value={onePhone} onChange={(e) => setOnePhone(e.target.value)} label='Your Phone' id='form3' type='phone' />
                                </div>

                                <div className="d-flex flex-row mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill signUpIcon" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                    </svg>
                                    <MDBInput value={firstPassword} onChange={(e) => setFirstPassword(e.target.value)} label='Password' id='form4' type='password' />
                                </div>

                                <div className="d-flex flex-row mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill signUpIcon" viewBox="0 0 16 16">
                                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                    </svg>
                                    <MDBInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label='Repeat your password' id='form5' type='password' />
                                </div>

                                <MDBBtn onClick={ClickRegister} className='mb-4' size='lg'>Register</MDBBtn>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                                <MDBCardImage src='https://media.istockphoto.com/id/1295660412/vector/online-sign-up-click-on-the-registration-button-and-lead-conversion-process-hand-pushing-the.jpg?s=612x612&w=0&k=20&c=09-qd5BwDqypZIMjTK_vdn7c4Yxkb7TsRYZ6br8JVc4=' fluid />
                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </div>
    )
}

export default SignUp;