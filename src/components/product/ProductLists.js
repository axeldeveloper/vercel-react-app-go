import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ProductLists = (props) => { 

    const setValues = (item) =>  props.fntEdit(item)

    const handlerDelete = (item) =>  props.fntDel(item)
    
    return ( 
      <Table  striped bordered hover>
        <thead>
          <tr>   
            <th>Code</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.products.length > 0 ? (
            props.products.map((item) => (
              <tr key={item.id}>
                <td>{item.codigo}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td colSpan="2">
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
              <td colSpan={3}>No Produts</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
}

export default ProductLists