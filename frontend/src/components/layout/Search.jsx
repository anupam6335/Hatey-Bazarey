import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import "../layout/Header/Header.css";
const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const searchHandler = (e) => {
        e.preventDefault()
        // console.log(keyword);
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (

    //     <div className='search flex'>
    //     <AiOutlineSearch className='searchIcon' />
    //     <input type='text' placeholder='Search...' />
    //   </div>

        <form onSubmit={searchHandler} className='search'>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search