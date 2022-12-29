import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
	const navigate = useNavigate();

	const { id } = useParams()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [avatar, setAvatar] = useState(null)
	const [validationError,setValidationError] = useState({})

	// useEffect(()=>{
	// 	fetchUser()
	// })

	useEffect(() => {
		fetchUser()
	}, [])

	const fetchUser = async () => {
		await axios.get(`http://localhost:8080/api/user/${id}`).then(({data})=>{
			const { firstName, lastName, phoneNumber } = data.user
			setFirstName(firstName)
			setLastName(lastName)
			setPhoneNumber(phoneNumber)
		}).catch(({response:{data}})=>{
			Swal.fire({
				text:data.message,
				icon:"error"
			})
		})
	}

  	const changeHandler = (event) => {
		setAvatar(event.target.files[0]);
	};

	const updateUser = async (e) => {
		e.preventDefault();

		const formData = new FormData()
		formData.append('firstName', firstName)
		formData.append('lastName', lastName)
		formData.append('phoneNumber', phoneNumber)
		formData.append('id', id)

		if(avatar!==null){
			formData.append('avatar', avatar)
			console.log(avatar);
		}

		await axios.post(`http://localhost:8080/api/update-user`, formData).then(({data})=>{
			
			Swal.fire({
				icon:"success",
				text:data.message
			})

			navigate("/")

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
              <h4 className="card-title">Update User</h4>
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
                <Form onSubmit={updateUser}>
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
                        <Form.Group controlId="phoneNumber">
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
                    Update
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