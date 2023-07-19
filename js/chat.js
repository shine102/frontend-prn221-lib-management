import config from "./config.js"


$(document).ready(() => {
    var data = {
        "userId": localStorage.getItem("id"),
    }

    // get user id
    $.ajax({
        url: config.user_by_username + localStorage.getItem("username"),
        type: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: (data) => {
            localStorage.setItem("id", data.id)
        },
        error: (err) => {
            alert(err.statusText)
        }
    })

    $.ajax({
        url: config.all_chat,
        type: "POST",
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: (data) => {
            data.forEach(element => {
                var html = `
                    <tr>
                            <td class="text-center">${element.chatID}</td>
                            <td class="text-center">${element.partner_username}</td>
                            <td class="text-center">${element.lastMessage}</td>
                            <td class="text-center"><a href="chatbox.html?chatid=${element.chatID}&partnerid=${element.partner_id}&partnername=${element.partner_username}"><button class="btn btn-outline-success">Chat</button></a></td>
                    </tr>`
                $("#chat_list").append(html)
            });
        },
        error: (err) => {
            alert(err.statusText)
        }
    })
})
