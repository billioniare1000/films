/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

 
export const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src='search.svg' alt='search'/>
            <input
            type='text'
            placeholder='Search Through thousands of movies'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}
