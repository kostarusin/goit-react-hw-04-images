import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    if (!this.state.query) {
      alert('Insert serch word');
      return;
    }
    this.props.onSearch(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.onFormSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>&#128269;</span>
          </button>

          <input
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
