import UserInfoService, { UserInfo } from "../service/user-info.service";

class AdminGuardService {
  private userInfo: UserInfo;

  constructor() {
    this.userInfo = UserInfoService;
  }

  public canActivate(): boolean {
    return this.userInfo.getStatus();
  }
}

export default new AdminGuardService();