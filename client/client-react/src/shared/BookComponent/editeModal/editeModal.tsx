import React, { ChangeEvent } from 'react';
import { Book } from '../../../models/book.model';

import AsyncSelect from 'react-select/async';

import { BookService } from '../../../service/books.service';
import { CategoryAuthor } from '../../../models/category-author.model';

interface EditeProps {
  book: Book;
  close: () => void;
  editeBook: (book: Book) => void;
}

interface EditeState {
  book: Book;
  authors: CategoryAuthor[];
  categories: CategoryAuthor[];
}

export class EditeModal extends React.Component<EditeProps, EditeState> {
  public bookService: BookService;
  private refCateg:any;
  private refAuth: any;

  constructor(props: EditeProps) {
    super(props);
    this.state = {
      book: {
        ...this.props.book,
        categories: (this.props.book.categories_list as CategoryAuthor[]).map(category => {
          return category.name;
        }),
        categories_list: (this.props.book.categories_list as CategoryAuthor[]).map(c => {
          return {
            ...c,
            label: c.name,
            value: c._id
          }
        }),
        authors: (this.props.book.authors_list as CategoryAuthor[]).map(author => {
          return author.name;
        }),
        authors_list: (this.props.book.authors_list as CategoryAuthor[]).map(a => {
          return {
            ...a,
            label: a.name,
            value: a._id
          }
        })
      },
      authors: [],
      categories: []
    }
    this.bookService = new BookService();

    this.inputTitleHandler = this.inputTitleHandler.bind(this);
    this.inputDescriptionHandler = this.inputDescriptionHandler.bind(this);
    this.inputPageHandler = this.inputPageHandler.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.editeBookFromModal = this.editeBookFromModal.bind(this);
  }

  public inputTitleHandler(event: ChangeEvent<HTMLInputElement>) {
    const book = { ...this.state.book }
    book.title = event.target.value;
    this.setState({
      book
    });
  }

  public inputDescriptionHandler(event: ChangeEvent<HTMLTextAreaElement>) {
    const book = { ...this.state.book }
    book.description = event.target.value;
    this.setState({
      book
    });
  }

  public inputPageHandler(event: ChangeEvent<HTMLInputElement>) {
    const book = { ...this.state.book }
    book.pageCount = +event.target.value;
    this.setState({
      book
    });
  }

  public uploadFile(event: ChangeEvent<HTMLInputElement>) {
    const book = { ...this.state.book };

    const input = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      book.image = reader.result as string;
      this.setState({
        book
      });
    };
    reader.readAsDataURL((input as any).files[0]);
  }

  private handleChangeCategories = (selectedOption: any) => {
    const book = {
      ...this.state.book,
      categories: selectedOption?
      selectedOption.map((option: CategoryAuthor) => {
        return option.name;
      })
      : undefined,
      categories_list: selectedOption? 
      selectedOption.map((option: CategoryAuthor) => {
        return {
          _id: option._id,
          name: option.name
        }
      })
      : undefined
    };
    this.setState({ book });
    this.refCateg.select.setState({ value: selectedOption })
  };
  
  private handleChangeAuthors = (selectedOption: any) => {
    const book = {
      ...this.state.book,
      authors: selectedOption
      ? selectedOption.map((option: CategoryAuthor) => {
        return option.name;
      })
      : undefined,
      authors_list: selectedOption
      ? selectedOption.map((option: CategoryAuthor) => {
        return {
          _id: option._id,
          name: option.name
        }
      })
      : undefined
    };
    this.setState({ book });
    this.refAuth.select.setState({ value: selectedOption })
  }

  private loadOptionsCategory = (inputValue: any, callback: any) => {
    this.bookService.getAllCategories()
    .then(categories => {      
      categories = categories.map(category => {
        return {
          ...category,
          label: category.name,
          value: category._id
        }
      });
      this.setState({
        categories
      });
      callback(this.state.categories);
    })
  }

  private loadOptionsAuth = (inputValue: any, callback: any) => {
    this.bookService.getAllAuthors()
    .then(authors => {
      authors = authors.map(author => {
        return {
          ...author,
          label: author.name,
          value: author._id
        }
      });
      this.setState({
        authors
      })
      callback(this.state.authors);
    })
  }

  public editeBookFromModal() {
    this.props.editeBook(this.state.book);
    alert('Successfuly edited')
    this.props.close();
  }

  render() {
    return (
      <div className="modal-window">
        <div className="input-field">
          <label htmlFor="title" className="active">title</label>
          <input type="text" name="title" id="title"
            value={this.state.book.title}
            onChange={this.inputTitleHandler}
          />
        </div>
        <br />
        <AsyncSelect
          key={1}
          isMulti={true}
          ref={(ref) => this.refCateg = ref}
          loadOptions={this.loadOptionsCategory}
          defaultOptions
          defaultValue={this.state.book.categories_list}
          onChange={this.handleChangeCategories}
        />
        <br />
        <AsyncSelect
          key={2}
          isMulti={true}
          ref={(ref) => this.refAuth = ref}
          loadOptions={this.loadOptionsAuth}
          defaultOptions
          defaultValue={this.state.book.authors_list}
          onChange={this.handleChangeAuthors}
        />
        <br />
        <div className="input-field">
          <textarea className="input-field"
            name="description"
            value={this.state.book.description}
            onChange={this.inputDescriptionHandler}
          />
          <label htmlFor="description" className="active">description</label>
        </div>
        <div className="input-field">
          <label htmlFor="pageCount" className="active">pages</label>
          <input type="number" name="pageCount" id="pageCount" min="0"
            value={this.state.book.pageCount}
            onChange={this.inputPageHandler}
          />
        </div>
        <label className="preview-label" htmlFor="image">
          <div className="preview">
            Click for change image
            <input type="file" name="image" id="image" onChange={this.uploadFile} />
            <img alt="book" id="preview" src={this.state.book.image as string} />
          </div>
        </label>
        <hr />
        <button className="btn green"
          onClick={this.props.close}
        >Close</button>
        <button className="btn btn-save-change orange"
          onClick={this.editeBookFromModal}
        >Edite</button>
      </div>
    )
  }
}