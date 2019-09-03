import { UserService } from './users.service';
import { UserInfo } from './user-info.service';

export class FavoriteService {
  public favoritesBook: string[];
  userService;
  userInfo;
  constructor() {
    this.userService = new UserService();
    this.userInfo = new UserInfo();
    this.init();
  }

  public bookExistinFavorites(bookId: string) {
    return this.favoritesBook.indexOf(bookId) === -1 ? false : true;
  }

  public init(): void {
    this.userService.getUser(this.userInfo.getCurrentUser().id)
    .then(data => {
      this.favoritesBook = data.books;
    });
  }
}
