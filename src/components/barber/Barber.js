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
        name: "",
        birth_date: "",
        blocked: false,
        cell_phone: "",
        cnpj_cpf: "",
        estabelecimento_id: 1,
        ie_rg: "",
        im: "",
        suframa: "",
        tax_regime:"",
        estabelecimento_id: 1,
        user_id: 1
    });

    useEffect(() => { loadData() }, []);

    const setModalShow = () => {
        setTitleModal("Add Barbers");
        setShow(true)
    }

    const cancelSubmit = () => {
        fields.name = "";
        fields.user_id = 1;
        fields.birth_date= "";
        fields.blocked =false;
        fields.cell_phone= "";
        fields.cnpj_cpf = "";
        fields.estabelecimento_id = 1;
        fields.ie_rg= "";
        fields.im="";
        fields.suframa= "";
        fields.tax_regime ="";
        //fields.id = 0;
        //fields.estabelecimento_id = 0;
        //fields.user_id = 0;
        setTitleModal("");
        setShow(false)
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
        if (fields.id === 0)
            await handleCreate()
        else
            await handleUpdate()
    }

    const formEdit = (item) => {
        fields.id = item.id;
        fields.name = item.name;
        fields.cnpj_cpf = item.cnpj_cpf;
        fields.birth_date = item.birth_date;
        fields.ie_rg = item.ie_rg;
        fields.im = item.im;
        fields.suframa = item.suframa;
        fields.tax_regime = item.tax_regime;
        fields.cell_phone = item.cell_phone;
        fields.blocked = item.blocked;
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
                            <Form id="formBarber" onSubmit={handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="ie_rg">
                                    <Form.Label>IE/RG</Form.Label>
                                    <Form.Control type="text"
                                        name="ie_rg"
                                        placeholder="Enter ie/rg"
                                        value={fields.ie_rg}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="cnpj_cpf">
                                    <Form.Label>CPF</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cnpj_cpf"
                                        placeholder="Enter cnpj/cpf"
                                        value={fields.cnpj_cpf}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="cell_phone">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cell_phone"
                                        placeholder="Enter celular"
                                        value={fields.cell_phone}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="im">
                                    <Form.Label>IM</Form.Label>
                                    <Form.Control type="text"
                                        name="im"
                                        placeholder="Enter im"
                                        value={fields.im}
                                        onChange={handleFieldChange} />
                                    </Form.Group>      
                                </Form.Row>

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

                                <Form.Row>
                                    <Form.Group as={Col} controlId="name">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        value={fields.name}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col} controlId="birth_date">
                                    <Form.Label>Nascimento</Form.Label>
                                    <Form.Control type="text"
                                        name="birth_date"
                                        placeholder="Enter Nascimento"
                                        value={fields.birth_date}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="suframa">
                                    <Form.Label>Suframa</Form.Label>
                                    <Form.Control type="text"
                                        name="suframa"
                                        placeholder="Enter suframa"
                                        value={fields.suframa}
                                        onChange={handleFieldChange} />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="blocked">
                                    <Form.Label>Ativo</Form.Label>
                                    <Form.Control type="text"
                                        name="blocked"
                                        placeholder="Enter blocked"
                                        value={fields.blocked}
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

Barber.propTypes = {
    greeting: PropTypes.string
};

export default Barber