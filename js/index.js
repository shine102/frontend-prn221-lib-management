import book_api from "./api/book_api.js"
import category_api from "./api/category_api.js"

$(document).ready(async () => {
    if (!localStorage.getItem("role")) {
        location.href = "/login.html"
    }

    const url = new URL(location.href)

    const paramTitle = url.searchParams.get("title")
    const paramAuthor = url.searchParams.get("author")
    const paramCategory = url.searchParams.get("category")
    const paramPage = url.searchParams.get("page") || 1

    const categories = await category_api.getAllCategories()
    const books = await book_api.searchBooks(paramTitle, paramAuthor, paramCategory, paramPage)
    const count = await book_api.countBooks(paramTitle, paramAuthor, paramCategory)
    const pageCount = await book_api.getPageCount(paramTitle, paramAuthor, paramCategory)

    $("#categories").html(categories.map((category) => {
        const url = new URL(location.href)
        url.searchParams.delete("page")
        const selected = paramCategory == category.id
        if (selected) {
            url.searchParams.delete("category")
        }
        else {
            url.searchParams.set("category", category.id)
        }
        return `
            <a href="${url}" class="m-1 btn ${selected ? "btn-success" : "btn-outline-success"}">
                ${category.name}
            </a>
        `
    }))

    $("#title").val(paramTitle)
    $("#author").val(paramAuthor)
    $("#search").click(() => {
        const url = new URL(location.href)
        url.searchParams.delete("page")
        url.searchParams.set("title", $("#title").val())
        url.searchParams.set("author", $("#author").val())
        location.href = url
    })

    $("#count").text(`There are ${count} books`)

    $("#books").html(books.map((book) => {
        const _categories = categories.filter(category => category.id == book.categoryId);
        const _category = _categories.length > 0 ? _categories[0].name : ""
        return `
            <div class="col-4 border border-dark border-1">
                <p><img src="${book.image}" class="img-fluid"></p>
                <h3 class="text-center">${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${_category}</p>
                <p><a href="" class="btn btn-outline-success">Read</a></p>
            </div>
        `
    }))

    $("#pagination").html(Array.from(Array(pageCount).keys()).map((index) => {
        const url = new URL(location.href)
        url.searchParams.set("page", index + 1)
        return `
            <a href="${url}" class="m-1 btn ${paramPage == index + 1 ? "btn-success" : "btn-outline-success"}">
                ${index + 1}
            </a>
        `
    }))
})