const config = {

    get api_root() { return "http://139.59.115.128/Api" },

    get book_api() { return `${this.api_root}/Book` },

    get category_api() { return `${this.api_root}/Category` },

    get all_user_api() { return `${this.api_root}/User/all` },

    get login_api() { return `${this.api_root}/Auth/login` },

    get user_by_username() { return `${this.api_root}/User?name=` },

    get all_chat() { return `${this.api_root}/Chat/LoadChat` },

    get get_message() { return `${this.api_root}/Chat/LoadMessage` },

    get send_message() { return `${this.api_root}/Chat/SendMessage` },

    get pageSize() { return 6 },

    get chatHub() {return `${this.api_root}/chathub`}
}

export default config

