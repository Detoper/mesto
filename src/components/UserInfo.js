class UserInfo {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
    }

    getUserInfo() {
        const userInfo = {
            name: this.name,
            description = this.description
        }
        return userInfo;
    }
    setUserInfo(profileTitle, profileSubtitle) {
        const userInfo = this.getUserInfo();
        profileTitle.textContent = userInfo.name;
        profileSubtitle.textContent = userInfo.description;
    }
}