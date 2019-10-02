import UserInfoService, { UserInfo } from "../service/user-info.service";

class UserGuardService {
  private userInfo: UserInfo;

  constructor() {
    this.userInfo = UserInfoService;
  }

  public canActivate() {
    const currentUser = this.userInfo.getCurrentUser();

    if (currentUser) {
      if (currentUser.role === 1 || currentUser.role === 2) {
        return true;
      }
    }

    return false;
  }
}

export default new UserGuardService()