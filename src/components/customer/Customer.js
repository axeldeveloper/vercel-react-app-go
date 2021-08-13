import React, { useState, useEffect } from "react";
import CustomerLists from './CustomerLists';
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormFields, getOptions } from "../lib/HooksLib";

const Customer = () => {

  const API_URL = "http://barber-cg.herokuapp.com/api/v1/customers"
  const [title, setTitleModal] = useState("Add");
  const [customers, setCustomers] = useState([]);
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
    nome: "",
    cpf: "",
    nascimento: "",
    celular: "",
    endereco: "",
    bairro: "",
    numero: "",
    cep: "",
    email: "",
    estabelecimento_id: 1,
    user_id: 1
  });

  useEffect(() => { loadData() }, []);

  const setModalShow = () => {
    setTitleModal("Add Customer");
    setShow(true)
  }

  const cancelSubmit = () => {
    //fields.id = 0;
    fields.nome = "";
    fields.cpf = "";
    fields.nascimento = "";
    fields.celular = "";
    fields.endereco = "";
    fields.bairro = "";
    fields.numero = "";
    fields.cep = "";
    fields.email = "";
    //fields.estabelecimento_id = 0;
    //fields.user_id = 0;
    setTitleModal("");
    setShow(false)
  }

  const getURL = (id) => {
    if (id)
      return `${API_URL}/${id}`;
    return `${API_URL}`;
  }

  const loadData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setCustomers(data);
  }
  

  const handleCreate = async () => {
    const payload = (({ id, ...o }) => o)(fields) // remove id;
    const requestOptions = getOptions(payload, 'POST');
    setShow(false)
    persite(API_URL, requestOptions)
      .then((data) => {
        alertModal("Customer Created!");
        loadData();
      }).catch(error => {
        alertModal(error.message)
      });
  }

  const handleUpdate = async () => {
    const payload = fields;
    const requestOptions = getOptions(payload, 'PUT');
    let url = getURL(payload.id);
    setShow(false);
    persite(url, requestOptions).then((data) => {
      alertModal("Customer Updated!");
    }).catch(error => {
      alertModal(error.message);
    });
  }

  const handleDelete = async (item) => {
    const requestOptions = getOptions({}, 'DELETE');
    let url = getURL(item.id)
    persite(url, requestOptions).then((data) => {
      const items = customers.filter(o => o.id !== item.id);
      setCustomers(items);
      handleClose();
    }).catch(error => {
      alertModal(error.message);
    });
  }

  const persite = async (url, options) => {
    const response = await fetch(url, options);
    return await processResponse(response);
  }

  const processResponse = async (response) => {
    if (response.ok) { return response.json(); }
    else {

      if (response.status === 404) return "Not found";
      if (response.status === 422) return "Unprocessable Entity";
      if (response.status === 401) return "Unauthorized";
      if (response.status === 403) return "Forbidden";  
      if (response.status === 500) return "server error, try again" ;

      return response.json().then((data) => {
        let error = new Error(response.status);
        error.message = data.error || data.message;
        error.response = response;
        error.status = response.status;
        throw error;
      });
    }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (fields.id == 0)
      await handleCreate()
    else
      await handleUpdate()
  }

  const formEdit = (item) => {
    fields.id = item.id;
    fields.nome = item.nome;
    fields.cpf = item.cpf;
    fields.nascimento = item.nascimento;
    fields.celular = item.celular;
    fields.endereco = item.endereco;
    fields.bairro = item.bairro;
    fields.numero = item.numero;
    fields.cep = item.cep;
    fields.email = item.email;
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
          <span className="fa fa-plus"></span>  Add a Customer
        </Button>

        <h1 className="display-4"> List Customer  </h1>

        <div className="flex-large">
          <CustomerLists customers={customers} ftn={formEdit} fntDel={confirmDel} />
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
              <Form.Row>
                <Form.Group as={Col} controlId="nome">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text"
                    name="nome"
                    placeholder="Enter Name"
                    value={fields.nome}
                    onChange={handleFieldChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="cpf">
                  <Form.Label>CPF</Form.Label>
                  <Form.Control
                    type="text"
                    name="cpf"
                    placeholder="Enter price"
                    value={fields.cpf}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="nascimento">
                  <Form.Label>Nascimento</Form.Label>
                  <Form.Control type="text"
                    name="nascimento"
                    placeholder="Enter nascimento"
                    value={fields.nascimento}
                    onChange={handleFieldChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="celular">
                  <Form.Label>Celular</Form.Label>
                  <Form.Control
                    type="text"
                    name="celular"
                    placeholder="Enter celular"
                    value={fields.celular}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="endereco">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco"
                    placeholder="Enter endereco"
                    value={fields.endereco}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="bairro">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control
                    type="text"
                    name="bairro"
                    placeholder="Enter bairro"
                    value={fields.bairro}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="numero">
                  <Form.Label>Número</Form.Label>
                  <Form.Control type="text"
                    name="numero"
                    placeholder="Enter numero"
                    value={fields.numero}
                    onChange={handleFieldChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="cep">
                  <Form.Label>Cep</Form.Label>
                  <Form.Control type="text"
                    name="cep"
                    placeholder="Enter cep"
                    value={fields.cep}
                    onChange={handleFieldChange} />
                </Form.Group>
              </Form.Row>

              <Form.Row>           
              <Form.Group as={Col} controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="text"
                  name="email"
                  placeholder="Enter email"
                  value={fields.email}
                  onChange={handleFieldChange} />
              </Form.Group>
              </Form.Row>
              <hr />
              <Button variant="primary mr-2" type="submit">
                <span className="fa fa-check"></span> Save
              </Button>
              <Button onClick={()=> cancelSubmit()} variant="primary mr-2" type="reset">
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

Customer.propTypes = {
  greeting: PropTypes.string
};
export default Customer
