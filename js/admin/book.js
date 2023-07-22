import  book_api from "../api/book_api.js"
import  category_api from "../api/category_api.js"


const loadCategories = async () => {

    const getCategories = category_api.getCategories

    const addCategory = () => category_api
        .addCategory({
            name: $(`#category-name`).val(),
        })
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const updateCategory = (id) => category_api
        .updateCategory(id, {
            name: $(`#category-name-${category.id}`).val(),
        })
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const deleteCategory = (id) => category_api
        .deleteCategory(id)
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const categories = await getCategories()

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

    $("#add-category").click(addCategory)
    categories.forEach((category) => {
        $(`#update-category-${category.id}`).click(() => updateCategory(category.id))
        $(`#delete-category-${category.id}`).click(() => deleteCategory(category.id))
    })

    return categories
}


const loadBooks = async (categories) => {

    const getBooks = book_api.getBooks

    const addBook = () => book_api
        .addBook({
            title: $("#book-title").val(),
            image: $("#book-image").val(),
            author: $("#book-author").val(),
            content: $("#book-content").val(),
            categoryId: $("#book-category").val(),
        })
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const updateBook = (id) => book_api
        .updateBook(id, {
            title: $(`#book-title-${id}`).val(),
            image: $(`#book-image-${id}`).val(),
            author: $(`#book-author-${id}`).val(),
            content: $(`#book-content-${id}`).val(),
            categoryId: $(`#book-category-${id}`).val(),
        })
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const deleteBook = (id) => book_api
        .deleteBook(id)
        .done(() => location.reload())
        .fail(error => alert(JSON.stringify(error)))

    const books = await getBooks()

    $("#book-category").html(categories.map((category) => `<option value="${category.id}">${category.name}</option>`))

    $("#books").prepend(books.map((book) => `
        <tr>
            <th scope="row">${book.id}</td>
            <td>
                <input type="text" id="book-title-${book.id}" value="${book.title}">
            </td>
            <td>
                <input type="text" id="book-image-${book.id}" value="${book.image}">
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

    $("#add-book").click(addBook)
    books.forEach((book) => {
        $(`#update-book-${book.id}`).click(() => updateBook(book.id))
        $(`#delete-book-${book.id}`).click(() => deleteBook(book.id))
    })
}


$(document).ready(() => {
    if (localStorage.getItem("role") != "Admin") {
        location.href = "/index.html"
    }

    loadCategories().then(loadBooks)
})
