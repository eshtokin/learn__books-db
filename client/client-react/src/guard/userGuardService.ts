import { UserInfoService } from "../service/user-info.service";

class UserGuardService {
  private userInfo: UserInfoService;

  constructor() {
    this.userInfo = new UserInfoService();
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