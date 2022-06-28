/*eslint-disable */
import React, { useEffect, useState } from 'react';
import './CategoryListComponent.scss';
import { deletecatagory, loadCategories} from '../../../services/AuthService';
import { getDateTime } from '../../../helpers/TimeHelper';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCategoryComponent from '../EditCategoryComponent/EditCategoryComponent.js';

const CategoryListComponent = ({ reload, search, setSearch }) => {
    //useStates
    const [categories, setCategories] = useState([]);
    const [category_id, setCategory_id] = useState();
    const [editEnable, setEditEnable] = useState(false);
    

    useEffect(() => {
        LoadCategories();
    }, [reload]);

    const LoadCategories = async () => {

        try {
            const response = await loadCategories();
            console.log(response.data.data);
            setCategories(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteCategories = async(id) => {
        try {
            const response = await deletecatagory(id);
            console.log('item deleted');
            LoadCategories();
        } catch (e) {
            print(e);
        }
    };
    const handleCategoriesSort = () => {
        return categories
          .filter((category) => {
            if (search == '') {
              return categories;
            } else if (
              category.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return categories;
            }
          });
      };

    return (
        <div className='category_container'>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        handleCategoriesSort().map((category) => (
                            <tr key={category._id}>
                                <td data-label="Name"><h4>{category.name} </h4></td>
                                <td data-label="Edit" onClick={() => setEditEnable(true)}><EditIcon  onClick={() => setCategory_id(category._id)}/> </td>
                                <td data-label="Delete"><DeleteIcon  onClick={() => deleteCategories(category._id)}/> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            { <EditCategoryComponent catagory_id={category_id} trigger={editEnable} settrigger={setEditEnable}/>}
        </div>
    );
};

export default CategoryListComponent;




