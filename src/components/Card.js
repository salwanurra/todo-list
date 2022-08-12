import { Button, Card,} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getAllActivity } from "../store/actions/activity";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Modal } from "react-bootstrap";

export default function CardActivity() {
    const [modalDelete, setModalDelete] = useState(false)
    const [modalConfirm, setModalConfirm] = useState(false)
    const [idItem, setId] = useState()
    const [titleItem, setTitle] = useState()
    const dispatch = useDispatch()
    const { getActivityResult, getActivityLoading } = useSelector((state) => state.activityReducer);

    useEffect(() => {
        dispatch(getAllActivity());
    }, [dispatch]);

    const showModalDelete = (id, title) => {
        setModalDelete(true)
        setId(id)
        setTitle(title)
    }

    const handleOkDelete = () => {
        dispatch(deleteActivity(idItem));
        setModalDelete(false)
        setModalConfirm(true)
    }

    const handleCancelDelete = () => {
        setModalDelete(false)
    }

    const handleModalConfirm = () => {
        setModalConfirm(false)
        window.location.reload()
    }
    return (
        <div className="activity-card">
            {/* <Row gutter={[24, 32]}> */}
            <div className="row">
                { getActivityResult.length < 1? (
                    getActivityResult && 
                    <div className="activity-empty" data-cy="activity-empty-state">
                        <img src="/activity-empty-state.svg" alt="empty" />
                    </div>
                ): (
                    getActivityResult && getActivityResult.map((item) => (
                        <div className="col-3 mb-4" key={item.id}>
                            <Card data-cy="activity-item" loading={getActivityLoading}>
                                <Link to={`/detail/${item.id}`}>
                                    <div className="activity-list">
                                        <h4 data-cy="activity-item-title">{item.title}</h4>
                                    </div>
                                </Link>
                                <div className="bottom-card">
                                    <p data-cy="activity-item-date">{dayjs(item?.created_at).locale("id").format("DD MMMM YYYY")}</p>
                                    <Button
                                        data-cy="activity-item-delete-button"
                                        onClick={() => showModalDelete(item.id, item.title)}
                                        icon={<img src="/activity-item-delete-button.svg" alt="delete" />} />
                                </div>
                            </Card>
                        </div>
                    )
                ))}
            </div>
            <div className="modal-delete">
                <Modal
                    data-cy="todo-modal-delete"
                    className="modal-delete"
                    show={modalDelete}
                    onHide={handleCancelDelete}
                    centered
                >
                    <Modal.Header>
                        <Modal.Title>
                            <img data-cy="modal-delete-icon" src="/modal-delete-icon.svg" alt="delete" />
                            <p data-cy="modal-delete-title">Apakah anda yakin menghapus activity <b>“{titleItem}”?</b></p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button data-cy="modal-delete-cancel-button" onClick={handleCancelDelete} type="default">Batal</Button>
                        <Button data-cy="modal-delete-confirm-button" onClick={handleOkDelete} type="danger">Hapus</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div data-cy="modal-information">
                <Modal
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
        </div>
    )
}