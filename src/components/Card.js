import { Button, Card,} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getAllActivity } from "../store/actions/activity";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import ModalDelete from "./ModalDelete";

export default function CardActivity() {
    const [modalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [titleDelete, setTitleDelete] = useState()
    const dispatch = useDispatch()
    const { getActivityResult, getActivityLoading } = useSelector((state) => state.activityReducer);

    useEffect(() => {
        dispatch(getAllActivity());
    }, [dispatch]);

    const showModalDelete = (deleteActivity) => {
        setModalDelete(true)
        setIdDelete(deleteActivity.id)
        setTitleDelete(deleteActivity.title)
    }

    const handleDelete = () => {
        dispatch(deleteActivity(idDelete));
    }

    return (
        <div className="activity-card">
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
                                        onClick={() => showModalDelete(item)}
                                        icon={<img src="/activity-item-delete-button.svg" alt="delete" />} 
                                    />
                                </div>
                            </Card>
                        </div>
                    )
                ))}
            </div>
            <ModalDelete show={modalDelete} handleDelete={() => handleDelete(idDelete)} idDelete={idDelete} titleDelete={titleDelete} handleClose={() => setModalDelete(false)} />
        </div>
    )
}