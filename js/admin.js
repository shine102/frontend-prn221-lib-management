const loadAllUser = () => $.ajax({
    url: "http://139.59.115.128/api/User/all",
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
            <input type="text" id="username-${user.id}" value="${user.username}">
        </td>
        <td>
            <input type="text" id="phonenumber-${user.id}" value="${user.phoneNumber}">
        </td>
        <td>
            <input type="text" id="book-content-${user.id}" value="${user.credentialCode}">
        </td>
        <td>
            <button id="update-user-${user.id}" class="btn btn-primary">Update</button>
            <button id="delete-user-${user.id}" class="btn btn-danger">Delete</button>
        </td>
    </tr>
`))
}

$(document).ready(async () => {
    if (localStorage.getItem("role") != "Admin") {
        location.href = "index.html"
    }

    loadAllUser()
})
