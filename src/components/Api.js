export class Api {
    constructor({ URL, headers }) {
        this.baseUrl = URL;
        this.headers = headers;
    }

    _onResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error${res}`);
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers
            })
            .then(this._onResponse);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
                headers: this.headers
            })
            .then(this._onResponse);
    }

    profileRedaction(data) {
        return fetch(`${this.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(this._onResponse);
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
            .then(this._onResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(this._onResponse);
    }

    setCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers
            })
            .then(this._onResponse);
    }

    removeCardLike(cardId) {
        return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
            .then(this._onResponse);
    }

    updateProfileAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(this._onResponse);
    }
}