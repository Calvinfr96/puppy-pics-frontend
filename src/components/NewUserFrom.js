import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

function NewUserFrom({baseURL, setCurrentUser}) {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        password_confirmation: ""
    })
    const [errors, setErrors] = useState(null)
    const history = useHistory()

    function handleChange(event) {
        const name = event.target.name
        let value = event.target.value

        setFormData({
            ...formData,
            [name]:value
        })
    }

    const addUser = async () => {
        const configObj = {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                ...formData
            })
        }

        const data = await fetch(`${baseURL}/users`, configObj)
        const newUser = await data.json()
        setCurrentUser(newUser.user)

        if (newUser.errors) {
            if (newUser.errors.name) {
                setErrors(`Name ${newUser.errors.name[0]}`)
            } else if (newUser.errors.password_confirmation) {
                setErrors("Passwords don't match")
            }
        } else {
            setErrors(null)
            localStorage.setItem('token', newUser.jwt)
            history.push('/') 
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        addUser()
        setFormData({
            name: "",
            password: "",
            password_confirmation: ""
        })
    }

    return (
        <div className="login-page">
           <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign up for Puppy Pics</h2>
                <label>
                    Username:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name..." required></input>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password..." required></input>
                </label>
                <label>
                    Confirm Password:
                    <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Confirm Password..." required></input>
                </label>
                {errors ? <h3 className="error">{`${errors}`}</h3> : null}
                <button type="submit" className="submit">Sign Up</button>
           </form> 
        </div>
    )
}

export default NewUserFrom;