import React,{useState} from 'react'
import {withRouter} from 'react-router-dom'
import StarImage from '../../../Images/stars.png'
import MoonImage from '../../../Images/moon.png'
import MountainFrontImage from '../../../Images/mountains_front.png'
import MountainBackImage from '../../../Images/mountains_behind.png'


const StartPage = () => {

    const [ScrollValue, SetScrollValue] = useState<number>(0)

    const ScrollEvent = () => {
        window.addEventListener('scroll', function(){
            let value:number = window.scrollY;
            SetScrollValue(value);
        })
    }
    return (
        <div>
            <div>

                <section>
                    <img src={StarImage} id="stars"/>
                    <img src={MoonImage} id="moon" style={{
                        top: ScrollValue*1.05+'px'
                    }}/>
                    <img src={MountainBackImage} id="mountains_back" style={{
                        top: ScrollValue*0.5+'px'
                    }}/>
                    <h2 id="text" style={{
                        marginRight: ScrollValue*4+'px',
                        marginTop: ScrollValue*1.5+'px',
                    }}>WELCOME</h2>
                    <a href="#sec" id="btn" style={{
                        marginTop: ScrollValue*1.5+'px',
                    }}>Explore</a>
                    <img src={MountainFrontImage} id="mountains_front" style={{
                        top: ScrollValue*0+'px'
                    }}/>

                </section>
                <div className="sec" id="sec">
                    <h2>Polaroid</h2>
                    <p>Polaroid에 오신것을 환영합니다</p><br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    <br/><br/>
                    
                </div>
                <>{ScrollEvent()}</>
                
            </div>
        </div>
    )
}

export default withRouter(StartPage)