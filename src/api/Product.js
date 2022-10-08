const url = "http://localhost:8080/api";

export default class Product {

    static create(product) {
        return fetch(url + "/products", {
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
            method: "POST",
            mode: "cors",
        });
    }

    static readAll() {
        return fetch(url + "/products", {
            method: "GET",
            mode: "cors"
        });
    }

    static readAvailableByCategory(category) {
        return fetch(url + "/products/available/by-category/" + category, {
            method: "GET",
            mode: "cors"
        });
    }

    static readAvailableByNameLike(name) {
        return fetch(url + "/products/available/by-name/like/" + name, {
            method: "GET",
            mode: "cors"
        });
    }

    static readAvailableByPriceLessThanOrEqualTo(price) {
        return fetch(url + "/products/available/by-price/less-than-or-equal-to/" + price, {
            method: "GET",
            mode: "cors"
        });
    }

    static readById(id) {
        return fetch(url + "/products/" + id, {
            method: "GET",
            mode: "cors"
        });
    }

    static update(product) {
        return fetch(url + "/products", {
            body: JSON.stringify(product),
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            mode: "cors",
        });
    }

    static deleteById(id) {
        return fetch(url + "/products/" + id, {
            method: "DELETE",
            mode: "cors"
        });
    }

    static Category = class {

        static readAll() {
            return fetch(url + "/products/categories", {
                method: "GET",
                mode: "cors"
            });
        }

    }

}