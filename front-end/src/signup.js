import React, {useState, useEffect} from 'react';
import { useAlert } from 'react-alert'
import Form from 'react-bootstrap/Form';





function Signup() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [streetaddress, setStreetaddress] = useState('');
    const [username, setUsername] = useState('');
    const [zipcode, setZipcode] = useState('');

    const alert = useAlert()

    function handleZip(text){
      const numericValue = text.replace(/[^0-9]/g, ""); 
      const decimalCount = numericValue.split('.').length - 1;
      if (decimalCount !== 1) {
        setZipcode(numericValue);
      } else {
        // Alert the user about invalid input
        alert.show('Invalid Input', 'Please enter a valid numeric value.');
      } 
      };


    const formData = new FormData();
    const zipcodeData = handleZip(zipcode);
    const zipcodeInt = parseInt(zipcodeData);

    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("passwd", password);
    formData.append("streetaddress", streetaddress);
    formData.append("username", username);
    formData.append("zipcode", zipcodeInt);

    try{
        const posting = fetch('https://shoe-st-4581e5bc88b0.herokuapp.com/signup', {
        method: 'POST',
          headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

        console.log('Upload successful');
    
        setFirstname('');
        setLastname('');
        setEmail('');
        setZipcode('');
        setPassword('');
        setUsername('');
        setStreetaddress('');

            //navigation.goBack();
    
          }catch(error){
              console.error("Error occured at posting data: ",error);
            }
    return(
      <div>
        <h1>Sign Up</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Please enter your first name" />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Please enter your last name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Please enter your user name" />
          <Form.Text className="text-muted">
          Make Sure you that no part of your name is in it and that you use one special character.
          </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStreetAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Please enter your street address" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formZipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control type="integer"/>
          </Form.Group>
          
          <button variant="primary" type="submit">
            Submit
          </button>

        </Form> 
      </div>

    );
};
export default Signup;