/*eslint-disable */
import React, { useState} from 'react';
import './CategoryPageComponent.scss';
import { addcatagory} from '../../services/AuthService';
import CatagoryList from './CategoryListComponent/CategoryListComponent.js';
import AdminNavComponent from '../../components/AdminNavComponent/AdminNavComponent';
import SearchBarComponent from '../../components/SearchBarComponent/SearchBarComponent';

const CategoryPageComponent=()=> {

    //useStates
    const currentDate = new Date();
    const [reload, setReload] = useState(false);
    const [search,setSearch] = useState('');

    const handleCatagorySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addcatagory({
                name: e.target.catagory.value,
                addedOn: currentDate,
                updatedOn: currentDate,
            });
            setReload(!reload);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <AdminNavComponent />
            <div className='admincategory'>
                <form id='form' className='addcatagory' onSubmit={handleCatagorySubmit}>
                    <input type='text'
                        placeholder='add category'
                        className='addcatagory'
                        name='catagory'
                        required
                    ></input>
                    <button type='submit' className='btnaddcatagory'>Add</button>
                </form>
                <div className='category_header'><p>All Categories</p>
                <SearchBarComponent text="Search Categories" search={search} setSearch={setSearch}/>
                </div>
                <div className='catagories'>
                    <CatagoryList reload={reload} search={search} setSearch={setSearch}/>
                </div>
            </div>
        </div>
    );
};
export default CategoryPageComponent;
