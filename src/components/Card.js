import { Button, Card, Col, Modal, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getAllActivity } from "../store/actions/activity";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function CardActivity() {
    const { confirm } = Modal;
    const dispatch = useDispatch()
    const { getActivityResult, getActivityLoading } = useSelector((state) => state.activityReducer);

    useEffect(() => {
        dispatch(getAllActivity());
    }, [dispatch]);

    const showModalDelete = (id, title) => {
        confirm({
            title: <h5>Apakah anda yakin menghapus activity “{title}”?</h5>,
            icon: <img src="/modal-delete-icon.svg" alt="delete" />,
            okText: 'Hapus',
            okType: "danger",
            cancelText: 'Batal',
            centered: true,
            onOk() {
                dispatch(deleteActivity(id));
                confirm({
                    title: <p>Activity berhasil dihapus</p>,
                    icon: <img src="/modal-information-icon.svg" alt="information" />,
                    closable: true,
                    centered: true,
                    wrapClassName: 'success-delete',
                    onCancel(){
                        window.location.reload()
                    }
                })
            },       
            onCancel() {
            },
        });
    }

    return (
        <div className="activity-card">
            <Row gutter={[24, 32]}>
                { getActivityResult.length < 1? (
                    getActivityResult && 
                    <div className="activity-empty">
                        <img src="/activity-empty-state" alt="empty" />
                    </div>
                ): (
                getActivityResult && getActivityResult.map((item) => (
                <Col span={6} key={item.id}>
                    <Card data-cy="activity-item" loading={getActivityLoading}>
                        <Link to={`/detail/${item.id}`}>
                            <h3 data-cy="activity-item-title">{item.title}</h3>
                        </Link>
                        <div className="bottom-card">
                            <p data-cy="activity-item-date">{dayjs(item?.created_at).locale("id").format("DD MMMM YYYY")}</p> 
                            <Button 
                                onClick={() => showModalDelete(item.id, item.title)} 
                                icon={<img src="/activity-item-delete-button.svg" alt="delete" data-cy="activity-item-delete-button" />}
                            /> 
                        </div>
                    </Card>
                </Col>
                    
                )
                ))}
            </Row>
        </div>
    )
}