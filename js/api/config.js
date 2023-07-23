const config = {

    get api_root() { return "http://localhost:5126/Api" },

    get book_api() { return `${this.api_root}/Book` },

    get category_api() { return `${this.api_root}/Category` },

    get all_user_api() { return `${this.api_root}/User/all` },

    get login_api() { return `${this.api_root}/Auth/login` },

    get user_by_username() { return `${this.api_root}/User?username=` },

    get all_chat() { return `${this.api_root}/Chat/loadChat` },

    get get_message() { return `${this.api_root}/Chat/loadMessage` },

    get send_message() { return `${this.api_root}/Chat/sendMessage` },

    get pageSize() { return 6 },
}

export default config

