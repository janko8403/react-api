import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [avatar, setAvatar] = useState()
	const [validationError,setValidationError] = useState({})

	const changeHandler = (event) => {
		setAvatar(event.target.files[0]);
	};


  	const createUser = async (e) => {
    	e.preventDefault();
		
		const formData = new FormData()
		formData.append('firstName', firstName)
		formData.append('lastName', lastName)
		formData.append('email', email)
		formData.append('phoneNumber', phoneNumber)
		formData.append('avatar', avatar)

		await axios.post(`http://localhost:8080/api/create-user`, formData).then(({data})=>{
			
			Swal.fire({
				icon: 'success',
				text:data.message
			})

			navigate('/')

		}).catch(({response})=>{
			
			if(response.status === 422) {
				  setValidationError(response.data.errors)
			} else {
				
				Swal.fire({
					text:response.data.message,
					icon:"error"
				})
			}
		})
	}

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create User</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createUser}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="firstName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={(event)=>{
                              setFirstName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="lastName">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={(event)=>{
                              setLastName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(event)=>{
                              setEmail(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" value={phoneNumber} onChange={(event)=>{
                              setPhoneNumber(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Avatar" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="file" onChange={changeHandler} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}