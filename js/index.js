import book_api from "./api/book_api.js"
import { getQuery } from "./utils.js"

$(document).ready(async () => {
    if (!localStorage.getItem("role")) {
        location.href = "/login.html"
    }

    const title = getQuery("title")
    const author = getQuery("author")
    const category = getQuery("category")
    const page = getQuery("page") || 1;

    const books = await book_api.searchBooks(title, author, category, page);

    $("#books").html(books.map((book) => `
        <p><img src="${book.image}" width="100px"></p>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <a href="">Read</a>
    `))
})