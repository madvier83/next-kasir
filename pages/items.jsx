import React, { useEffect, useState } from 'react'
import GlobalDataProvider from '../components/GlobalDataProvider'
import CategoryCard from '../components/CategoryCard'
import Head from 'next/head'
import { nanoid } from 'nanoid'

export default function Items() {
    const [viewType, setViewType] = useState(true)
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [categoryModal, setCategoryModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const [itemUpdateModal, setItemUpdateModal] = useState(false)
    const [confirmModal, setConfirmModal] = useState({isOpen: false, message: "", callback: null})

    const initialCategoryForm = {
        id: nanoid(6),
        category: '',
        icon: 'default',
    }
    const [categoryForm, setCategoryForm] = useState(initialCategoryForm)

    const uncategorized = {
        id: null,
        category: 'Uncategorized',
        icon: 'default',
    }
    const initialItemForm = {
        id: nanoid(6),
        item: '',
        price: '',
        stock: '',
        category: JSON.stringify(uncategorized),
    }
    const [itemForm, setItemForm] = useState(initialItemForm)
    const [updateItemForm, setUpdateItemForm] = useState(initialItemForm)

    function constructor() {
        let categories = window.localStorage.getItem('categories')
        categories = JSON.parse(categories)
        setCategories(categories)

        let items = window.localStorage.getItem('items')
        items = JSON.parse(items)
        setItems(items)
    }
    useEffect(() => {
        constructor()
    }, [])

    // Form handler
    function handleCategoryChange(event) {
        const { name, value } = event.target
        setCategoryForm((prevCategoryForm) => {
            return {
                ...prevCategoryForm,
                [name]: value,
            }
        })
    }
    function handleItemChange(event) {
        const { name, value } = event.target
        setItemForm((prevItemForm) => {
            return {
                ...prevItemForm,
                [name]: value,
            }
        })
    }
    function handleItemUpdateChange(event) {
        const { name, value } = event.target
        setUpdateItemForm((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    // Data handler
    function categorySubmit(event) {
        event.preventDefault()
        let newCategory = categories
        newCategory.unshift(categoryForm)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem('categories', newCategory)
        setCategoryForm(initialCategoryForm)
        setCategoryModal((prev) => !prev)
    }
    function categoryDelete(id) {
        let newItems = []
        for(let i=0; i<items.length; i++) {
            let sample = items[i]
            if(JSON.parse(sample.category).id === id){
                newItems.push({...sample, category: JSON.stringify(uncategorized)})
            }else{
                newItems.push({...sample})
            }
        }
        setItems(newItems)
        newItems = JSON.stringify(newItems)
        window.localStorage.setItem("items", newItems)

        let newCategory = categories
        newCategory = newCategory.filter((cat) => cat.id !== id)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem('categories', newCategory)
        constructor()
    }
    function itemSubmit(event) {
        event.preventDefault()
        let newItem = items
        newItem.unshift(itemForm)
        newItem = JSON.stringify(newItem)
        window.localStorage.setItem('items', newItem)
        setItemForm(initialItemForm)
        setItemModal((prev) => !prev)
    }
    function itemUpdate(event) {
        event.preventDefault()
        let newItems = []
        let updateItem = updateItemForm
        for (let i = 0; i < items.length; i++) {
            if (items[i].id != updateItem.id) {
                newItems.push(items[i])
            } else {
                newItems.push(updateItem)
            }
        }
        window.localStorage.setItem('items', JSON.stringify(newItems))
        constructor()
        setItemUpdateModal((prev) => !prev)
    }
    function itemDelete(id) {
        const newItems = []
        for (let i = 0; i < items.length; i++) {
            if (items[i].id != id) {
                newItems.push(items[i])
            }
        }
        setItems(newItems)
        window.localStorage.setItem('items', JSON.stringify(newItems))
    }
    function openItemUpdate(obj) {
        setItemUpdateModal(
            (prev) => !prev
        )
        setUpdateItemForm(
            obj
        )
    }

    function confirm(message, callback) {
        if(callback==null) {
            callback = () => {return 0}
        }
        if(message==null) {
            let message = "Confirm action"
        }
        setConfirmModal(prev=>{return {isOpen: !prev.isOpen, message, callback}})
    }

    const categoryList = categories?.map((cat) => (
        <CategoryCard
            key={cat.id}
            title={cat.category}
            id={cat.id}
            categoryDelete={categoryDelete}
        />
    ))

    return (
        <>
            <Head>
                <title>CookiePOS | Items</title>
            </Head>
            <GlobalDataProvider>

                <h1 className="text-xl font-bold text-base-content pt-6 pl-6 pb-2">
                    Category
                </h1>

                <div className="flex ml-4 mt-4 items-center">
                    <label
                        onClick={() => setCategoryModal((prev) => !prev)}
                        className="btn btn-sm btn-primary shadow-lg w-44 select-none hover:animate-pulse m-0"
                    >
                        <span>+ Add Category</span>
                    </label>
                    <label
                        onClick={() => setViewType((prev) => !prev)}
                        className={`${
                            viewType ? 'btn-ghost' : 'btn-primary'
                        } btn btn-sm shadow-lg w-12 select-none hover:animate-pulse ml-1`}
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                            </svg>
                        </span>
                    </label>
                </div>

                {categories?.length > 0 ? (
                    viewType ? (
                        <div className="flex flex-col pt-4 pl-4">
                            <div className="flex flex-wrap max-w-3xl">
                                {categoryList}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col pt-4 pl-4">
                            <div className="overflow-x-auto overflow-scroll overflow-y-hidden">
                                <table className="table table-compact table-zebra mt-2">
                                    <thead>
                                        <tr>
                                            <th className="w-24">id</th>
                                            <th className="w-36">Name</th>
                                            <th className="w-36">Icon</th>
                                            <th className="w-24">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((obj) => (
                                            <tr
                                                key={obj.id}
                                                className="group hover:text-accent cursor-pointer"
                                            >
                                                <td>{obj.id}</td>
                                                <td>{obj.category}</td>
                                                <td>{obj.icon}</td>
                                                <td>
                                                    <div className="flex">
                                                        <button
                                                            onClick={() =>
                                                                confirm("Delete category?", ()=>categoryDelete(obj.id))
                                                            }
                                                            className="btn btn-xs btn-error px-2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                                fill="#000000aa"
                                                                className="w-5 h-5"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                ) : (
                    <div className="ml-4 mt-4">
                        <h1 className="opacity-50 ml-2">No Category</h1>
                    </div>
                )}

                <h1 className="text-xl font-bold text-base-content pl-6 pb-2 pt-4">
                    Items
                </h1>

                {items?.length > 0 ? (
                    <div className="flex flex-col pt-4 pl-4 mr-2 max-w-4xl">
                        <label
                            onClick={() => setItemModal((prev) => !prev)}
                            className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse"
                        >
                            <span>+ Add Item</span>
                        </label>
                        <div className="overflow-x-auto overflow-scroll overflow-y-hidden">
                            <table className="table table-compact table-zebra mt-4">
                                <thead>
                                    <tr>
                                        <th className="w-24">id</th>
                                        <th className="w-36">Name</th>
                                        <th className="w-36">Category</th>
                                        <th className="w-24">Stock</th>
                                        <th className="w-24">Price</th>
                                        <th className="w-24">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items?.map((obj) => (
                                        <tr
                                            key={obj.id}
                                            className="group hover:text-accent cursor-pointer"
                                        >
                                            <td onClick={() => {openItemUpdate(obj)}}>{obj.id}</td>
                                            <td onClick={() => {openItemUpdate(obj)}}>{obj.item}</td>
                                            <td onClick={() => {openItemUpdate(obj)}}>
                                                {
                                                    JSON.parse(obj.category)
                                                        .category
                                                }
                                            </td>
                                            <td onClick={() => {openItemUpdate(obj)}}>{obj.stock}</td>
                                            <td onClick={() => {openItemUpdate(obj)}}>{obj.price}</td>
                                            <td>
                                                <div className="flex">
                                                    <button
                                                        onClick={() =>
                                                            confirm("Delete item?", ()=>itemDelete(obj.id))
                                                        }
                                                        className="btn btn-xs btn-error px-2"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="#000000aa"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => {openItemUpdate(obj)}}
                                                        className="btn btn-xs btn-success px-2 ml-1"
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="ml-4 mt-4">
                        <label
                            onClick={() => setItemModal((prev) => !prev)}
                            className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse"
                        >
                            <span>+ Add Item</span>
                        </label>
                        <h1 className="opacity-50 ml-2">No Item</h1>
                    </div>
                )}

                {/* category modal */}
                <div
                    className={`modal modal-bottom sm:modal-middle ${
                        categoryModal && 'modal-open'
                    }`}
                >
                    <div className="modal-box relative">
                        <form onSubmit={categorySubmit}>
                            <h3 className="font-bold text-lg">
                                Add new category
                            </h3>
                            <div className="divider"></div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">
                                        Category Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={categoryForm.category}
                                    onChange={(event) =>
                                        handleCategoryChange(event)
                                    }
                                    placeholder="e.g. drinks"
                                    className="input input-bordered text-base w-full max-w-xs"
                                    required
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-8">
                                <label className="label">
                                    <span className="label-text">
                                        Select Icon
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered"
                                    disabled
                                >
                                    <option disabled defaultValue={'-'}>
                                        Pick one
                                    </option>
                                    <option>Default</option>
                                </select>
                            </div>

                            <div className="modal-action">
                                <label
                                    htmlFor="category-modal"
                                    className="btn bg-none"
                                    onClick={() =>
                                        setCategoryModal((prev) => !prev)
                                    }
                                >
                                    Cancel
                                </label>
                                <button
                                    className="btn btn-success"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* item modal */}
                <div
                    className={`modal modal-bottom sm:modal-middle ${
                        itemModal && 'modal-open'
                    }`}
                >
                    <div className="modal-box relative">
                        <form onSubmit={itemSubmit}>
                            <h3 className="font-bold text-lg">Add new item</h3>
                            <div className="divider"></div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">
                                        Item Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="item"
                                    value={itemForm.item}
                                    onChange={(event) =>
                                        handleItemChange(event)
                                    }
                                    placeholder="e.g. drinks"
                                    className="input input-bordered text-base w-full max-w-xs"
                                    required
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault()
                                        }
                                    }}
                                    value={itemForm.price}
                                    onChange={(event) =>
                                        handleItemChange(event)
                                    }
                                    placeholder="e.g. 25000"
                                    className="input input-bordered text-base w-full max-w-xs"
                                    required
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Stock</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault()
                                        }
                                    }}
                                    value={itemForm.stock}
                                    onChange={(event) =>
                                        handleItemChange(event)
                                    }
                                    placeholder="e.g. 150"
                                    className="input input-bordered text-base w-full max-w-xs"
                                    required
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-8">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    onChange={(event) =>
                                        handleItemChange(event)
                                    }
                                    name="category"
                                    value={itemForm.category}
                                >
                                    <option
                                        value={JSON.stringify(uncategorized)}
                                    >
                                        Uncategorized
                                    </option>
                                    {categories?.map((cat) => (
                                        <option
                                            key={cat.id}
                                            value={JSON.stringify(cat)}
                                        >
                                            {cat.category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-action">
                                <label
                                    htmlFor="category-modal"
                                    className="btn bg-none"
                                    onClick={() =>
                                        setItemModal((prev) => !prev)
                                    }
                                >
                                    Cancel
                                </label>
                                <button
                                    className="btn btn-success"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* item update modal */}
                <div
                    className={`modal modal-bottom sm:modal-middle ${
                        itemUpdateModal && 'modal-open'
                    }`}
                >
                    <div className="modal-box relative">
                        <form>
                            <h3 className="font-bold text-lg">Update {updateItemForm?.item}</h3>
                            <div className="divider"></div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">
                                        Item Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="item"
                                    value={updateItemForm?.item}
                                    onChange={(event) =>
                                        handleItemUpdateChange(event)
                                    }
                                    placeholder="e.g. drinks"
                                    className="input input-bordered text-base w-full max-w-xs"
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault()
                                        }
                                    }}
                                    value={updateItemForm?.price}
                                    onChange={(event) =>
                                        handleItemUpdateChange(event)
                                    }
                                    placeholder="e.g. 25000"
                                    className="input input-bordered text-base w-full max-w-xs"
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Stock</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault()
                                        }
                                    }}
                                    value={updateItemForm?.stock}
                                    onChange={(event) =>
                                        handleItemUpdateChange(event)
                                    }
                                    placeholder="e.g. 150"
                                    className="input input-bordered text-base w-full max-w-xs"
                                />
                            </div>

                            <div className="form-control w-full max-w-xs mb-8">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    onChange={(event) =>
                                        handleItemUpdateChange(event)
                                    }
                                    name="category"
                                    value={updateItemForm?.category}
                                >
                                    <option
                                        value={JSON.stringify(uncategorized)}
                                    >
                                        Uncategorized
                                    </option>
                                    {categories?.map((cat) => (
                                        <option
                                            key={cat.id}
                                            value={JSON.stringify(cat)}
                                        >
                                            {cat.category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-action">
                                <label
                                    className="btn bg-none"
                                    onClick={() =>
                                        setItemUpdateModal((prev) => !prev)
                                    }
                                >
                                    Cancel
                                </label>
                                <button
                                    className="btn btn-success"
                                    onClick={itemUpdate}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* confirm modal */}
                <div
                    className={`modal modal-bottom sm:modal-middle ${
                        confirmModal.isOpen && 'modal-open'
                    }`}
                >
                    <div className="modal-box relative">
                        <div className="flex text-lg font-bold">
                            {confirmModal.message}
                        </div>
                        <div className="modal-action">
                            <label
                                className="btn bg-none"
                                onClick={() =>
                                    setConfirmModal((prev) => !prev)
                                }
                            >
                                Cancel
                            </label>
                            <button
                                className="btn btn-error"
                                onClick={function() {
                                    confirmModal.callback() 
                                    confirm()
                                    }
                                }
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
                
            </GlobalDataProvider>
        </>
    )
}
