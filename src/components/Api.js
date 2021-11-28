function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error${res}`);
}

export class Api {
    constructor({ URL, headers }) {
        this.baseUrl = URL;
        this.headers = headers;
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers
            })
            .then(onResponse);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers
            })
            .then(onResponse);
    }

    profileRedaction(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(onResponse);
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(onResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(onResponse);
    }

    setCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(onResponse);
    }

    removeCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(onResponse);
    }

    updateProfileAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: link
                })
            })
            .then(onResponse);
    }
}