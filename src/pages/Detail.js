import _ from "lodash"
import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Form, Input, Menu, Modal, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header";
import { getDetailActivity, updateActivity } from "../store/actions/activity";
import { createToDo, deleteToDo, updateToDo } from "../store/actions/todo";

export default function Detail() {
    const { Option } = Select;
    const [form] = Form.useForm()
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);;
    const [titleEdit, setTitleEdit] = useState();
    const [priorityEdit, setPriorityEdit] = useState();
    const dispatch = useDispatch()
    const { confirm } = Modal;
    const { id } = useParams()
    const { getDetailResult} = useSelector((state) => state.activityReducer);
    const [itemToDo, setItemToDo] = useState([])

    // DETAIL ACITIVITY
    useEffect(() => {
        dispatch(getDetailActivity({ id: id}));
    }, [dispatch, id]);

    // DELETE ACTIVITY
    const showModalDelete = (id, title) => {
            confirm({
                title: <h5>Apakah anda yakin menghapus List Item “{title}”?</h5>,
                icon: <img src="/modal-delete-icon.svg" alt="delete" />,
                okText: 'Hapus',
                okType: "danger",
                cancelText: 'Batal',
                centered: true,
                onOk() {
                    dispatch(deleteToDo(id));
                    window.location.reload()
                },     
                onCancel() {
                },
            })
    }

    // CREATE NEW ACTIVITY
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('very-high')
    const [is_active, setActive] = useState(true)

    const showModal = () => {
        setIsModalCreate(true);
    };

    const handleOk = (idItem) => {
        dispatch(createToDo(title, priority, is_active, id, idItem))
        setIsModalCreate(false);
        window.location.reload()
    };

    const handleCancel = () => {
        setIsModalCreate(false);
    };

    // UPDATE EDIT NAME ACTIVITY
    const [updateClick, setUpdateClick] = useState(false)
    const [titleActivity, setTitleActivity] = useState(getDetailResult.title)

    const handleSubmitEdit = (idActivity) => {
        dispatch(updateActivity({id: idActivity, title: titleActivity})) 
        setUpdateClick(false)
        window.location.reload()
    }
    const handleEditActivity = () => {
        setUpdateClick(true)
    };

    // UPDATE EDIT TO DO ITEM
    const showModalUpdate = (id, item) => {
        setIsModalUpdate(true)
        setTitleEdit(item.title)
        setPriorityEdit(item.priority)
        let initialValues = {
            title: item.title,
            priority: item.priority
        }
        form.setFieldsValue(initialValues)
    };

    let initialValues = {
        title: titleEdit,
        priority: priorityEdit
    }

    let data = {title: titleEdit, is_active:is_active, priority: priorityEdit}

    const handleOkEdit = async (id) => {
        dispatch(updateToDo({id, data}))
        setIsModalUpdate(false);
        window.location.reload()
    };
    
    console.log(initialValues)
    const handleCancelEdit = () => {
        setIsModalUpdate(false);
        setTitleEdit('')
        setPriorityEdit('')
        let initialValues = {
            title: '',
            priority: ''
        }
        form.setFieldsValue(initialValues)
    }

    // UPDATE CHECKED TO DO ITEM (ACTIVE INACTIVE)
    const checkedActive = (id) => {
        let items = [];
        for (let i = 0; i < getDetailResult.todo_items?.length; i++) {
          if (getDetailResult.todo_items[i].id !== id) {
            items.push(getDetailResult.todo_items[i]);
          } else {
            items.push({
              ...getDetailResult.todo_items[i],
              is_active: getDetailResult.todo_items[i].is_active === 1 ? 0 : 1,
            });
          }
        }
        setItemToDo(items);
        const updatedItem = items.find((item) => item.id === id);
        const data = {
          title: updatedItem.title,
          is_active: updatedItem.is_active,
          priority: updatedItem.priority,
        };
        dispatch(updateToDo({ id, data }));
    }

    // SORT TO DO ITEM
    useEffect(() => {
        if (getDetailResult) {
            let sortToDo = _.orderBy(getDetailResult.todo_items, 'id', ['desc']);
            setItemToDo(sortToDo)
        }
    }, [getDetailResult])

    const sortToDo = ({key}) => {
        if (`${key}` === '1') {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'id', ['desc']);
            setItemToDo(sortItem)
        } else if (`${key}` === '2') {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'id');
            setItemToDo(sortItem)
        } else if (`${key}` === '3') {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'title');
            setItemToDo(sortItem)
        } else if (`${key}` === '4') {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'title',['desc']);
            setItemToDo(sortItem)
        } else if (`${key}` === '5') {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'is_active', ['desc']);
            setItemToDo(sortItem)
        } else {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'id');
            setItemToDo(sortItem)
        }
    }

    const menuSort = (
        <Menu selectable defaultSelectedKeys={'1'} onClick={sortToDo}
            items={[
                {
                    key: '1',
                    label: 'Terbaru',
                    icon: <img src="/sort-latest.svg" alt="latest" />
                },
                {
                    key: '2',
                    label: 'Terlama',
                    icon: <img src="/sort-oldest.svg" alt="latest" />
                },
                {
                    key: '3',
                    label: 'A-Z',
                    icon: <img src="/sort-az.svg" alt="latest" />
                },
                {
                    key: '4',
                    label: 'Z-A',
                    icon: <img src="/sort-za.svg" alt="latest" />
                },
                {
                    key: '5',
                    label: 'Belum Selesai',
                    icon: <img src="/sort-unfinished.svg" alt="latest" />
                },
            ]} 
        />
    )
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

    useEffect(() => {
        forceUpdate({});
    }, []);
    console.log(title)
    return (
        <div>
            <Header />
            <div className="todo-item container">
                <div className="todo-header" data-cy="todo-header">
                    <div className="row">
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="btn-back" data-cy="todo-back-button" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        {/* UPDATE EDIT TITLE ACTIVITY */}
                        {updateClick ? (
                            <>
                                <Input defaultValue={getDetailResult.title} onBlur={() => handleSubmitEdit(getDetailResult.id)} onChange={e => setTitleActivity(e.target.value)} data-cy="todo-title-edit-input" />
                                <svg xmlns="http://www.w3.org/2000/svg" className="btn-edit-activity" data-cy="todo-title-edit-button" fill="none" viewBox="0 0 24 24" stroke="#A4A4A4" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </>
                        ): (
                            <>
                                <h1 onClick={handleEditActivity} data-cy="todo-title">{getDetailResult.title}</h1>
                                <svg onClick={handleEditActivity} className="btn-edit-activity" xmlns="http://www.w3.org/2000/svg" data-cy="todo-title-edit-button" fill="none" viewBox="0 0 24 24" stroke="#A4A4A4" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </>
                        )}
                    </div>
                    <div className="row">
                        {/* BUTTON SORT TO DO ITEM */}
                        <Dropdown overlay={menuSort} trigger={"click"} data-cy="todo-sort-button">
                            <Space>
                                <img className="btn-sort" src="/todo-sort-button.svg" alt="sort" data-cy="todo-sort-button"/>
                            </Space>
                        </Dropdown>
                        {/* BUTTON CREATE TO DO ITEM */}
                        <Button className="btn btn-lightblue" size="large" shape="round" onClick={showModal} icon={<PlusOutlined />} data-cy="todo-add-button">
                            Tambah
                        </Button>
                    </div>
                </div>
                <div className="todo-list" data-cy="todo-item">
                    {getDetailResult.todo_items?.length < 1 ? (
                        <div className="todo-empty" data-cy="todo-empty-state">
                            <img src="/todo-empty-state.svg" alt="empty" />
                        </div>
                    ) : (
                        itemToDo.map((item) => (     
                            <>
                                <div className="todo-item-list" data-cy="todo-item" key={item.id}>
                                    <div className="checked btn-update">
                                        <div className={`indicator ${item.priority}`} data-cy="todo-item-priority-indicator"></div>
                                        {/* BUTTON CHECKED TO DO */}
                                        <Checkbox data-cy="todo-item-checkbox" onChange={() => checkedActive(item.id)} checked={item.is_active===0} className={`${item.is_active===0 && "todo-checked"}`}>
                                            <h5 data-cy="todo-item-title">{item.title}</h5>
                                        </Checkbox>

                                        {/* BUTTON MODAL UPDATE EDIT TO DO ITEM */}
                                        <Button
                                            data-cy="todo-item-edit-button"
                                            onClick={() => showModalUpdate(item.id, item)}
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-edit-button" fill="none" viewBox="0 0 24 24" stroke="#C4C4C4" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>} 
                                        />
                                    </div>

                                    {/* BUTTON MODAL DELETE TO DO ITEM */}
                                    <Button
                                        data-cy="todo-item-delete-button"
                                        onClick={() => showModalDelete(item.id, item.title)}
                                        icon={<img src="/activity-item-delete-button.svg" alt="delete" data-cy="todo-item-delete-button" />} 
                                    />
                                </div>

                                {/* MODAL CREATE NEW TO DO ITEM */}
                                <Modal data-cy="modal-add-todo-item" title="Tambah List Item" visible={isModalCreate} footer={null} onCancel={handleCancel}>
                                    <Form
                                        data-cy="form-add-todo-item"
                                        name="basic"
                                        layout="vertical"
                                        autoComplete="off"
                                        onFinish={() => handleOk(item.id)}
                                    >
                                        <Form.Item
                                            data-cy="modal-add-title"
                                            label={"NAMA LIST ITEM"}
                                            name="title"
                                            style={{ marginBottom: "16px" }}
                                        >
                                            <Input
                                                data-cy="modal-add-name-input"
                                                placeholder="Tambahkan nama list item"
                                                className="input-email"
                                                id="title"
                                                onChange={e => setTitle(e.target.value)} />
                                        </Form.Item>
                                        <Form.Item
                                            data-cy="modal-add-priority-title"
                                            label={"Priority"}
                                            name="priority"
                                        >
                                            <Select data-cy="modal-add-priority-dropdown" name="priority" onChange={(value) => setPriority(value)} defaultValue="very-high">
                                                <Option value="very-high" name="priority">Very High</Option>
                                                <Option value="high" name="priority">High</Option>
                                                <Option value="normal" name="priority">Normal</Option>
                                                <Option value="low" name="priority">Low</Option>
                                                <Option value="very-low" name="priority">Very Low</Option>
                                            </Select>
                                        </Form.Item>
                                        <div className="btn-right">
                                            <Button data-cy="modal-add-save-button" disabled={title===''} className="btn-lightblue" size="large" shape="round" htmlType="submit">Simpan</Button>
                                        </div>
                                    </Form>
                                </Modal>

                                {/* MODAL UPDATE EDIT TO DO ITEM */}
                                <Modal data-cy="modal-edit-todo-item" title="Edit Item" destroyOnClose={true} visible={isModalUpdate} footer={null} onCancel={() => handleCancelEdit(item)}>                    
                                    <Form
                                        data-cy="form-edit-todo-item"
                                        name="basic"
                                        form={form}
                                        layout="vertical"
                                        autoComplete="off"
                                        initialValues={initialValues}
                                        onFinish={() => handleOkEdit(item.id)}
                                    >
                                        <Form.Item
                                            data-cy="form-edit-title"
                                            label={"NAMA LIST ITEM"}
                                            name="title"
                                            id="title"
                                            // initialValue={item.title}
                                            style={{ marginBottom: "16px" }}
                                        >
                                            <Input
                                                data-cy="form-edit-input-title"
                                                placeholder="Tambahkan nama list item"
                                                className="input-email"
                                                id="title"
                                                name="title"
                                                // key={title}
                                                onChange={e => setTitleEdit(e.target.value)} 
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            data-cy="form-edit-input-priority"
                                            label={"Priority"}
                                            name="priority"
                                            id="priority"
                                        >
                                            <Select data-cy="form-edit-dropdown-priority" id="priority" name="priority" onChange={(value) => setPriorityEdit(value)}>
                                                <Option id="priority" name="priority" icon={<img src="/ceklis.svg" alt="" />} value="very-high">Very High</Option>
                                                <Option id="priority" name="priority" value="high">High</Option>
                                                <Option id="priority" name="priority" value="normal">Normal</Option>
                                                <Option id="priority" name="priority" value="low">Low</Option>
                                                <Option id="priority" name="priority" value="very-low">Very Low</Option>
                                            </Select>
                                        </Form.Item>
                                        <div className="btn-right">
                                            <Button data-cy="modal-edit-save-button" className="btn-lightblue" size="large" shape="round" htmlType="submit">Simpan</Button>
                                        </div>
                                    </Form>
                                </Modal>         
                            </>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}