import React,{ useEffect, useState}  from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const NavBar = () => {

  const [Name, setName] = useState<string>("");
  const [isUser, setIsUser] = useState<boolean>(false);
  const [user, setuser] = useState<string>("");
  const [isOnline, setisOnline] = useState<boolean>(false)

  useEffect(()=>{
      CheckOnline()
      CheckUser()
  })

  const CheckOnline = () =>{
      axios.get('/api/users/isonline').then(response => {
          if(response.data.online)
              setisOnline(true)
          else
              setisOnline(false)
      })
  }

  const CheckUser = () =>{
      axios.get('api/users/auth')
      .then(response=>{
          if(response.data.name !== undefined){
              setIsUser(true)
              setuser(response.data)
              if(response.data.isAdmin === true){
                  setName("관리자")
              }else{
                  setName(response.data.name)
              }
          }
          else{
              setIsUser(false)
          }
      })
  }

  const onClickHandler = () =>{
      axios.get('api/users/logout')
      .then(response => {
          if(response.data.success){
              //props.history.push("/")
              window.location.replace("/")

          }else{
              alert("로그아웃에 실패했습니다")
          }
      })
  }


  return (
      <div className="NavBar">
          <header>
              <Link to="/" className="logo">POLAROID</Link>
              <div className="Alert">
              {isOnline?<h2 style={{color:"#00FF00"}}>ServerOnline</h2>:<h2 style={{color:"#FF4500"}}>ServerOffline</h2>}
              </div>
              <ul>
                  <li><a href="#" >Home</a></li>
                  <li><Link to="/Boards">Board</Link></li>
                  <li><Link to="/Register">Register</Link></li>
                  <li>{isUser ? <button onClick={onClickHandler}>LogOut</button>:
                  <Link to="/Login" className="active">Login</Link>}</li>

              </ul>
              <br/>
              {isUser&&<Link className="User" to={{pathname:'/User', state:{user:user}}}>
                  {Name}님 환영합니다
              </Link>}

          </header>
      </div>
  )
}

export default NavBar