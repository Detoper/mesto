export class UserInfo {
    constructor(name, about, avatar) {
        this._nameInput = name;
        this._aboutInput = about;
        this._avatarInput = avatar;
    }

    getUserInfo(userName, userAbout) {
        const userInfo = {
            name: userName.textContent,
            about: userAbout.textContent
        }
        return userInfo;
    }
    setUserInfo(userInfo) {
        this._nameInput.textContent = userInfo.name;
        this._aboutInput.textContent = userInfo.about;
    }

    setUserAvatar(userInfo) {
        this._avatarInput.src = userInfo.avatar;
    }
}