import config from "./api/config.js";
import getdata from "./getdata.js";

const connection = new signalR.HubConnectionBuilder().withUrl(config.chatHub).withAutomaticReconnect().build();
var chatId = getdata("chatid");
var userId = localStorage.getItem("id");
var partnerId = getdata("partnerid");

connection.on("ReceiveMessage", (user, message) => {
    if (user != userId) {
        const encodedMessage = encodeHTML(message);
        const messageElement = `<div style=" padding-right: 50px">
                            <p style="text-align: left;max-width:500px; height:auto;color:#12160b;background-color:#efef91; word-wrap:break-word; display:inline-block;
                                        padding:5px; width:70%; ">${encodedMessage}</p>
                            </div>`
        $("#msgBody").append(messageElement);
    }
});

// connection start then join group
connection.start()
    .then(() => joinPrivateChat(chatId))
    .then(() => {
        $("#send").click(function () {
            const message = document.getElementById("message").value;
            if (message) {
                connection.invoke("SendMessage", userId, partnerId, message, chatId).catch(err => console.error(err.toString()));
                $("#message").val("");
                var html = `<div style=' padding-left: 150px'>
            <p style='text-align: left;max-width:500px;height:auto;color:#12160b;background-color:#e0e0e0; word-wrap:break-word; display:inline-block;
                        padding:5px; width:100%;'>${message}</p>
            </div>`
                $('#msgBody').append(html)
            }
        })
    })
    .catch(err => console.error(err.toString()));


function encodeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


function joinPrivateChat(chatId) {
    return connection.invoke("JoinPrivateChat", chatId)
        .then(() => {
            console.log("Chat Id: " + chatId)
            console.log("Joined private chat with " + userId);
        })
        .catch(err => console.error(err.toString()));
}


function leavePrivateChat(chatId) {
    return connection.invoke("LeavePrivateChat", chatId)
        .then(() => {
            console.log("Left private chat with " + userId);
        })
        .catch(err => console.error(err.toString()));
}
