import config from "./config.js"


const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}


const getBooks = () => $.ajax({
    url: config.book_api,
    type: "GET",
    headers: headers,
})


const addBook = (data) => $.ajax({
    url: config.book_api,
    type: "POST",
    headers: headers,
    data: JSON.stringify(data),
})


const updateBook = (id, data) => $.ajax({
    url: `${config.book_api}/${id}`,
    type: "PUT",
    headers: headers,
    data: JSON.stringify(data),
})


const deleteBook = (id) => $.ajax({
    url: `${config.book_api}/${id}`,
    type: "DELETE",
    headers: headers,
})


export default {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}
