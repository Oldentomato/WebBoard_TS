import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
    
    const [Email, setEmail] = useState<string>("")
    const [Password, setPassword] = useState<string>("")


    const onEmailHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onPasswordHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();//이 함수가 있으면 페이지가 refresh를 하지 않는다
        let body ={
            email: Email,
            password: Password
        }
        axios.post('/api/users/login',body)
        .then(response =>{
            if(response.data.loginSuccess){
                window.location.replace("/Boards")
            }else{
                alert(response.data.message)

            }
        })


    }

    return (
        <div className="LoginForm">
            <form style={{
                display:'flex',
                flexDirection: 'column'
            }} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} placeholder="EMAIL" onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} placeholder="PASSWORD" onChange={onPasswordHandler} />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
