export class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    // getUserInfo() {
    //     const userInfo = {
    //         name: this._name.textContent,
    //         description: this._description.textContent
    //     }
    //     return userInfo;
    // }
    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._description.textContent = userInfo.about;
    }
}