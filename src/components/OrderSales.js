import React from "react"
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
class OrderSales extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Container >
        <Button variant="secondary" style={{ float: 'right', margin: '20px' }}>Add a Employee</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Employee Email</th>
              <th>Employee Mobile</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>sjlouji10@gmail.com</td>
              <td>932104</td>
              <td><Button>Update</Button> <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>sjlouji@gmail.com</td>
              <td>2345</td>
              <td><Button>Update</Button> <Button variant="danger">Delete</Button></td>
            </tr>
          </tbody>
        </Table>
        </Container>

        
      </React.Fragment>
    );
  }
}

export default OrderSales
