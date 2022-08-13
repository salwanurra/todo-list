import _ from "lodash"
import { ConsoleSqlOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Form } from "react-bootstrap";
import Select from "react-select";
import { Button, Checkbox, Dropdown, Input, Menu, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header";
import { getDetailActivity, updateActivity } from "../store/actions/activity";
import { createToDo, deleteToDo, updateToDo } from "../store/actions/todo";

export default function Detail() {
    // const { Option } = Select;
    const inputRef = useRef()
    // const [form] = Form.useForm()
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
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
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false)
    const [idDelete, setIdDelete] = useState()
    const [titleDelete, setTitleDelete] = useState()

    const showModalDelete = (idDeleteItem, titleDeleteItem) => {
        setIdDelete(idDeleteItem)
        setTitleDelete(titleDeleteItem)
        setIsModalDelete(true)
    }

    const handleOkDelete = () => {
        dispatch(deleteToDo(idDelete));
        setIsModalDelete(false)
        setModalConfirm(true)
    }

    const handleCancelDelete = () => {
        setIsModalDelete(false)
    }

    const handleModalConfirm = () => {
        setModalConfirm(false)
        window.location.reload()
    }

    // CREATE NEW ACTIVITY
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('very-high')
    const [is_active, setActive] = useState(true)

    const showModalCreate = () => {
        setIsModalCreate(true);
    };

    const handleOkCreate = (idItem) => {
        dispatch(createToDo(title, priority, is_active, id, idItem))
        setIsModalCreate(false);
        window.location.reload()
    };

    const handleCancelCreate = () => {
        setIsModalCreate(false);
    };

    const options = [
        {
          value: "very-high",
          label: "Very High",
        },
        {
          value: "high",
          label: "High",
        },
        {
          value: "normal",
          label: "Medium",
        },
        {
          value: "low",
          label: "Low",
        },
        {
          value: "very-low",
          label: "Very Low",
        },
    ];

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
        if(!titleActivity) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    };

    // UPDATE EDIT TO DO ITEM
    const [idEdit, setIdEdit] = useState();
    const [titleEdit, setTitleEdit] = useState();
    const [priorityEdit, setPriorityEdit] = useState();
    const [selectOption, setSelectOption] = useState();
    console.log(selectOption)
    const showModalUpdate = (item) => {
        setIdEdit(item.id)
        setIsModalUpdate(true)
        setTitleEdit(item.title)
        setPriorityEdit(item.priority)
        setSelectOption(options.find(option => option.value===item.priority))
    };

    let data = {title: titleEdit, is_active:is_active, priority: priorityEdit}

    const handleOkEdit = async (id) => {
        dispatch(updateToDo({id,data}))
        setIsModalUpdate(false);
        window.location.reload()
    };

    const handleCancelEdit = () => {
        setIsModalUpdate(false);
        if(!titleEdit) {
            // setIdEdit(null)
            setTitleEdit('')
            setPriorityEdit('')
            setSelectOption(null)
        }
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
            let sortItem = _.orderBy(getDetailResult.todo_items, 'id', ['asc']);
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
        <Menu selectable defaultSelectedKeys={'1'} onClick={sortToDo}  data-cy="sort-selection"
            items={[
                {
                    key: '1',
                    label: 'Terbaru',
                    icon: <img src="/sort-latest.svg" alt="latest" data-cy="sort-selection" />
                },
                {
                    key: '2',
                    label: 'Terlama',
                    icon: <img src="/sort-oldest.svg" alt="latest" data-cy="sort-selection" />
                },
                {
                    key: '3',
                    label: 'A-Z',
                    icon: <img src="/sort-az.svg" alt="latest" data-cy="sort-selection" />
                },
                {
                    key: '4',
                    label: 'Z-A',
                    icon: <img src="/sort-za.svg" alt="latest" data-cy="sort-selection" />
                },
                {
                    key: '5',
                    label:'Belum Selesai',
                    icon: <img src="/sort-unfinished.svg" alt="latest" data-cy="sort-selection" />
                },
            ]} 
        />
    )
    const DropdownIndicator = () => {
        return <div data-cy="modal-add-priority-item" className="priority-dropdown"></div>;
    };
    const formatOptionLabel = ({ value, label }) => (
        <div
          data-cy="modal-add-priority-item"
          className="d-flex align-items-center"
        >
        <div className={`indicator ${value}`}></div>
          <div>{label}</div>
        </div>
      );
    
    return (
        <div>
            <Header />
            <div className="todo-item container">
                <div className="todo-header" data-cy="todo-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="btn-back" data-cy="todo-back-button" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={4}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        {/* UPDATE EDIT TITLE ACTIVITY */}
                        {updateClick ? (
                            <>
                                <Input ref={inputRef} defaultValue={getDetailResult.title} onBlur={() => handleSubmitEdit(getDetailResult.id)} onChange={e => setTitleActivity(e.target.value)} data-cy="todo-title-edit-input" />
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
                    <div className="d-flex flex-row align-items-center">
                        {/* BUTTON SORT TO DO ITEM */}
                        <div data-cy="todo-sort-button">
                            <Dropdown overlay={menuSort} trigger={"click"} data-cy="sort-selection">
                                <Space>
                                    <img className="btn-sort" src="/todo-sort-button.svg" alt="sort" data-cy="sort-selection"/>
                                </Space>
                            </Dropdown>

                        </div>
                        {/* BUTTON CREATE TO DO ITEM */}
                        <Button className="btn btn-lightblue" size="large" shape="round" onClick={showModalCreate} icon={<PlusOutlined />} data-cy="todo-add-button">
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
                                        <div data-cy="todo-item-checkbox">
                                            <Checkbox data-cy="todo-item-checkbox" onChange={() => checkedActive(item.id)} checked={item.is_active===0} className={`${item.is_active===0 && "todo-checked"}`}>
                                                <h5 data-cy="todo-item-title">{item.title}</h5>
                                            </Checkbox>
                                        </div>

                                        {/* BUTTON MODAL UPDATE EDIT TO DO ITEM */}
                                        <Button
                                            data-cy="todo-item-edit-button"
                                            onClick={() => showModalUpdate(item)}
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" data-cy="todo-item-edit-button" fill="none" viewBox="0 0 24 24" stroke="#C4C4C4" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>} 
                                        />
                                    </div>

                                    {/* BUTTON MODAL DELETE TO DO ITEM */}
                                    <div>
                                        <Button
                                            data-cy="todo-item-delete-button"
                                            onClick={() => showModalDelete(item.id, item.title)}
                                            icon={<img src="/activity-item-delete-button.svg" alt="delete" data-cy="todo-item-delete-button" />} 
                                        />
                                    </div>
                                </div>

                                {/* MODAL UPDATE EDIT TO DO ITEM */}
                                <Modal data-cy="modal-edit-todo-item" show={isModalUpdate} onHide={() => handleCancelEdit(item)} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Tambah List Item</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group   
                                            data-cy="form-edit-todo-item"
                                            // form={form}           
                                        >
                                            <label>NAMA LIST ITEM</label>
                                            <div>
                                                <Form.Control
                                                    placeholder="Tambahkan nama Activity"
                                                    name="title"
                                                    style={{ marginBottom: "16px" }}
                                                    defaultValue={titleEdit}
                                                    onChange={(e) => setTitleEdit(e.target.value)}
                                                />

                                            </div>
                                            <label>PRIORITY</label>
                                            <div data-cy="modal-add-priority-dropdown">
                                                <Select 
                                                    data-cy="modal-add-priority-dropdown" 
                                                    name="priority" 
                                                    options={options}
                                                    onChange={(e) => setPriorityEdit(e.value)} 
                                                    defaultValue={selectOption}
                                                    formatOptionLabel={formatOptionLabel}
                                                />

                                            </div>
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="btn-right">
                                            <button data-cy="modal-edit-save-button" className="btn-lightblue" onClick={() => handleOkEdit(item.id)} htmlType="submit">Simpan</button>
                                        </div>
                                    </Modal.Footer>
                                </Modal> 

                                {/* MODAL DELETE*/}
                                <div className="modal-delete" data-cy="todo-item-delete-button">
                                    <Modal
                                        data-cy="modal-delete"
                                        className="modal-delete"
                                        show={isModalDelete}
                                        onHide={handleCancelDelete}
                                        centered
                                    >
                                        <Modal.Header>
                                            <Modal.Title>
                                                <img data-cy="modal-delete-icon" src="/modal-delete-icon.svg" alt="delete" />
                                                <p data-cy="modal-delete-title">Apakah anda yakin menghapus item <b>“{titleDelete}”?</b></p>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                            <Button data-cy="modal-delete-cancel-button" onClick={handleCancelDelete} type="default">Batal</Button>
                                            <Button data-cy="modal-delete-confirm-button" onClick={() => handleOkDelete(item.id)} type="danger">Hapus</Button>
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
                        ))
                    )}
                </div>
            </div>
            {/* MODAL CREATE NEW TO DO ITEM */}
            <div data-cy="modal-add">
                <Modal data-cy="modal-add" show={isModalCreate} onHide={handleCancelCreate} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah List Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group data-cy="form-add-todo-item">
                            <label data-cy="modal-add-name-title">NAMA LIST ITEM</label>
                                <Form.Control
                                    data-cy="modal-add-name-input"
                                    placeholder="Tambahkan nama Activity"
                                    name="title"
                                    style={{ marginBottom: "16px" }}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            <label data-cy="modal-add-priority-title">PRIORITY</label>
                            <div data-cy="modal-add-priority-dropdown">
                                <Select 
                                    data-cy="modal-add-priority-dropdown" 
                                    name="priority" 
                                    className="select-priority"
                                    options={options}
                                    onChange={(e) => setPriority(e.value)} 
                                    defaultValue={ options[0]}
                                    components={{DropdownIndicator}}
                                />

                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="btn-right">
                            <button data-cy="modal-add-save-button" disabled={title===''} className="btn-lightblue" onClick={() => handleOkCreate()}>Simpan</button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}