const config = {

    get api_root() { return "http://139.59.115.128/api" },

    get book_api() { return `${this.api_root}/Books` },

    get category_api() { return `${this.api_root}/Category` },

    get all_user_api(){ return `${this.api_root}/User/all`},

    get login_api() { return `${this.api_root}/Auth/login` },

    get user_by_username() { return `${this.api_root}/User?username=` },

    get all_chat() { return `${this.api_root}/Chat/loadChat` },

    get get_message() { return `${this.api_root}/Chat/loadMessage` },

    get send_message() { return `${this.api_root}/Chat/sendMessage` },
}

export default config
