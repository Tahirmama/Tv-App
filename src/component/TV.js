import React, { useState, useEffect } from 'react';
import "../App.css";

export default function TV() {
    const [loading, setLoading] = useState(false);
    const [post, setPosts] = useState([]);
    const [searchTitle, setsearchTitle] = useState("");

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const res = await fetch("https://shopping-google-scrapper.herokuapp.com/api/search?k=tv");
            let response = await res.json();
            setPosts(response.data);
            setLoading(false)   
        };
        loadPosts();
    }, []);

    return (
        <div className="App">
            <br />
            <h1 align="center">TV</h1>
            <br />
            <input
                type="text"
                placeholder="What are you looking for ..."
                onChange={(e) => setsearchTitle(e.target.value)}
                className="Search"
            />
            <br />
            <br />
            {loading ? (
                <h4>Loading ....</h4>
            ) : (
                post.filter((value) => {
                    if (searchTitle === "") {
                        return value;
                    } else if
                        (value.title.toLowerCase().includes(searchTitle.toLowerCase())) {
                        return value;
                    } else if
                        (value.prices.includes(searchTitle)) {
                        return value;
                    }
                })
                    .map((item) => <div key={item.id} className="innerContainer">
                        <a href={item.link} target="blank">
                            <img src={item.image} alt={item.title} className="Pics" />
                        </a>
                        <br />
                        <br />
                        <strong>Title:</strong> {item.title}
                        <br />
                        <strong>Prices:</strong> {item.prices}
                    </div>)



            )}
        </div>
    );
}