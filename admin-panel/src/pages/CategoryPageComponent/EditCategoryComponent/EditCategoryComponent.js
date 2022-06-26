/*eslint-disable */
import React, { useRef, useEffect, useState} from 'react';
import { FiX } from 'react-icons/fi';
import './EditCategoryComponent.scss';
import { loadCat, editcategory } from '../../../services/AuthService';

const EditCategoryComponent = ({ trigger, settrigger, catagory_id }) => {

    //useStates
    const currentDate = new Date();
    const [category, setCategory] = useState();

    useEffect(() => {
        document.addEventListener('click', handleClickoutside, true)
    }, [])

    const ref = useRef(null)

    const handleClickoutside = (e) => {
        if (!ref.current.contains(e.target)) {
            settrigger(false);
        }
    }

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
                id: catagory_id,
                name: e.target.catagory.value,
                updatedOn: currentDate,
            });
            console.log(response);
            settrigger(false);
        } catch (e) {
            console.log(e);
        }
    };

    return trigger ? (
        <div className='create_folder_popup'>
            <div className='create_folder_popup-body'>
                <button className='closebtn'
                    onClick={() => settrigger(false)}>
                    <FiX />
                </button>
                <div className='create_folder' ref={ref}>
                    <div className='create_folder_box'>
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
            </div>
        </div>
    ) : <></>;
};

export default EditCategoryComponent;




