/*eslint-disable */
import React, { useEffect, useState } from 'react';
import './CategoryListComponent.scss';
import { deletecatagory, loadCats} from '../../../services/AuthService';
import { getDateTime } from '../../../helpers/TimeHelper';
import { Link } from 'react-router-dom';
import EditCategoryComponent from '../EditCategoryComponent/EditCategoryComponent.js';

const CategoryListComponent = ({ reload }) => {
    //useStates
    const [categories, setCategories] = useState([]);
    const [category_id, setCategory_id] = useState();
    const [editEnable, setEditEnable] = useState(false);
    //useEffects
    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = async () => {

        try {
            const response = await loadCats();
            console.log(response.data.data);
            setCategories(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteCategories = async (e) => {
        try {
            const response = await deletecatagory(e);
            console.log('item deleted');
            loadCategories();
        } catch (e) {
            print(e);
        }
    };

    return (
        <div className='category_container'>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Added on</th>
                        <th scope="col">Added by</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Updated by</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category) => (
                            <tr key={category.id}>
                                <td data-label="Name"><h6>{category.name} </h6></td>
                                <td data-label="Added on">{getDateTime(category.addedOn)}</td>
                                <td data-label="Added by">
                                    <Link to={`/user/${category.addedBy._id}`} className='linkuser'>{category.addedBy.first_name + ' ' + category.addedBy.last_name}</Link>
                                </td>
                                <td data-label="Updated on">{getDateTime(category.updatedOn)}</td>
                                <td data-label="Updated by">
                                    <Link to={`/user/${category.updatedBy._id}`} className='linkuser'>{category.updatedBy.first_name + ' ' + category.updatedBy.last_name}</Link>
                                </td>
                                <td data-label="Edit" onClick={() => setEditEnable(true)}><i className='fas fa-pencil-alt'onClick={() => setCategory_id(category._id)}></i></td>
                                <td data-label="Delete"><i className='fas fa-trash' onClick={() => deleteCategories(category._id)}></i></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {editEnable && <EditCategoryComponent catagory_id={category_id}/>}
        </div>
    );
};

export default CategoryListComponent;




