import config from "./config.js"


const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}


const getCategories = () => $.ajax({
    url: config.category_api,
    type: "GET",
    headers: headers,
})


const addCategory = (data) => $.ajax({
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
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}
