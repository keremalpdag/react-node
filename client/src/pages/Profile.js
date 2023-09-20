import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    let { username } = useParams();
    let navigate = useNavigate();
    const [registeredSince, setRegisteredSince] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${username}`).then((response) => {
            setRegisteredSince(response.data.createdAt);
        });

        axios.get(`http://localhost:3001/posts/${username}`).then((response) => {
            setListOfPosts(response.data);
        })

    }, []);

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username: {username}</h1>
                <h3> Registered Since: {registeredSince}</h3>
            </div>
            <div>
                {listOfPosts.map((value, key) => {
                    return (
                        <div key={key} className="post">
                            <div className="title"> {value.title} </div>
                            <div
                                className="body"
                                onClick={() => {
                                    navigate(`/post/${value.id}`);
                                }}
                            >
                                {value.postText}
                            </div>
                            <div className="footer">
                                {value.username}

                                <label> {value.Likes.length}</label>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Profile;