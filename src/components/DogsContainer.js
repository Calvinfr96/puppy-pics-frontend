import React, {useEffect, useState} from 'react'
import Dog from './Dog';
import Header from './Header';

function DogsContainer({dogs, fetchDogs, currentUser, baseURL, heading}) {
    const [ratings, setRatings] = useState([])

    useEffect(() => {
        fetchDogs()
    }, [ratings])

    const dogComponents = dogs.map(dog => {
        return <Dog key={dog.id} dog={dog} user={currentUser} ratings={ratings} setRatings={setRatings} baseURL={baseURL} />
    })

    const fetchRatings = async () => {
        const token = localStorage.getItem('token')
        const configObj = {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        const data = await fetch(`${baseURL}/ratings`, configObj)
        const allRatings = await data.json()
        setRatings(allRatings)
    }

    useEffect(() => {
        fetchRatings()
    },[])

    return (
        <div>
            <Header heading={heading} />
            {currentUser ? null : <h2>Please log in</h2>}
            <div className = "dog-container">
                {dogComponents}
            </div>
        </div>
    )
}

export default DogsContainer;