import React, { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Profile(){
    let {username} = useParams();
    const [registeredSince, setRegisteredSince] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:3001/auth/basicinfo/${username}`).then((response) => {
            setRegisteredSince(response.data.createdAt);
        });
    }, []);

    return(
        <div className='profilePageContainer'> 
            <div className='basicInfo'> 
             <h1>Username: {username}</h1> 
             <h3> Registered Since: {registeredSince}</h3>
            </div>
            <div className='listOfPosts'></div>
        </div>
    )
}

export default Profile;