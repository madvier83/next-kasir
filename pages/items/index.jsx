import React, {useEffect, useState} from "react"
import Navbar from "../../components/Navbar"
import Drawer from "../../components/Drawer"
import ItemCard from "../../components/ItemCard"
import CategoryCard from "../../components/CategoryCard"
import Head from "next/head"
import { nanoid } from "nanoid"

export default function Items() {
    const [categories, setCategories] = useState()
    const [items, setItems] = useState()
    const [categoryModal, setCategoryModal] = useState(false)
    const [itemModal, setItemModal] = useState(false)
    const initialCategoryForm = {
        id: nanoid(),
        category: "",
        icon: "default"
    }
    const [categoryForm, setCategoryForm] = useState(initialCategoryForm)
    const initialItemForm = {
        id: nanoid(),
        item: "",
        price: "",
        stock: "",
        category: "uncategorized",
    }
    const [itemForm, setItemForm] = useState(initialItemForm)

    function categoryInit() {
        let cat = window.localStorage.getItem("categories")
        if(cat===null) {
            let categories = [{
                id:nanoid(),
                category:"General",
                icon:"default"
            }]
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
    function categoryDelete(id) {
        let newCategory = categories
        newCategory = newCategory.filter(cat=>cat.id!==id)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem("categories", newCategory)
        categoryInit()
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
                        >
                            <option disabled value={itemForm.category}>Pick One Category</option>
                            {categories?.map(cat=><option key={cat.id} value={cat.id}>{cat.category}</option>)}
                        </select>
                    </div>

                    <div className="modal-action">
                        <label htmlFor="category-modal" className="btn bg-none" onClick={()=>setItemModal(prev=>!prev)}>Cancel</label>
                        <button className="btn btn-success" onClick={itemSubmit}>Save</button>
                    </div>
                    </form>
                </div>
            </div>
            {/* end modal */}

            <Navbar/>
            <Drawer>
                <div className="p-2 flex"></div>
                <h1 className="text-2xl font-bold text-base-content pt-2 pl-6 pb-2">Category</h1>
                    <div className="flex flex-wrap pt-4 pl-4">
                        
                        {categoryList}
                        <label 
                            onClick={()=>setCategoryModal(prev=>!prev)}
                            className="btn text-neutral-content bg-base-200 hover:bg-accent border-accent hover:border-accent-focus no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-14 border-l-4 active:border-l-0 duration-100 select-none hover:animate-pulse">
                            <span>+ Add Category</span>
                        </label>

                    </div>
                <h1 className="text-2xl font-bold text-base-content pl-6 pb-2 pt-2">Items</h1>
                    <div className="flex flex-wrap p-4">
                        
                        {itemList}
                        <label 
                            htmlFor="category-modal"
                            onClick={()=>setItemModal(prev=>!prev)}
                            className="btn border-primary text-neutral-content hover:text-neutral-content hover:border-x-primary-focus hover:bg-primary btn-outline no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-36 border-l-4 active:border-l-0 duration-100 select-none hover:animate-pulse">
                            <span>+ Add Item</span>
                        </label>

                    </div>
            </Drawer>
        </>
    )
}