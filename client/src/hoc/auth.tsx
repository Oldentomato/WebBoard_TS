import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {RouteComponentProps} from 'react-router-dom';


const Auth = (ComposedClass: Function, reload:boolean | null, adminRoute:boolean = false) => {
    //option -> null: 아무나 출입이 가능한 페이지
    //true: 로그인한 유저만 출입이 가능한 페이지
    //false: 로그인한 유저는 출입 불가능한 페이지

    const AuthenticationCheck = ({history}:RouteComponentProps) => {
        const [user, setuser] = useState<object>();
        useEffect(() => {

            axios.get('/api/users/auth').then(async response => {
                if (await !response.data.isAuth) {//로그인 하지 않은 상태
                    if (reload) {
                        history.push('/login')
                    }
                } else {
                    if (adminRoute && !response.data.isAdmin) {
                        history.push('/')
                    }
                    else {
                        if (reload === false) {
                            history.push('/')
                        }
                    }
                }
                setuser(response.data)
            })
            
        }, [axios.get, history])

        return (
            <ComposedClass {...history} user={user} />
        )

    }

    return AuthenticationCheck
}

export default Auth