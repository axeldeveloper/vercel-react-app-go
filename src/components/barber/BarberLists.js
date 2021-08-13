import React from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
  
  
const BarberLists = (props) => { 
  
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
            {props.barbers.length > 0 ? (
              props.barbers.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.cpf}</td>
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
                <td colSpan={3}>No barbers</td>
              </tr>
            )}
          </tbody>
        </Table>
      )
  }
  
export default BarberLists