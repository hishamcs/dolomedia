
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {listUsers} from '../acitons/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Row, Table,Col,Container} from 'react-bootstrap'
import { blockUser } from '../acitons/userActions'
import Swal from 'sweetalert2'
import { Form } from 'react-bootstrap'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'



function UserListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state=>state.userList)
    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const {loading, error, users} = userList
    const userBlock = useSelector(state=>state.userBlock)
    const [searchUser, setSearchUser] = useState('')
    const {success:successBlock, message:blockMessage} = userBlock
    const actStatus = (user) => {
        
        let text = user.is_active ? 'block': 'unblock';
    
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${text} this user!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(blockUser(user.id))
            }
          });
    }
    useEffect(()=> {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())

            if(blockMessage !== undefined) {
                const {message, title} = blockMessage
                Swal.fire({
                    title: title,
                    text: message,
                    icon: "success",
                    showConfirmButton:false,
                    timer:2000
                })
            }
        } else {
            navigate('/')
        }
                
    }, [dispatch, successBlock,blockMessage,userInfo,navigate])


    const filteredUsers = users?.filter((user) =>
        user.name.toLowerCase().includes(searchUser.toLowerCase())
    )

    return(
        <>
        <Header />
        <Container>
            <Row className='py-3'>
                <Col>
                <h5 className='py-3'>User List</h5>
                </Col>
                <Col md={4}>
                
                    <Form.Control
                    type="search"
                    placeholder="Search User"
                    className="me-2"
                    aria-label="Search"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    />
                    
                
                </Col>
            </Row>
            {
                loading ? <Loader />
                        : error ? (<Message variant='danger'>{error}</Message>)
                                : (
                                    <Table striped bordered hover responsive className='text-center'>
                                        <thead>
                                            <tr>
                                                <th>SL.NO</th>
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th></th>
                                            </tr>

                                        </thead>

                                        <tbody>
                                          {filteredUsers?.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index+1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                   {
                                                        user.is_active ? <Button size='sm' onClick={()=>actStatus(user)}>Block</Button>
                                                                       :<Button variant='danger'size='sm'onClick={() => actStatus(user)}>Unblock</Button>
                                                   }
                                                </td>
                                            </tr>
                                          ))}  
                                        </tbody>
                                    </Table>
                                )
            }
        </Container>
        </>
    )
}

export default UserListScreen