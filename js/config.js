const config = {

    get api_root() { return "http://139.59.115.128/api/Books" },

    get book_api() { return `${this.api_root}/Books` },

    get category_api() { return `${this.api_root}/Category` },
}

export default config
