import React from 'react';
import "./SearchBarComponent.scss"
import {
    faSearch,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchBarComponent({text,search,setSearch}) {
  return (
    <div>
      <div className="searchbox">
        <input
          type="text"
          placeholder={text}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         
        />
        <div className="searchbox_icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    </div>
  );
}

export default SearchBarComponent;
