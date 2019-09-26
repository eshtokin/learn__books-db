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
    this.refreshFilter = this.refreshFilter.bind(this);
    this.setFilterInitialState = this.setFilterInitialState.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setFilterInitialState();
  }

  public setFilterInitialState() {
    if ((this.props as any).location.search) {
      console.log((this.props as any).location.search);
      
      const query = queryString.parse((this.props as any).location.search);
      if (query.categories) {
        this.props.categories.forEach((category: CategoryAuthor) => {
          category.checked = (query.categories as string[]).indexOf(category._id) !== -1  ? true: false
        })
      }
      if (query.authors) {
        this.props.authors.forEach((author: CategoryAuthor) => {
          author.checked = (query.categories as string[]).indexOf(author._id) !== -1  ? true: false
        })
      }
      if (query.title) {
        this.setState({
          data: {
            ...this.state.data,
            title: query.title as string
          }
        })
      }
    } else {
      this.props.categories.forEach((category: CategoryAuthor) => {
        category.checked = false;
      });
      this.props.authors.forEach((author: CategoryAuthor) => {
        author.checked = false;
      });
    }
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

  public refreshFilter() {
    console.log('this.props.', this.props);

    (this.props as any).push({
      pathname: '/filtered',
      search: ''
    });
    // this.componentDidMount()
    // this.bookService.getAllAuthors()
    // .then((authors: CategoryAuthor[]) => {
    //   authors = authors.map(author => {
    //     return {
    //       ...author,
    //       checked: false
    //     }
    //   })
    //   this.bookService.getAllCategories()
    //   .then((categories: CategoryAuthor[]) => {
    //     categories = categories.map((category: CategoryAuthor) => {
    //       return {
    //         ...category,
    //         checked: false
    //       }
    //     });
    //     this.props.setFilter({
    //       authors,
    //       categories,
    //       title: ''
    //     });
    //   });
    // });
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
                defaultChecked={category.checked}
                onClick={() => this.filterHandler(category)}/>
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
                onClick={() => this.filterHandler(author)}/>
                <span>{author.name}</span>
              </label>
            )
          })
        }
        <hr/>
        <br/>
        {/* <button
          className="btn green darken-2"
          onClick={this.refreshFilter}
        >refresh filter</button> */}
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
    refreshFilter: () => dispatch(filterAction.refreshFilterData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)