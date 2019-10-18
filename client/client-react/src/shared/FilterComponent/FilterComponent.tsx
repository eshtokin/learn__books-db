import React from 'react'
import { connect } from 'react-redux';
import queryString from 'query-string';
import { CategoryAuthor } from '../../models/category-author.model';
import BookService, { BookServiceClass } from '../../service/books.service';
import { FilterState } from '../../store/reducers/filterReducer';
import * as filterAction from '../../store/actions/filterAction';
import './style.scss';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Store } from '../../store/store';
import { History } from 'history';

interface Props{
  history: History;
  store: FilterState;
  setFilter:( data: FilterState) => void;
  getSomeBooks: () => void;
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
  private bookService: BookServiceClass;
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

    this.bookService = BookService;
    this.filterHandler = this.filterHandler.bind(this);
    this.loadFilterData = this.loadFilterData.bind(this);
    this.checkSearchString = this.checkSearchString.bind(this);
  }

  UNSAFE_componentWillMount() {
    if (this.props.history.location.pathname === '/book-manager') {
      this.props.setAllFlag(false);
    }
  }

  componentDidMount() {
    this.loadFilterData();
  }

  public checkQuery(object: CategoryAuthor): boolean {
    if (this.props.history.location.search) {
      const query = queryString.parse(this.props.history.location.search);
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
        categories.data = categories.data.map(category => {
          return {
            ...category,
            checked: this.checkQuery(category)
          }
        });
        authors.data = authors.data.map(author => {
          return {
            ...author,
            checked: this.checkQuery(author)
          }
        });

        this.props.setFilter({
          authors: authors.data,
          categories: categories.data,
          title: ''
        })
      })
    })
  }

  public filterHandler(obj: CategoryAuthor | null, value?: string) {
    let data: {
      title?: string,
      categories?: string[],
      authors?: string[]
    } = {
      title: '',
      categories: [],
      authors: []
    };

    if (obj && obj !== undefined) {
      (obj as CategoryAuthor).checked = !(obj as CategoryAuthor).checked;
    }

    data.title = this.state.data.title;

    this.props.store.categories.reduce((prevValue: CategoryAuthor, currentValue: CategoryAuthor) => {
      if (currentValue.checked) {
        (data['categories'] as string[]).push(currentValue._id);
      }
      return prevValue;
    }, {name: '', _id: '', checked: false})

    this.props.store.authors.reduce((prevValue: CategoryAuthor, currentValue: CategoryAuthor) => {
      if (currentValue.checked) {
        (data.authors as string[]).push(currentValue._id);
      }
      return prevValue;
    }, {name: '', _id: '', checked: false})

    this.props.history.push({
      pathname: '/filtered',
      search: queryString.stringify(data)
    });

    this.props.getSomeBooks();
  }

  public checkSearchString(event: React.ChangeEvent<HTMLInputElement>) {
    const regExpr = /^[a-zA-Z0-9\s]+$/gm;
    if (regExpr.test(event.target.value)) {
      this.onSearchStringChange.next(event.target.value)
    }
  }

  render() {
    return (
      <div className="col s2 filters">
        <div className="input-field">
          <input type="text" id="searchField" 
          onChange={this.checkSearchString}
          defaultValue={this.state.data.title}/>
          <label
          className={this.state.data.title ? 'active' : ''}
          >Search Field</label>
        </div>
        {
          (this.props.store.categories as CategoryAuthor[]).map((category: CategoryAuthor, index: number) => {
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
          (this.props.store.authors as CategoryAuthor[]).map((author: CategoryAuthor, index: number) => {
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

const mapStateToProps = (state: Store) => {
  return {
    store: {...state.filter}
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