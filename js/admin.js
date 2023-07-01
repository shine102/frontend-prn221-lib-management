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
}).then(location.reload).catch(alert)

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
}).then(location.reload).catch(alert)

const deleteCategory = (id) => $.ajax({
    url: `${config.category_api}/${id}`,
    type: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
}).then(location.reload).catch(alert)

const getBooks = () => $.ajax({
    url: config.book_api,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
})

const addBook = () => {
    $.ajax({
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
    }).then(location.reload).catch(alert)
}

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
}).then(location.reload).catch(alert)

const deleteBook = (id) => $.ajax({
    url: `${config.book_api}/${id}`,
    type: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
}).then(location.reload).catch(alert)

$(document).ready(async () => {
    if (localStorage.getItem("role") != "Admin") {
        location.href = "index.html"
    }

    var categories = [
        {
            id: 1,
            name: "Category 1"
        },
        {
            id: 2,
            name: "Category 2"
        },
    ]

    var books = [
        {
            id: 1,
            title: "Book 1",
            author: "Author 1",
            content: "Content 1",
            categoryId: 1
        },
        {
            id: 2,
            title: "Book 2",
            author: "Author 2",
            content: "Content 2",
            categoryId: 2
        },
    ]

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
                <input type="text" id="book-content-${book.id}" value="${book.content}">
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
