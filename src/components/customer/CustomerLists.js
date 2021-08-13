import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'


const CustomerLists = (props) => { 

    const setValues = (item) =>  props.ftn(item)
    
    const handlerDelete = (item) =>  props.fntDel(item)
    
    return ( 
      <Table  striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>CPF</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.customers.length > 0 ? (
            props.customers.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.cnpj_cpf}</td>
                <td className = "danger" colSpan="2">
                  <Button variant="primary mr-2" onClick={() => setValues(item)}>
                    <span className="fa fa-edit"></span>
                  </Button>
                  
                  <Button variant="danger mr-2" onClick={() => handlerDelete(item)}>
                    <span className="fa fa-trash"></span>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No Customers</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
}

export default CustomerLists