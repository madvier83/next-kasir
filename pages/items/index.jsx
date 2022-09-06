import React, {useEffect, useState} from "react"
import Navbar from "../../components/Navbar"
import Drawer from "../../components/Drawer"
import ItemCard from "../../components/ItemCard"
import CategoryCard from "../../components/CategoryCard"
import Head from "next/head"
import { nanoid } from "nanoid"

export default function Items() {
    const [viewType, setViewType] = useState(false)
    const [categories, setCategories] = useState([])
    const [items, setItems] = useState([])
    const [categoryModal, setCategoryModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const [itemUpdateModal, setItemUpdateModal] = useState(false)
    
    const initialCategoryForm = {
        id: nanoid(6),
        category: "",
        icon: "default"
    }
    const [categoryForm, setCategoryForm] = useState(initialCategoryForm)

    const uncategorized = {
        id: null,
        category: "Uncategorized",
        icon: "default"
    }
    const initialItemForm = {
        id: nanoid(6),
        item: "",
        price: "",
        stock: "",
        category: JSON.stringify(uncategorized),
    }
    const [itemForm, setItemForm] = useState(initialItemForm)
    const [updateItemForm, setUpdateItemForm] = useState(initialItemForm)

    function categoryInit() {
        let cat = window.localStorage.getItem("categories")
        if(cat===null) {
            let categories = []
            categories = JSON.stringify(categories)
            window.localStorage.setItem("categories", categories)
            cat = window.localStorage.getItem("categories")
        }
        cat = JSON.parse(cat)
        setCategories(cat)
    }
    function itemInit() {
        let items = window.localStorage.getItem("items")
        if(items===null) {
            let item = []
            item = JSON.stringify(item)
            window.localStorage.setItem("items", item)
            items = window.localStorage.getItem("items")
        }
        items = JSON.parse(items)
        setItems(items)
    }

    useEffect(()=>{
        categoryInit();
        itemInit()

    console.log(window.localStorage.getItem("theme"))
    }, [])

    function handleCategoryChange(event) {
        const {name, value} = event.target
        setCategoryForm(prevCategoryForm => {
            return {
                ...prevCategoryForm,
                [name]: value
            }
        })
    }
    function handleItemChange(event) {
        const {name, value} = event.target
        setItemForm(prevItemForm => {
            return {
                ...prevItemForm,
                [name]: value
            }
        })
    }
    function handleItemUpdateChange(event) {
        const {name, value} = event.target
        setUpdateItemForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    function categorySubmit(event) {
        event.preventDefault()
        let newCategory = categories
        newCategory.unshift(categoryForm)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem("categories", newCategory)
        setCategoryForm(initialCategoryForm)
        setCategoryModal(prev=>!prev)
    }
    function itemSubmit(event) {
        event.preventDefault()
        let newItem = items
        newItem.unshift(itemForm)
        newItem = JSON.stringify(newItem)
        window.localStorage.setItem("items", newItem)
        setItemForm(initialItemForm)
        setItemModal(prev=>!prev)
    }
    function itemUpdate(event) {
        event.preventDefault()
        let newItems = []
        let updateItem = updateItemForm
        for(let i=0; i<items.length; i++) {
            if(items[i].id != updateItem.id) {
                newItems.push(items[i])
            }else{
                newItems.unshift(updateItem)
            }
        }
        window.localStorage.setItem("items", JSON.stringify(newItems))
        itemInit()
        setItemUpdateModal(prev=>!prev)
    }
    function categoryDelete(id) {
        let newCategory = categories
        newCategory = newCategory.filter(cat=>cat.id!==id)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem("categories", newCategory)
        categoryInit()
    }
    function itemDelete(id) {
        console.log(id)
        const newItems = []
        for(let i=0; i<items.length; i++) {
            if(items[i].id != id) {
                newItems.push(items[i])
            }
        }
        setItems(newItems)
        window.localStorage.setItem("items", JSON.stringify(newItems))
    }

    const categoryList = categories?.map(cat=>
        <CategoryCard 
            key={cat.id} 
            title={cat.category} 
            id={cat.id}
            categoryDelete={categoryDelete}
        />
    )
    const itemList = items?.map(item=>
        <ItemCard
            key={item.id}
            item={item}
        />
    )
    return (
        <>
            <Head>
                <title>Items</title>
            </Head>
            <Navbar/>
            <Drawer>
                <div className="tabs tabs-boxed w-44 flex ml-4 mt-4">
                    <a className={`tab w-1/2 ${!viewType&&"tab-active"}`} onClick={()=>setViewType(prev=>!prev)}>Table</a> 
                    <a className={`tab w-1/2 ${viewType&&"tab-active"}`} onClick={()=>setViewType(prev=>!prev)}>Preview</a> 
                </div>
                <div className="p-2 flex"></div>

                    <h1 className="text-2xl font-bold text-base-content pt-2 pl-6 pb-2">Category</h1>
                    {categories?.length>0 ? viewType ? (
                        <div className="flex flex-wrap pt-4 pl-4">
                            {categoryList}
                            <label 
                                onClick={()=>setCategoryModal(prev=>!prev)}
                                className="btn text-neutral-content bg-base-200 hover:bg-accent border-accent hover:border-accent-focus no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-14 border-l-4 active:border-l-0 duration-100 select-none hover:animate-pulse">
                                <span>+ Add Category</span>
                            </label>
                        </div>
                    ) : (
                        <div className="flex flex-col pt-4 pl-4">
                            <label 
                                onClick={()=>setCategoryModal(prev=>!prev)}
                                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse">
                                <span>+ Add Category</span>
                            </label>
                            <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th className="w-24">id</th>
                                    <th className="w-36">Name</th>
                                    <th className="w-24">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories?.map(obj=>
                                    <tr key={obj.id} className="group hover:text-accent cursor-pointer">   
                                        <td>{obj.id}</td>
                                        <td>{obj.category}</td>
                                        
                                        <td>
                                            <div className="flex">
                                                <button onClick={()=>categoryDelete(obj.id)} className="btn btn-xs btn-error px-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000000aa" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-4 mt-4">
                            <label 
                                onClick={()=>setCategoryModal(prev=>!prev)}
                                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse">
                                <span>+ Add Category</span>
                            </label>
                            <h1 className="opacity-50 ml-2">// No Category</h1>
                        </div>
                    )}

                    <h1 className="text-2xl font-bold text-base-content pl-6 pb-2 pt-6">Items</h1>
                        
                    {items?.length>0 ? viewType ? (
                        <div className="flex flex-wrap p-4">
                            {itemList}
                            <label 
                                htmlFor="category-modal"
                                onClick={()=>setItemModal(prev=>!prev)}
                                className="btn border-primary text-neutral-content hover:text-neutral-content hover:border-x-primary-focus hover:bg-primary btn-outline no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-36 border-l-4 active:border-l-0 duration-100 select-none hover:animate-pulse">
                                <span>+ Add Item</span>
                            </label>
                        </div>
                    ) : (
                        <div className="flex flex-col pt-4 pl-4">
                            <label 
                                onClick={()=>setItemModal(prev=>!prev)}
                                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse">
                                <span>+ Add Item</span>
                            </label>
                            <div className="overflow-x-auto">
                            <table className="table table-zebra mb-64">
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
                                {items?.map(obj=>
                                    <tr key={obj.id} className="group hover:text-accent cursor-pointer">   
                                        <td>{obj.id}</td>
                                        <td>{obj.item}</td>
                                        <td>{JSON.parse(obj.category).category}</td>
                                        <td>{obj.stock}</td>
                                        <td>{obj.price}</td>
                                        <td>
                                            <div className="flex">
                                                <button onClick={()=>itemDelete(obj.id)} className="btn btn-xs btn-error px-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#000000aa" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <button 
                                                    onClick={()=>{
                                                    setItemUpdateModal(prev=>!prev)
                                                    setUpdateItemForm(obj)
                                                    }} 
                                                    className="btn btn-xs btn-success px-2 ml-1"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-4 mt-4">
                            <label 
                                onClick={()=>setItemModal(prev=>!prev)}
                                className="btn btn-sm btn-primary shadow-lg mb-2 mr-2 w-44 select-none hover:animate-pulse">
                                <span>+ Add Item</span>
                            </label>
                            <h1 className="opacity-50 ml-2">// No Item</h1>
                        </div>
                    )}


                     {/* category modal */}
                    <div className={`modal modal-bottom sm:modal-middle ${categoryModal&&"modal-open"}`}>
                        <div className="modal-box relative">
                            <form>

                            <h3 className="font-bold text-lg">Add new category</h3>
                            <div className="divider"></div>
                            
                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Category Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="category"
                                    value={categoryForm.category}
                                    onChange={(event)=>handleCategoryChange(event)}
                                    placeholder="e.g. drinks"
                                    className="input input-bordered text-base w-full max-w-xs" 
                                    required
                                />
                            </div>
                            
                            <div className="form-control w-full max-w-xs mb-8">
                                <label className="label">
                                    <span className="label-text">Select Icon</span>
                                </label>
                                <select className="select select-bordered" disabled>
                                    <option disabled defaultValue={""}>Pick one</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes</option>
                                    <option>Star Trek</option>
                                </select>
                            </div>

                            <div className="modal-action">
                                <label htmlFor="category-modal" className="btn bg-none" onClick={()=>setCategoryModal(prev=>!prev)}>Cancel</label>
                                <button className="btn btn-success" onClick={categorySubmit}>Save</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    {/* item modal  */}
                    <div className={`modal modal-bottom sm:modal-middle ${itemModal&&"modal-open"}`}>
                        <div className="modal-box relative">
                            <form>
                            <h3 className="font-bold text-lg">Add new item</h3>
                            <div className="divider"></div>
                            
                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Item Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="item"
                                    value={itemForm.item}
                                    onChange={(event)=>handleItemChange(event)}
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
                                                    event.preventDefault();
                                                    }
                                                }}
                                    value={itemForm.price}
                                    onChange={(event)=>handleItemChange(event)}
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
                                                    event.preventDefault();
                                                    }
                                                }}
                                    value={itemForm.stock}
                                    onChange={(event)=>handleItemChange(event)}
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
                                    onChange={(event)=>handleItemChange(event)}
                                    name="category"
                                    value={itemForm.category}
                                >
                                    <option value={JSON.stringify(uncategorized)}>Uncategorized</option>
                                    {categories?.map(cat=><option key={cat.id} value={JSON.stringify(cat)}>{cat.category}</option>)}
                                </select>
                            </div>

                            <div className="modal-action">
                                <label htmlFor="category-modal" className="btn bg-none" onClick={()=>setItemModal(prev=>!prev)}>Cancel</label>
                                <button className="btn btn-success" onClick={itemSubmit}>Save</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    {/* item update modal  */}
                    <div className={`modal modal-bottom sm:modal-middle ${itemUpdateModal&&"modal-open"}`}>
                        <div className="modal-box relative">
                            <form>
                            <h3 className="font-bold text-lg">Update item</h3>
                            <div className="divider"></div>
                            
                            <div className="form-control w-full max-w-xs mb-2">
                                <label className="label">
                                    <span className="label-text">Item Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="item"
                                    value={updateItemForm?.item}
                                    onChange={(event)=>handleItemUpdateChange(event)}
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
                                                    event.preventDefault();
                                                    }
                                                }}
                                    value={updateItemForm?.price}
                                    onChange={(event)=>handleItemUpdateChange(event)}
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
                                                    event.preventDefault();
                                                    }
                                                }}
                                    value={updateItemForm?.stock}
                                    onChange={(event)=>handleItemUpdateChange(event)}
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
                                    onChange={(event)=>handleItemUpdateChange(event)}
                                    name="category"
                                    value={updateItemForm?.category}
                                >
                                    <option value={JSON.stringify(uncategorized)}>Uncategorized</option>
                                    {categories?.map(cat=><option key={cat.id} value={JSON.stringify(cat)}>{cat.category}</option>)}
                                </select>
                            </div>

                            <div className="modal-action">
                                <label className="btn bg-none" onClick={()=>setItemUpdateModal(prev=>!prev)}>Cancel</label>
                                <button className="btn btn-success" onClick={itemUpdate}>Save</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    {/* end modal */}
            </Drawer>
        </>
    )
}