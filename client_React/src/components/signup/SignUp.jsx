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

function SignUp() {
    // יוצר יוז-סטייט לכל אינפוט כדי להוציא את המידע ממנו ואז אצור שרשור של אובייקט עם הנתונים של היוזרים
    const [oneName, setOneName] = useState("");
    const [oneMail, setOneMail] = useState("");
    const [onePhone, setOnePhone] = useState("");
    const [firstPassword, setFirstPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
            const result = await axios.post("http://localhost:4000/signup", signUpObject)
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

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg' />
                                    <MDBInput value={oneName} onChange={(e) => setOneName(e.target.value)} label='Your Name' id='form1' type='text' className='w-100' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput value={oneMail} onChange={(e) => setOneMail(e.target.value)} label='Your Email' id='form2' type='email' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg' />
                                    <MDBInput value={onePhone} onChange={(e) => setOnePhone(e.target.value)} label='Your Phone' id='form3' type='phone' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="lock me-3" size='lg' />
                                    <MDBInput value={firstPassword} onChange={(e) => setFirstPassword(e.target.value)} label='Password' id='form4' type='password' />
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="key me-3" size='lg' />
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