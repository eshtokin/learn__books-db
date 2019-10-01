import React from 'react'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { CategoryAuthor } from '../../models/category-author.model';
import { BookService } from '../../service/books.service';
import { FilterState } from '../../store/reducers/filterReducer';
import * as filterAction from '../../store/actions/filterAction';
import './style.scss';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface Props{
  history: any;
  authors : any;
  categories:any;
  search: string;
  setFilter:( data: any)=> void;
  getSomeBooks: () => void;
  refreshFilter: () => void;
  setAllFlag: (flag: boolean) => void;
}

interface State {
  data: {
    title: string | undefined,
    categories: CategoryAuthor[],
    authors: CategoryAuthor[]
  }
}

class Filter extends React.Component<Props, State> {
  private bookService: BookService;
  public onSearchStringChange: Subject<string>;
  
  constructor(props: Props) {
    super(props);

    this.state = {
      data: {
        title: undefined,
        categories: [],
        authors: []
      }
    }

    this.onSearchStringChange = new Subject();
    this.onSearchStringChange.pipe(debounceTime(500))
    .subscribe(value => {
      this.setState({
        data: {
          ...this.state.data,
          title: value
        }
      }, () => this.filterHandler(null))
    })

    this.bookService = new BookService();
    this.filterHandler = this.filterHandler.bind(this);
    this.loadFilterData = this.loadFilterData.bind(this);
  }

  UNSAFE_componentWillMount() {
    if ((this.props as any).location.pathname === '/book-manager') {
      this.props.setAllFlag(false);
    }
  }

  componentDidMount() {
    this.loadFilterData();
  }

  public checkQuery(object: CategoryAuthor): boolean {
    if ((this.props as any).location.search) {
      const query = queryString.parse((this.props as any).location.search);
      const arrayFlag = [false, false];

      if (query.categories) {
        arrayFlag[0] = (query.categories.indexOf(object._id) !== -1); 
      }
      if (query.authors) {
        arrayFlag[1] = (query.authors.indexOf(object._id) !== -1);
      }
      return  arrayFlag[0] || arrayFlag[1];
    }
    return false;
  }

  public loadFilterData() {
    this.bookService.getAllCategories()
    .then(categories => {
      this.bookService.getAllAuthors()
      .then(authors => {
        categories = categories.map(category => {
          return {
            ...category,
            checked: this.checkQuery(category)
          }
        });
        authors = authors.map(author => {
          return {
            ...author,
            checked: this.checkQuery(author)
          }
        });

        this.props.setFilter({
          authors,
          categories,
          title: ''
        })
      })
    })
  }

  public filterHandler(obj: CategoryAuthor | null, value?: string) {
    let data: {
      title?: string,
      categories?: CategoryAuthor[],
      authors?: CategoryAuthor[]
    } = {};

    if (obj && obj !== undefined) {
      (obj as CategoryAuthor).checked = !(obj as CategoryAuthor).checked;
    }

    data.title = this.state.data.title

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
          onChange={event => this.onSearchStringChange.next(event.target.value)}
          defaultValue={this.state.data.title}/>
          <label
          className={this.state.data.title ? 'active' : ''}
          >Search Field</label>
        </div>
        {
          this.props.categories.map((category: CategoryAuthor, index: number) => {
            return (
              <label key={index}>
                <input type="checkbox"
                checked={category.checked}
                onChange={() => this.filterHandler(category)}/>
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
                checked={author.checked}
                onChange={() => this.filterHandler(author)}/>
                <span>{author.name}</span>
              </label>
            )
          })
        }
        <hr/>
        <br/>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    ...state.filter
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTitle: (title: string) => dispatch(filterAction.setTitle(title)),
    setCategories: (categories: CategoryAuthor[]) => dispatch(filterAction.setCategories(categories)),
    setAuthor: (authors: CategoryAuthor[]) => dispatch(filterAction.setAuthor(authors)),
    setFilter: (data: FilterState) => dispatch(filterAction.setFilter(data)),

    setAllFlag: (flag: boolean) => dispatch(filterAction.setAllFlag(flag))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)