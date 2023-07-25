const loadAllUser = () => $.ajax({
    url: "http://139.59.115.128/Api/User/All",
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    success: (data)=> loadDataUserForView(data)
})

var loadDataUserForView = (data) => {
    $("#users").prepend(data.map((user) => `
    <tr>
        <th scope="row">${user.id}</td>
        <td>
            <input type="text" readonly="readonly" id="username-${user.id}" value="${user.username}">
        </td>
        <td>
            <input type="text" id="phonenumber-${user.id}" value="${user.phoneNumber}">
        </td>
        <td>
            <input type="text" readonly="readonly" id="book-content-${user.id}" value="${user.credentialCode}">
        </td>
        <td>
            <button onclick="UpdateUser(${user.id})" id="update-user-${user.id}" class="btn btn-primary">Update</button>
            <button onclick="DeleteUser(${user.id})" id="delete-user-${user.id}" class="btn btn-danger">Delete</button>
        </td>
    </tr>
`))
}

const DeleteUser =(id) => $.ajax({
    url: `http://139.59.115.128/Api/User?id=${id}`,
    type: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    success: ()=>location.reload()
})

const UpdateUser =(id) => $.ajax({
    url: `http://139.59.115.128/Api/User`,
    type: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        "id": id,
        "phoneNumber": document.getElementById(`phonenumber-${id}`).value
    }),
    success: ()=> location.reload()
})

const CreateUser = () => $.ajax({
    url: `http://139.59.115.128/Api/User`,
    type: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        "username": document.getElementById("input_username").value,
        "password": document.getElementById("input_password").value,
        "phoneNumber": document.getElementById("input_phone").value,
        "credentialCode": document.getElementById("input_code").value
    }),
    success: ()=> location.reload()
})




$(document).ready(async () => {
    if (localStorage.getItem("role") != "Admin") {
        location.href = "/index.html"
    }

    loadAllUser()
})
