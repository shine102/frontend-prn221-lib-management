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


const searchBooks = (title, author, categoryId, page) => {
    let url = `${config.book_api}/Search?page=${page}&pageSize=${config.pageSize}`

    if (title) url += `&title=${title}`
    if (author) url += `&author=${author}`
    if (categoryId) url += `&categoryId=${categoryId}`

    return $.ajax({
        url: url,
        type: "GET",
        headers: headers,
    })
}

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
    searchBooks,
    addBook,
    updateBook,
    deleteBook
}
