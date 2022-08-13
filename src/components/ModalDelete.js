import { Button } from "antd";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteToDo } from "../store/actions/todo";

export default function ModalDelete({show, handleDelete, idDelete, titleDelete, handleClose}) {
    const dispatch = useDispatch()
    const [modalConfirm, setModalConfirm] = useState(false)

    const handleOkDelete = () => {
        if (handleDelete) {
            handleDelete()
        } else {
            dispatch(deleteToDo(idDelete));
        }
        handleClose()
        setModalConfirm(true)
    }

    const handleModalConfirm = () => {
        setModalConfirm(false)
        window.location.reload()
    }

    return (
    <> 
        <div className="modal-delete" data-cy="modal-delete">
            <Modal
                className="modal-delete"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <img data-cy="modal-delete-icon" src="/modal-delete-icon.svg" alt="delete" />
                        <p data-cy="modal-delete-title">Apakah anda yakin menghapus activity <b>“{titleDelete}”?</b></p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button data-cy="modal-delete-cancel-button" onClick={handleClose} type="default">Batal</Button>
                    <Button data-cy="modal-delete-confirm-button" onClick={handleOkDelete} type="danger">Hapus</Button>
                </Modal.Footer>
            </Modal>
        </div>
        <div data-cy="modal-information">
            <Modal
                data-cy="modal-information"
                className="modal-confirmation"
                show={modalConfirm}
                onHide={handleModalConfirm}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <img data-cy="modal-information-icon" src="/modal-information-icon.svg" alt="information" />
                        <h5 data-cy="modal-information-title">Activity berhasil dihapus</h5>
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </div>
     </> 

    )
}