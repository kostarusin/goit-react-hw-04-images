import { useState } from 'react';
import PropTypes from 'prop-types';
import style from './Searchbar.module.css';

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    if (!query) {
      alert('Insert serch word');
      return;
    }
    onSearch(query);
    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={onFormSubmit}>
        <button type="submit" className={style.button}>
          <span className={style.buttonLabel}>&#128269;</span>
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
