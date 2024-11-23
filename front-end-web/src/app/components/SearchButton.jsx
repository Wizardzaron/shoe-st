"use client"
import React, { useState } from 'react';


export default function SearchButton() {

  //In future need to create search page to show search results


    const [searchValue, setSearchValue] = useState(""); 
   
    const beginSearch = (searchValue) => {    
        console.log("I would search for '" + searchValue + "' if I knew how");
      };
   
    const handleSubmit = (e) => {
        e.preventDefault();
        beginSearch(searchValue);
    };

    return(
        <form style={{ display: 'inline-block', marginBottom: "10px" }} onSubmit={handleSubmit}>
            <input style={{ marginLeft: "30px" }}
                id="search"
                type="text"
                className="input"
                placeholder="search..."
                value={searchValue}
                onChange={ (e) =>  setSearchValue(e.target.value)}
            />
            <div id="form-action" style={{ display: 'inline-block' }}>
                <button type='submit' style={{ marginLeft: "10px" }}>
                    <img src="/searchIcon.jpg" width={20} height={20} alt="buttonpng" />
                </button>
            </div>
        </form>
    );
}
// C:\Users\ryan0\OneDrive\Desktop\shoe-st\front-end-web\public\searchIcon.jpg