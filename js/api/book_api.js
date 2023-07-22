import config from "./config.js"


const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
}


const getAllBooks = () => $.ajax({
    url: `${config.book_api}/GetAll`,
    type: "GET",
    headers: headers,
})


const countAllBooks = () => $.ajax({
    url: `${config.book_api}/CountAll`,
    type: "GET",
    headers: headers,
})


const searchBooks = (title, author, categoryId, page) => {
    const url = new URL(`${config.book_api}/Search`)

    url.searchParams.set('page', page)
    url.searchParams.set('pageSize', config.pageSize)

    if (title) url.searchParams.set('title', title);
    if (author) url.searchParams.set('author', author);
    if (categoryId) url.searchParams.set('categoryId', categoryId);

    return $.ajax({
        url: url,
        type: "GET",
        headers: headers,
    })
}


const countBooks = (title, author, categoryId) => {
    const url = new URL(`${config.book_api}/Count`)

    if (title) url.searchParams.set('title', title);
    if (author) url.searchParams.set('author', author);
    if (categoryId) url.searchParams.set('categoryId', categoryId);

    return $.ajax({
        url: url,
        type: "GET",
        headers: headers,
    })
}

const getPageCount = (title, author, categoryId) => {
    return countBooks(title, author, categoryId).then(count => Math.ceil(count / config.pageSize))
}

const createBook = (data) => $.ajax({
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
    getAllBooks,
    countAllBooks,
    searchBooks,
    countBooks,
    getPageCount,
    createBook,
    updateBook,
    deleteBook
}
