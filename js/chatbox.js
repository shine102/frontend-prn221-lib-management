import getdata from "./getdata.js";
import config from "./api/config.js";

$(document).ready(function () {
    var chatid = getdata("chatid");
    var partnerid = getdata("partnerid");
    var partnername = getdata("partnername");

    $('#fullname').append(partnername)

    $.ajax({
        url: config.get_message,
        type: "POST",
        data: JSON.stringify({
            "chatId": chatid,
            "ownerId": localStorage.getItem("id"),
            "partnerId": partnerid
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: (data) => {
            $('#msgBody').empty()
            data.forEach(element => {
                if (element.sender_name !== localStorage.getItem("username")) {
                    var html = `<div style=" padding-right: 50px">
                        <p style="text-align: left;max-width:500px; height:auto;color:#12160b;background-color:#efef91; word-wrap:break-word; display:inline-block;
                                    padding:5px; width:70%; ">${element.content}</p>
                        </div>`
                    $('#msgBody').append(html)
                } else {
                    var html = `<div style=' padding-left: 150px'>
                        <p style='text-align: left;max-width:500px;height:auto;color:#12160b;background-color:#e0e0e0; word-wrap:break-word; display:inline-block;
                                    padding:5px; width:100%;'>${element.content}</p>
                        </div>`
                    $('#msgBody').append(html)
                }

            })

        },
        error: (err) => {
            alert(err.statusText)
        }
    });
});