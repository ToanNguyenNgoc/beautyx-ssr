import React from 'react';
import authentication from '../../api-client/authApi'

function index(props) {
    const handleLogin = async () => {
        try {
            const res = await authentication.login({
                email:"0392645745",
                password:"06011998",
                platform:"BEAUTYX"
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
            index
        </div>
    );
}

export default index;