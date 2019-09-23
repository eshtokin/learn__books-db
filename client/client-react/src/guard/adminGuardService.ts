import { UserInfoService } from "../service/user-info.service";

class AdminGuardService {
  private userInfo: UserInfoService;

  constructor() {
    this.userInfo = new UserInfoService();
  }

  public canActivate(): boolean {
    return this.userInfo.getStatus();
  }
}

export default new AdminGuardService();