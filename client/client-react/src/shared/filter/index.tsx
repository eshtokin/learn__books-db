import React, { Props } from 'react'
import { BookService } from '../../service/books.service';
import { CategoryAuthor } from '../../models/category-author.model';
import './style.scss'

export default class Filter extends React.Component {
  constructor(props: Props<any>) {
    super(props);
    this.bookService = new BookService();

    this.state = {
      categories: [],
      authors: []
    }

    this.bookService.getAllAuthors()
    .then(listOfAuthors => {
      this.setState({
        ...this.state,
        authors: listOfAuthors
      })
    });
    this.bookService.getAllCategories()
    .then(listOfCategories => {
      this.setState({
        ...this.state,
        categories: listOfCategories
      })
    });
  }

  public bookService: BookService;

  render() {
    return (
      <div className="col s2 filters">
        <div className="input-field">
          <input type="text" id="searchField" />
          <label>Search Field</label>
        </div>
        {
          (this.state as any).categories.map((category: CategoryAuthor, index: number) => {
            return (
              <label key={index}>
                <input type="checkbox"/>
                <span>{category.name}</span>
              </label>
            )
          })
        }
        <hr/>
        {
          (this.state as any).authors.map((author: CategoryAuthor, index: number) => {
            return (
              <label key={index}>
                <input type="checkbox" />
                <span>{author.name}</span>
              </label>
            )
          })
        }
        <hr/>
      </div>
    )
  }
}
