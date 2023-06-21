$(document).ready(() => {
    $("#login").click(() => {
        var data = {
            "username": $("#username").val(),
            "password": $("#password").val()
        }
        $.ajax({
            url: "http://139.59.115.128/api/Auth/login",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: (data) => {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", $("#username").val())
                localStorage.setItem("phone", data.phone)
                if (data.role == "Admin") {
                    window.location.href = "admin-panel.html"
                } else {
                    window.location.href = "index.html"
                }
            },
            error: (err) => {
                alert(err.statusText)
            }
        })
    })
})