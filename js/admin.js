import config from "./config.js"

const getCategories = () => $.ajax({
    url: config.category_api,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
})

const addCategory = () => $.ajax({
    url: config.category_api,
    type: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        name: $("#category-name").val()
    }),
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

const updateCategory = (id) => $.ajax({
    url: `${config.category_api}/${id}`,
    type: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        name: $(`#category-name-${id}`).val()
    }),
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

const deleteCategory = (id) => $.ajax({
    url: `${config.category_api}/${id}`,
    type: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

const getBooks = () => $.ajax({
    url: config.book_api,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
})

const addBook = () => $.ajax({
    url: config.book_api,
    type: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        title: $("#book-title").val(),
        author: $("#book-author").val(),
        content: $("#book-content").val(),
        categoryId: $("#book-category").val()
    }),
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

const updateBook = (id) => $.ajax({
    url: `${config.book_api}/${id}`,
    type: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        title: $(`#book-title-${id}`).val(),
        author: $(`#book-author-${id}`).val(),
        content: $(`#book-content-${id}`).val(),
        categoryId: $(`#book-category-${id}`).val()
    }),
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

const deleteBook = (id) => $.ajax({
    url: `${config.book_api}/${id}`,
    type: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
}).done(() => location.reload()).fail(error => alert(JSON.stringify(error)))

$(document).ready(async () => {
    if (localStorage.getItem("role") != "Admin") {
        location.href = "index.html"
    }

    var categories = await getCategories()

    var books = await getBooks()

    $("#book-category").html(categories.map((category) => `<option value="${category.id}">${category.name}</option>`))

    $("#categories").prepend(categories.map((category) => `
        <tr>
            <th scope="row">${category.id}</td>
            <td>
                <input type="text" id="category-name-${category.id}" value="${category.name}">
            </td>
            <td>
                <button id="update-category-${category.id}" class="btn btn-primary">Update</button>
                <button id="delete-category-${category.id}" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `))

    $("#books").prepend(books.map((book) => `
        <tr>
            <th scope="row">${book.id}</td>
            <td>
                <input type="text" id="book-title-${book.id}" value="${book.title}">
            </td>
            <td>
                <input type="text" id="book-author-${book.id}" value="${book.author}">
            </td>
            <td>
                <textarea id="book-content-${book.id}" cols="50" rows="1">${book.content}</textarea>
            </td>
            <td>
                <select id="book-category-${book.id}">
                    ${categories.map((category) => `<option value="${category.id}" ${category.id == book.categoryId ? "selected" : ""}>${category.name}</option>`)}
                </select>
            </td>
            <td>
                <button id="update-book-${book.id}" class="btn btn-primary">Update</button>
                <button id="delete-book-${book.id}" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    `))

    $("#add-category").click(addCategory)
    categories.forEach((category) => {
        $(`#update-category-${category.id}`).click(() => updateCategory(category.id))
        $(`#delete-category-${category.id}`).click(() => deleteCategory(category.id))
    })

    $("#add-book").click(addBook)
    books.forEach((book) => {
        $(`#update-book-${book.id}`).click(() => updateBook(book.id))
        $(`#delete-book-${book.id}`).click(() => deleteBook(book.id))
    })

})
