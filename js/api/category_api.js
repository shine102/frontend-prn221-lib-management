import config from "./config.js"


const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}


const getAllCategories = () => $.ajax({
    url: `${config.category_api}/GetAll`,
    type: "GET",
    headers: headers,
})


const createCategory = (data) => $.ajax({
    url: config.category_api,
    type: "POST",
    headers: headers,
    data: JSON.stringify(data),
})


const updateCategory = (id, data) => $.ajax({
    url: `${config.category_api}/${id}`,
    type: "PUT",
    headers: headers,
    data: JSON.stringify(data),
})


const deleteCategory = (id) => $.ajax({
    url: `${config.category_api}/${id}`,
    type: "DELETE",
    headers: headers,
})


export default {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}
