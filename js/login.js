import config from "./config.js"

$(document).ready(() => {
    $("#login").click(() => {
        var data = {
            "username": $("#username").val(),
            "password": $("#password").val()
        }
        $.ajax({
            url: config.login_api,
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: (data) => {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", $("#username").val())
                localStorage.setItem("phone", data.phone)
                localStorage.setItem("role", data.role)
                if (data.role == "Admin") {
                    window.location.href = "admin.html"
                } else {
                    window.location.href = "Home.html"
                }
            },
            error: (err) => {
                alert(err.statusText)
            }
        })
    })
})