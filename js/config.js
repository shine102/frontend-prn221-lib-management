const config = {

    get api_root() { return "http://139.59.115.128/api/" },

    get book_api() { return `${this.api_root}/Books` },

    get category_api() { return `${this.api_root}/Category` },

    get all_user_api(){ return `${this.api_root}/User/all`}
}

export default config
