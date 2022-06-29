import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const redirect = () => {
        navigate("/");
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => redirect()}>Back Home</Button>}
        />
    )
}

export default Error