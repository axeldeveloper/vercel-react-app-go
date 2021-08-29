import React, { useState } from "react";
import ProductLists from './ProductLists';
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormFields } from "../lib/HooksLib";
import { useGetProduct } from "../lib/useGetProduct";
import { useCrudGeneric }  from "../lib/useCrudGeneric";

const Product = () => {


  const [title, setTitleModal] = useState("Add");

  const { create, update, destroy } = useCrudGeneric();

  const products = useGetProduct();

  const [show, setShow] = useState(false);

  const [modal, setAlertModal] = useState({
    show: false,
    title: '',
    body: '',
    enableBtnClose: '',
    enableBtnConfirm: '',
    item: {}
  });

  const handleClose = () => setAlertModal({ show: false });

  const [fields, handleFieldChange] = useFormFields({
    id: 0,
    name: "",
    price: "",
    sub_title: "",
    description: "",
    codigo: "",
    codigo_ean: "",
    estabelecimento_id: 1
  });

  const setModalShow = () => {
    setTitleModal("Add Product");
    setShow(true)
  }

  const handleCreate = async () => {
    const payload = (({ id, ...o }) => o)(fields) // remove id;
    setShow(false)
    create(payload, 'products').then((resposnse) => {
      console.log(resposnse);
      alertModal("Customer Created!");
    }).catch(error => {
      alertModal(error.message)
    });
  }

  const handleUpdate = async () => {
    setShow(false);
    update(fields, 'products').then((resposnse) => {
      console.log(resposnse);
      alertModal("Customer Updated!");
    }).catch(error => {
      alertModal(error.message);
    });
  }

  const handleDelete = async (item) => {
    destroy(item,'products').then((resposnse) => {
      console.log(resposnse);
      products.filter(o => o.id !== item.id);
      handleClose();
    }).catch(error => {
      alertModal(error.message);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fields.id === 0)
      await handleCreate()
    else
      await handleUpdate()
  }

  const formEdit = (item) => {
    fields.id = item.id;
    fields.name = item.name;
    fields.price = item.price;
    fields.sub_title = item.sub_title;
    fields.description = item.description;
    fields.codigo = item.codigo;
    fields.codigo_ean = item.codigo_ean;
    fields.comissao = item.comissao;
    fields.estabelecimento_id = 1;

    setTitleModal("Edit Product");
    setShow(true)

  }

  const confirmDel = (item) => {
    openAlertModal({
      title: 'Exclusão',
      body: 'Deseja realmente excluir',
      enableBtnClose: 'block',
      enableBtnConfirm: 'block',
      item: item
    });
  }

  const alertModal = (message) => {
    openAlertModal({
      title: "INFORMATION",
      body: message,
      enableBtnClose: 'block',
      enableBtnConfirm: 'none'
    });
  }

  const openAlertModal = (option) => {
    setAlertModal({
      show: true,
      title: option.title,
      body: option.body,
      enableBtnClose: option.enableBtnClose,
      enableBtnConfirm: option.enableBtnConfirm,
      item: option.item || {}
    });
  }


  return (
    <React.Fragment>
      <Container>
        <Button onClick={() => setModalShow()} variant="primary" style={{ float: 'right', margin: '20px' }}>
          <span className="fa fa-plus"></span>  Add a Produts
        </Button>

        <h1 className="display-4"> List Produts  </h1>

        <div className="flex-large">
          <ProductLists products={products} fntEdit={formEdit} fntDel={confirmDel} />
        </div>

        <Modal
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>

              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={fields.name}
                  onChange={handleFieldChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Enter price"
                  value={fields.price}
                  onChange={handleFieldChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={fields.description}
                  onChange={handleFieldChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="sub_title">
                <Form.Label>Sub Title</Form.Label>
                <Form.Control type="text"
                  name="sub_title"
                  placeholder="Enter sub title"
                  value={fields.sub_title}
                  onChange={handleFieldChange} />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group as={Col} controlId="codigo">
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="text"
                      name="codigo"
                      placeholder="Enter numero"
                      value={fields.codigo}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="codigo_ean">
                    <Form.Label>EAN</Form.Label>
                    <Form.Control type="text"
                      name="codigo_ean"
                      placeholder="Enter ean"
                      value={fields.codigo_ean}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
              </Row>
              <hr />
              <Button variant="primary" type="submit">
                <span className="fa fa-check"></span>  Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={modal.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modal.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
              </Button>
            <Button variant="primary" style={{ display: modal.enableBtnConfirm }}
              onClick={() => handleDelete(modal.item)} >
              Save Changes
              </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </React.Fragment>
  );
}

Product.propTypes = {
  greeting: PropTypes.string
};

export default Product

