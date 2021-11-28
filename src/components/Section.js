export class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItemtoTheEnd(element) {
        this._container.append(element);
    }

    addItemtoTheTop(element) {
        this._container.prepend(element);
    }
}