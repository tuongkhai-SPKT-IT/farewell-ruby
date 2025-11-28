import './card.css';
import { useEffect, useState } from "react";
import { postData } from "../API/manageData"
import AlertWarning from "../Alert"
import *as constants from '../Constants';

import RubyImage from '../RubyImage';

export default function Card() {
    const [open, setOpen] = useState(false)
    const [inviter, setInviter] = useState("")
    const [statusPOST, setStatusPOST] = useState(false)
    const [alert, setAlert] = useState(false)
    const [status, setStatus] = useState(constants.failed);
    const childAlert = (value) => {
        setAlert(value);
    }
    const openCard = () => {
        setOpen(!open)
        // document.getElementById("customerInvited").focus();

    }
    const topupcard = () => {
        if (inviter.length === 0) {
            setAlert(true)
            setStatus(constants.failed)
            setTimeout(() => {
                document.getElementById("customerInvited").focus();
            }, 5000);
            return;
        }
        if (inviter.length > 0) {
            setStatusPOST(true)
            document.getElementById("customerInvited").blur();
            postData(inviter, setInviter, setStatusPOST, setOpen, setAlert, setStatus)
            setStatus()
            // window.location.reload();
        }
    }
    useEffect(() => {
        // const doorHandle = document.querySelector('.hyper-button.door-handle');
        // const doorContainer = document.querySelector('.door-container');
        const welcomeSign = document.querySelector('.welcome-sign');
        if (open) {
            welcomeSign.innerHTML = "RUNNNNNN!!!!!  ";
        } else {
            welcomeSign.innerHTML = "WELCOME TO <br> GALAXY PAY";
        }
        // document.getElementById("customerInvited").value = "";
        // Optional: Âm thanh khi mở cửa    
        // const audio = new Audio('door-open.mp3'); // Thêm file âm thanh của bạn
        // audio.play();
    }, [open])

    return (
        <>
            {alert &&
                <>
                    <AlertWarning setAlert={childAlert} status={status} />
                </>}
            {/* {status && <img src={process.env.PUBLIC_URL + '/takePhoto.png'} alt='không có gì'/>} */}
            <div className={`door-container ${open ? "door-open" : ""}`} >
                {alert && !open &&
                    < RubyImage />
                }
                <div className={`card-container absolute-center ${open ? "open" : ""}`}>
                    <div className={`card ${statusPOST ? "transparent" : ""}`}>
                        {statusPOST ? <div className="pulsing-3"></div> :
                            <>
                                <h2>🎉 Thư mời ăn mừng! 🎉</h2>
                                <div className='flex-1 main-block'>
                                    <p className='text-left hello-block'>Xin chào,</p>
                                    <div className="mb-3" >
                                        <input
                                            type="text"
                                            className="form-control flex-1"
                                            name="customerInvited"
                                            id="customerInvited"
                                            aria-describedby="helpId"
                                            value={inviter}
                                            required
                                            onChange={(e) => setInviter(e.target.value)}
                                            placeholder="khách mời"
                                        // onClick={() => setOpen(true)}
                                        />
                                    </div>

                                </div>
                                <p className='text-left'>
                                    ☎️Tui có cái event và cần một người khiến buổi tiệc bớt nhạt. Yes, người đó là bạn. <br />
                                    🕗️Thời gian: <span className="highlight-text">18:00 ngày 27/11 (Thứ 5)</span>  <br />
                                    🏠Địa điểm: <span className="highlight-text position-text">Mộc Riêu Nướng <br />
                                        (9A, Lam Sơn, Phường 2, Quận Tân Bình, TPHCM)</span>
                                    <br />
                                    👉Đi cho tui vui, còn không đi thì x2 ở đám cưới tui nhó.
                                </p>
                                <p className="sign-front text-center bold">Trân trọng, <span className="sign-after">Ruby</span></p>

                                <button onClick={topupcard} className="button-confirm">OK, Đồng ý!</button>

                            </>
                        }


                    </div>
                </div >
                <div onClick={openCard} className="door-frame"></div>
                <div className="door">
                    <div onClick={openCard} className="door-left"></div>
                    <div onClick={openCard} className="door-right"></div>

                    <button onClick={openCard} className="hyper-button door-handle"></button>

                    <div className="welcome-sign">
                        WELCOME TO <br /> GALAXY PAY
                    </div>
                </div>
            </div >
        </>

    )
}
