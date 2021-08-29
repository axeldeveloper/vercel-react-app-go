import React, { useState } from "react";
import CompanyLists from './CompanyLists';
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { useFormFields, getOptions } from "../lib/HooksLib";
import { API_CUSTOMERS } from '../lib/AppConstants';

import { useGetCompany } from "../lib/useGetCompany";

import  {useCrudCompany}  from "../lib/useCrudCompany";

import Api from '../lib/Api';

const Company = () => {
  const [title, setTitleModal] = useState("Add");
  const customers = useGetCompany();

  const { create, update, destroy } = useCrudCompany();

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
    cnae: "",
    cnpj: "", 
    ie: "",
    im: "",
    tax_regime: "",
    user_id: 1,
    estabelecimento_id: 1
  });

  const setModalShow = () => {
    setTitleModal("Add Customer");
    setShow(true)
  }

  const cancelSubmit = () => {
    fields.name = "";
    fields.cnae = "";
    fields.cnpj= "";
    fields.ie = "";
    fields.im = "";
    fields.tax_regime = "";
    fields.user_id = 1;
    fields.estabelecimento_id = 1;
    setTitleModal("");
    setShow(false)
  }

  const handleCreate = async () => {
    const payload = (({ id, ...o }) => o)(fields) // remove id;
    setShow(false)
    create(payload).then((resposnse) => {
      console.log(resposnse);
      alertModal("Customer Created!");
    }).catch(error => {
      alertModal(error.message)
    });
  }

  const handleUpdate = async () => {
    setShow(false);
    update(fields).then((resposnse) => {
      console.log(resposnse);
      alertModal("Customer Updated!");
    }).catch(error => {
      alertModal(error.message);
    });
  }

  const handleDelete = async (item) => {
    destroy(item).then((resposnse) => {
      console.log(resposnse);
      customers.filter(o => o.id !== item.id);
      //setCustomers(items);
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
    fields.cnpj = item.cnpj;
    fields.cnae = item.cnae;
    fields.ie = item.ie;
    fields.im = item.im;
    fields.tax_regime = item.tax_regime;
    fields.estabelecimento_id = 1;
    fields.user_id = 1;
    setTitleModal("Edit Customer");
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
          <span className="fa fa-plus"></span>  Add company
        </Button>

        <h1 className="display-4"> List Companies  </h1>

        <div className="flex-large">
          <CompanyLists customers={customers} ftn={formEdit} fntDel={confirmDel} />
        </div>

        <Modal
          size="lg"
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id="formCustomer" onSubmit={handleSubmit}>

              <Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={fields.name}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Row>


              <Row>
                <Col>
                  <Form.Group as={Col} controlId="cnpj">
                    <Form.Label>CNPJ</Form.Label>
                    <Form.Control
                      type="text"
                      name="cnpj_cpf"
                      placeholder="Enter cnpj/cpf"
                      value={fields.cnpj}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="cnae">
                    <Form.Label>CNAE</Form.Label>
                    <Form.Control
                      type="text"
                      name="cnae"
                      placeholder="Enter cnae"
                      value={fields.cnae}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group as={Col} controlId="ie">
                    <Form.Label>IE</Form.Label>
                    <Form.Control type="text"
                      name="ie"
                      placeholder="Enter ie/rg"
                      value={fields.ie}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Col} controlId="im">
                    <Form.Label>IM</Form.Label>
                    <Form.Control type="text"
                      name="im"
                      placeholder="Enter im"
                      value={fields.im}
                      onChange={handleFieldChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Row>
                <Form.Group as={Col} controlId="tax_regime">
                  <Form.Label>Regime</Form.Label>
                  <Form.Control
                    type="text"
                    name="tax_regime"
                    placeholder="Enter regime"
                    value={fields.tax_regime}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>         
              <hr />
              <Button variant="primary mr-2" type="submit">
                <span className="fa fa-check"></span> Save
              </Button>
              <Button onClick={() => cancelSubmit()} variant="primary mr-2" type="reset">
                <span className="fa fa-reset"></span> Cancel
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
  )

}

Company.propTypes = {
  greeting: PropTypes.string
};
export default Company
