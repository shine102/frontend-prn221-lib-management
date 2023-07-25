var userId;
$(document).ready(() => {
    if (localStorage.getItem("role") != "Student" && localStorage.getItem("role") != "Admin") {
        location.href = "Login.html"
    }
    getUserProfile(localStorage.getItem("username"));
})


const getUserProfile = (name) => $.ajax({
    url: `http://139.59.115.128/api/User?name=${name}`,
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    success: (data) => loadDataToView(data)
});

const loadDataToView = (data) => {
    userId = data.id;
    document.getElementById("UserName").innerText = data.username;
    document.getElementById("Phone").innerText = data.phoneNumber;
    document.getElementById("input_user_name").setAttribute("placeholder", data.username);
    document.getElementById("input_phone").setAttribute("placeholder", data.phoneNumber)
}

const updateProfile = () => $.ajax({
    url: `http://139.59.115.128/Api/User`,
    type: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    data: JSON.stringify({
        "id": userId,
        "phoneNumber": document.getElementById("input_phone").value
    }),
    success: () => { alert("Update Successfully !");getUserProfile(localStorage.getItem("username")); }
})