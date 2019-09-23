import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
 
class TestPage extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
 
    return (
      <>
        <Select
          isMulti={true}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />

        <Link to="/">to home page</Link>
      </>
    );
  }
}
export default TestPage;