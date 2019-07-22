import Axios from 'axios';

export class GoogleBooks {
  constructor() {}

  pageInfo = {
    currentItems: [],
    availablePages: [],
    currentPage: 0
  };

  async searchForBook(searchString, params) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchString}`;

    this.pageInfo.currentItems.length = 0;

    return await Axios.get(url, {params})
    .then(res => {
      res.data.items.forEach(element => {
        this.pageInfo.currentItems.push(element.volumeInfo);
      });

      if (0 === params.startIndex) {
        const countPage = Math.ceil(res.data.totalItems / 20);
        this.pageInfo.availablePages = new Array();

        for (let i = 0; i < countPage; i++) {
          this.pageInfo.availablePages.push(i);
        }

        this.pageInfo.currentPage = 0;
      }

      this.pageInfo.currentPage = params.startIndex / 10;
      console.log('res: ', res, 'pageInfo ', this.pageInfo);
      return res;
    })
    .catch(err => console.log(err));
  }

  getPageInfo() {
    return this.pageInfo;
  }
}
