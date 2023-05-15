import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SerchBarHeader,
  SerchBar,
  SearchBarBtn,
  SearchBarInput,
  SearchIcon
} from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    console.log(e.target.value);
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
  };

  render() {
    return (
      <SerchBarHeader>
        <SerchBar onSubmit={this.handleSubmit}>
          <SearchBarBtn type="submit">
            <SearchIcon />
          </SearchBarBtn>

          <SearchBarInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SerchBar>
      </SerchBarHeader>
    );
  }
}
