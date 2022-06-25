/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { loadCat, editcategory } from '../../../services/AuthService';

const EditCategoryComponent = ({catagory_id}) => {

    //useStates
    const currentDate = new Date();
    const {userData} = useGlobalUser();
    const [category, setCategory] = useState();

    //useEffects
    useEffect(() => {
        loadCategory();
    }, [catagory_id]);



    const loadCategory = async () => {

        try {
            const response = await loadCat(catagory_id);
            console.log(response.data.data);
            setCategory(response.data.data);
        } catch (e) {
            console.log(e);
        }
    };


    const handleCatagoryEditSubmit = async (e) => {
        try {
            const response = await editcategory({
                id:catagory_id,
                name: e.target.catagory.value,
                updatedOn: currentDate,
            });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div>       
            <div className="popup">
                <form id='form' className='addcatagory' onSubmit={handleCatagoryEditSubmit}>
                    <input type='text'
                        placeholder='add category'
                        className='addcatagory'
                        name='catagory'
                        defaultValue={category && category.name}
                        required
                    ></input>
                    <button type='submit' className='btnaddcatagory'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryComponent;




