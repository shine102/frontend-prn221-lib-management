$(document).ready(() => {
    if (localStorage.getItem("role") != "User" && localStorage.getItem("role") != "Admin") {
        location.href = "Login.html"
    }
    getBook();
})

const getBook = () => {
    var bookId = localStorage.getItem("CurrentBookId");
    getBookById(bookId);
    getCommentOfBook(bookId);

}

const getBookById = (id) => $.ajax({
    url: `http://139.59.115.128/api/Books/${id}`,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    success: (data) => loadDataToView(data)
});

const getCommentOfBook = (id) => $.ajax({
    url: `http://139.59.115.128/api/Comment?bookID=${id}`,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    success: (data) => loadCommentToView(data)
});

const loadDataToView = (data) => {
    document.getElementById("bookSource").setAttribute("src", data.content);
    document.getElementById("book_title").innerText = data.title;
}

const loadCommentToView = (data) => {
    var subData = data;
    if (data.length > 5) {
        subData = data.slice(data.length - 6, data.length);
    }
    $("#comment_field").html(subData.map((comment) => `
<div class="card p-3 mt-2">

            <div class="d-flex justify-content-between align-items-center">
        
                <div class="user d-flex flex-row align-items-center">
        
        
                    <span><small style="display: block;" class="font-weight-bold text-primary">${comment.username}</small>
                         <small style="display: block;" class="font-weight-bold">${comment.content}</small></span>
                            
        
                </div>
            </div>
        
        
            <div class="action d-flex justify-content-between mt-2 align-items-center">
        
            
        
            </div>
        </div>`))

}

const postComment = () => $.ajax({
    url: `http://139.59.115.128/api/Comment`,
    type: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        content: $(`#content`).val(),
        bookId: parseInt(localStorage.getItem("CurrentBookId")),
        username: localStorage.getItem("username")
    }),
    processData: false,
    contentType: false
}).done(setTimeout(function(){
    ReloadComment();
}, 1000)).fail(error => alert(JSON.stringify(error)))

const ReloadComment = () => {
    var bookId = localStorage.getItem("CurrentBookId");
    getCommentOfBook(bookId);
}








