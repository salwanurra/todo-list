import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import Header from "../components/Header";
import CardActivity from "../components/Card";
import { useDispatch } from "react-redux";
import { createActivity } from "../store/actions/activity";

export default function Home() {
    const dispatch = useDispatch()
    const handleCreateActivity = async() => {
        dispatch(createActivity())
        window.location.reload()
    }
    return (
        <div className="home-page">
            <Header />
            <div className="activity container">
                <div className="activity-header" data-cy="activity-header">
                    <h1 data-cy="activity-title">Activity</h1>
                    <Button className="btn btn-lightblue" onClick={handleCreateActivity} size="large" shape="round" icon={<PlusOutlined />} data-cy="activity-add-button">
                        Tambah
                    </Button>
                </div>
                <div className="list-activity">
                    <CardActivity />
                </div>

            </div>
        </div>
    )
}