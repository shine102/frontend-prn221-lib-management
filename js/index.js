import book_api from "./api/book_api.js"

$(document).ready(async () => {
    if (!localStorage.getItem("role")) {
        location.href = "/login.html"
    }

    const url = new URL(location.href)

    const title = url.searchParams.get("title")
    const author = url.searchParams.get("author")
    const category = url.searchParams.get("category")
    const page = url.searchParams.get("page") || 1

    const books = await book_api.searchBooks(title, author, category, page)
    const count = await book_api.countBooks(title, author, category)
    const pageCount = await book_api.getPageCount(title, author, category)


    $("#books").html(books.map((book) => `
        <p><img src="${book.image}" width="100px"></p>
        <p>${book.title}</p>
        <p>${book.author}</p>
        <a href="">Read</a>
    `)).append(`<p>${count}</p>`)

    $("#pagination").html(Array.from(Array(pageCount).keys()).map((index) => {
        var url = new URL(location.href)
        url.searchParams.set("page", index + 1)
        return `<a href="${url}">${index + 1}</a>`
    }))
})