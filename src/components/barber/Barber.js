import React, { useState, useEffect } from "react";
import BarberLists from './BarberLists';
import PropTypes from "prop-types"
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useFormFields, getOptions } from "../lib/HooksLib";

import { API_BARBERS } from '../lib/AppConstants';

const Barber = () => {
    
    const [title, setTitleModal] = useState("Add");
    const [barbers, setBarbers] = useState([]);
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
        setTitleModal("Add Barbers");
        setShow(true)
    }

    const getURL = (id) => {
        if (id)
            return `${API_BARBERS}/${id}`;
        return `${API_BARBERS}`;
    }

    const loadData = async () => {
        const response = await fetch(API_BARBERS);
        const data = await response.json();
        setBarbers(data);
    }

    const handleCreate = async () => {
        const payload = (({ id, ...o }) => o)(fields) // remove id;
        const requestOptions = getOptions(payload, 'POST');
        setShow(false)
        persite(API_BARBERS, requestOptions)
            .then((data) => {
                alertModal("Barbers Created!")
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
            alertModal("Barbers Updated!");
        }).catch(error => {
            alertModal(error.message);
        });
    }

    const handleDelete = async (item) => {
        const requestOptions = getOptions({}, 'DELETE');
        let url = getURL(item.id)
        persite(url, requestOptions).then((data) => {
            const items = barbers.filter(o => o.id !== item.id);
            setBarbers(items);
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
        if (response.ok) {
            return response.json();
        }
        else {

            if (response.status === 404)
                return "Not found";

            //if (response.status === 500) 
            //  return "server error, try again" ;

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
        if (fields.id === 0)
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
        setTitleModal("Edit Barbers");
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
                    <span className="fa fa-plus"></span>  Add a Barbers
            </Button>

                <h1 className="display-4"> List Barbers  </h1>

                <div className="flex-large">
                    <BarberLists barbers={barbers} ftn={formEdit} fntDel={confirmDel} />
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
                        <Form onSubmit={handleSubmit}>

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
                            <Button variant="primary" type="submit">
                                Save
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

Barber.propTypes = {
    greeting: PropTypes.string
};

export default Barber