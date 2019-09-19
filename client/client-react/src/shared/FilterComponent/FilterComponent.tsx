import React, { ChangeEvent } from 'react'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { CategoryAuthor } from '../../models/category-author.model';
import { BookService } from '../../service/books.service';
import { FilterState } from '../../store/reducers/filterReducer';
import * as filterAction from '../../store/actions/filterAction';
import './style.scss';

interface Props{
  history: any,
  authors : any,
  categories:any,
  search: string,
  setFilter:( data: any)=> void,
  getSomeBooks: () => void
}

class Filter extends React.Component<Props, any> {
  private bookService: BookService;

  constructor(props: Props) {
    super(props);

    this.bookService = new BookService();
    this.filterHandler = this.filterHandler.bind(this);
  }

  componentDidMount() {
    const query = queryString.parse((this.props as any).location.search);
    
    this.bookService.getAllAuthors()
    .then((authors: CategoryAuthor[]) => {
      
      this.bookService.getAllCategories()
      .then((categories: CategoryAuthor[]) => {
        
        this.props.setFilter({
          authors: authors.map(author => {
            return {
              ...author,
              checked: query.authors === undefined
              ? false
              : (query.authors as string[]).indexOf(author._id) === -1 ? false : true
            }
          }),
          categories: categories.map((category: CategoryAuthor) => {
            return {
              ...category,
              checked: query.categories === undefined
              ? false
              : (query.categories as string[]).indexOf(category._id) === -1 ? false : true
            }
          })
        })
      });
    });
  }

  public filterHandler(obj: CategoryAuthor | null, event?: ChangeEvent<HTMLInputElement>) {
    let data: {
      title?: string,
      categories?: CategoryAuthor[],
      authors?: CategoryAuthor[]
    } = {};
    
    if (obj && obj !== undefined) {
      (obj as CategoryAuthor).checked = !(obj as CategoryAuthor).checked

      data.categories = this.props.categories.filter((obj: any) => {
        return obj.checked;
      }).map((obj: any) => {
        return obj._id;
      });
  
      data.authors = this.props.authors.filter((obj: any) => {
        return obj.checked;
      }).map((obj: any) => {
        return obj._id;
      });
    }

    if (event && event.target.value.length > 0) {
      data.title = event.target.value
    }

    (this.props as any).push({
      pathname: '/filtered',
      search: queryString.stringify(data)
    });

    this.props.getSomeBooks();
  }

  render() {
    return (
      <div className="col s2 filters">
        <div className="input-field">
          <input type="text" id="searchField" 
          onChange={(event) => this.filterHandler(null, event)}
          />
          <label>Search Field</label>
        </div>
        {
          this.props.categories.map((category: CategoryAuthor, index: number) => {
            return (
              <label key={index}>
                <input type="checkbox"
                defaultChecked={category.checked}
                onClick={(event) => this.filterHandler(category)}
                />
                <span>{category.name}</span>
              </label>
            )
          })
        }
        <hr/>
        {
          this.props.authors.map((author: CategoryAuthor, index: number) => {
            return (
              <label key={index}>
                <input type="checkbox"
                defaultChecked={author.checked}
                onClick={(event) => this.filterHandler(author)}
                />
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

const mapStateToProps = (state: any) => {
  return {
    ...state.filterReducer
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTitle: (title: string) => dispatch(filterAction.setTitle(title)),
    setCategories: (categories: CategoryAuthor[]) => dispatch(filterAction.setCategories(categories)),
    setAuthor: (authors: CategoryAuthor[]) => dispatch(filterAction.setAuthor(authors)),
    setFilter: (data: FilterState) => dispatch(filterAction.setFilter(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)