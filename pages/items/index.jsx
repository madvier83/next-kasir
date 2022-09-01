import React, {useEffect, useState} from "react"
import Navbar from "../../components/Navbar"
import Drawer from "../../components/Drawer"
import ItemCard from "../../components/ItemCard"
import CategoryCard from "../../components/CategoryCard"
import Head from "next/head"
import { nanoid } from "nanoid"

export default function Items() {
    const [categories, setCategories] = useState()
    const [categoryModal, setCategoryModal] = useState(false)
    const initialCategoryForm = {
        id: nanoid(),
        category: "",
        icon: "default"
    }
    const [categoryForm, setCategoryForm] = useState(initialCategoryForm)

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
    useEffect(()=>{
        categoryInit();
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        setCategoryForm(prevCategoryForm => {
            return {
                ...prevCategoryForm,
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
    function categoryDelete(id) {
        let newCategory = categories
        newCategory = newCategory.filter(cat=>cat.id!==id)
        newCategory = JSON.stringify(newCategory)
        window.localStorage.setItem("categories", newCategory)
        categoryInit()
    }

    const categoryList = categories?.map(cat=>(
        <CategoryCard 
            key={cat.id} 
            title={cat.category} 
            id={cat.id}
            categoryDelete={categoryDelete}
        />
        )
    )
    return (
        <>
            <Head>
                <title>Items</title>
            </Head>
            {/* modal  */}
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
                            onChange={(event)=>handleChange(event)}
                            placeholder="e.g. drinks"
                            className="input input-bordered text-base w-full max-w-xs" 
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

            <Navbar/>
            <Drawer>
                <div className="p-2 flex"></div>
                <h1 className="text-2xl font-bold text-base-content pt-2 pl-6 pb-2">Category</h1>
                    <div className="flex flex-wrap p-4">
                        <label 
                            onClick={()=>setCategoryModal(prev=>!prev)}
                            className="btn btn-accent btn-outline no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-14 border-l-4 active:border-l-0 duration-100 select-none">
                            <span>+ Add Category</span>
                        </label>
                        
                        {categoryList}

                    </div>
                <h1 className="text-2xl font-bold text-base-content pt-2 pl-6 pb-2">Items</h1>
                    <div className="flex flex-wrap p-4">
                        <label 
                            htmlFor="category-modal"
                            className="btn border-primary text-neutral-content hover:border-x-primary-focus hover:bg-primary btn-outline no-animation rounded-2xl shadow-lg mb-2 mr-2 w-48 h-40 border-l-4 active:border-l-0 duration-100 select-none">
                            <span>+ Add Item</span>
                        </label>

                        <ItemCard/>
                        <ItemCard/>
                        <ItemCard/>
                        <ItemCard/>
                        <ItemCard/>
                        
                    </div>
            </Drawer>
        </>
    )
}