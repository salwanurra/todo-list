import _ from "lodash"
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Dropdown } from "react-bootstrap";
import Select from "react-select";
import { Button, Checkbox, Input, } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header";
import { getDetailActivity, updateActivity } from "../store/actions/activity";
import { createToDo,  updateToDo } from "../store/actions/todo";
import ModalDelete from "../components/ModalDelete";

export default function Detail() {
    const inputRef = useRef()
    const [isModalCreate, setIsModalCreate] = useState(false);
    const [isModalUpdate, setIsModalUpdate] = useState(false);
    const dispatch = useDispatch()
    const { id } = useParams()
    const { getDetailResult} = useSelector((state) => state.activityReducer);
    const [itemToDo, setItemToDo] = useState([])

    // DETAIL ACITIVITY

    useEffect(() => {
        dispatch(getDetailActivity({ id: id}));
    }, [dispatch, id]);

    // DELETE ACTIVITY
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [idDelete, setIdDelete] = useState()
    const [titleDelete, setTitleDelete] = useState()

    const showModalDelete = (deleteItem) => {
        setIdDelete(deleteItem.id)
        setTitleDelete(deleteItem.title)
        setIsModalDelete(true)
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
    const [activeDropdown, setActiveDropdown] = useState(1);
    useEffect(() => {
        if (getDetailResult) {
            let sortToDo = _.orderBy(getDetailResult.todo_items, 'id', ['desc']);
            setItemToDo(sortToDo)
        }
    }, [getDetailResult])

    useEffect(() => {
        if (activeDropdown === 1) {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'id', ['desc']);
            setItemToDo(sortItem)
        } else if (activeDropdown === 2) {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'id');
            setItemToDo(sortItem)
        } else if (activeDropdown === 3) {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'title');
            setItemToDo(sortItem)
        } else if (activeDropdown === 4) {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'title',['desc']);
            setItemToDo(sortItem)
        } else if (activeDropdown === 5) {
            let sortItem = _.orderBy(getDetailResult.todo_items, 'is_active', ['desc']);
            setItemToDo(sortItem)
        } else {
            let sortItem = _.sortBy(getDetailResult.todo_items, 'id');
            setItemToDo(sortItem)
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDropdown])
   
    const DropdownIndicator = () => {
        return <div data-cy="modal-add-priority-dropdown" className="indicator-dropdown">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2} style={{width:'24px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </div>;
    };
    const formatOptionLabel = ({ value, label }) => (
        <div
          data-cy="modal-add-priority-item"
          className="d-flex align-items-center"
        >
            <div className={`indicator ${value} priority-item`}></div>
            <div className="ms-3">{label}</div>
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
                        
                            <Dropdown>
                                <Dropdown.Toggle id="custom-dropdown">
                                    <img className="btn-sort" src="/todo-sort-button.svg" alt="sort" data-cy="todo-sort-button"/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                <Dropdown.Item eventKey="1" data-cy="sort-selection">
                                    <div 
                                        onClick={() => setActiveDropdown(1)} 
                                        data-cy={activeDropdown === 1 && "sort-selection-selected"}
                                    >
                                        <img src="/sort-latest.svg" data-cy="sort-selection-icon" alt="latest" />
                                        <span data-cy="sort-selection-title">Terbaru</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2" data-cy="sort-selection">
                                    <div 
                                        onClick={() => setActiveDropdown(2)} 
                                        data-cy={activeDropdown === 2 && "sort-selection-selected"}
                                    >
                                        <img src="/sort-oldest.svg" data-cy="sort-selection-icon" alt="latest" />
                                        <span data-cy="sort-selection-title">Terlama</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="3" data-cy="sort-selection">
                                    <div 
                                        onClick={() => setActiveDropdown(3)} 
                                        data-cy={activeDropdown === 3 && "sort-selection-selected"}
                                    >
                                        <img src="/sort-az.svg" data-cy="sort-selection-icon" alt="latest" />
                                        <span data-cy="sort-selection-title">A-Z</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="4" data-cy="sort-selection">
                                    <div 
                                        onClick={() => setActiveDropdown(4)} 
                                        data-cy={activeDropdown === 4 && "sort-selection-selected"}
                                    >
                                        <img src="/sort-za.svg" data-cy="sort-selection-icon" alt="latest" />
                                        <span data-cy="sort-selection-title">Z-A</span>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="5" data-cy="sort-selection">
                                    <div 
                                        onClick={() => setActiveDropdown(5)} 
                                        data-cy={activeDropdown === 5 && "sort-selection-selected"}
                                    >
                                        <img src="/sort-unfinished.svg" data-cy="sort-selection-icon" alt="latest" />
                                        <span data-cy="sort-selection-title">Belum Selesai</span>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>


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
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#C4C4C4" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>} 
                                        />
                                    </div>

                                    {/* BUTTON MODAL DELETE TO DO ITEM */}
                                    <div>
                                        <Button
                                            data-cy="todo-item-delete-button"
                                            onClick={() => showModalDelete(item)}
                                            icon={<img src="/activity-item-delete-button.svg" alt="delete" />} 
                                        />
                                    </div>
                                </div>

                                {/* MODAL UPDATE EDIT TO DO ITEM */}
                                <Modal data-cy="modal-edit-todo-item" show={isModalUpdate} onHide={() => handleCancelEdit(item)} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit List Item</Modal.Title>
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
                                                    data-cy="modal-add-priority-item" 
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
                                <ModalDelete show={isModalDelete} idDelete={idDelete} titleDelete={titleDelete} handleClose={() => setIsModalDelete(false)} />
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
                            <Select 
                                defaultValue={ options[0]}
                                formatOptionLabel={formatOptionLabel}
                                options={options}
                                className="select-priority"
                                name="priority" 
                                onChange={(e) => setPriority(e.value)} 
                                components={{DropdownIndicator}}
                            />
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