import './card.css';
import { useEffect, useState } from "react";
import { postData } from "../API/manageData"

export default function Card() {
    const [open, setOpen] = useState(false)
    const [inviter, setInviter] = useState("")
    const [statusPOST, setStatusPOST] = useState(false)
    const topupcard = () => {
        if (open) {
            if (inviter.length === 0) {
                alert("Ghi tên vào nhanh lên")
                return
            }
            document.getElementById("customerInvited").focus();
        }
        if (inviter.length > 0) {
            setStatusPOST(true)
            postData(inviter, setInviter, setStatusPOST, setOpen)
        }
        // else  document.getElementById("customerInvited").;



    }
    useEffect(() => {
        // const doorHandle = document.querySelector('.hyper-button.door-handle');
        // const doorContainer = document.querySelector('.door-container');
        const welcomeSign = document.querySelector('.welcome-sign');
        if (open) {
            welcomeSign.innerHTML = "RUNNNNNN!!!!!  ";
        } else {
            welcomeSign.innerHTML = "WELCOME TO <br> GALAXYPAY";
        }
        // document.getElementById("customerInvited").value = "";
        // Optional: Âm thanh khi mở cửa
        // const audio = new Audio('door-open.mp3'); // Thêm file âm thanh của bạn
        // audio.play();
    }, [open])

    return (
        <>
            <div className={`door-container ${open ? "door-open" : ""}`} >
                <div className={`card-container absolute-center ${open ? "open" : ""}`}>
                    <div className="card">
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
                                <p className='text-left'>Chúc bạn luôn có những khoảnh khắc tuyệt vời và tràn đầy niềm vui trong cuộc sống. Cầu mong mọi điều tốt đẹp nhất sẽ đến với bạn!</p>
                                <p className="sign-front text-center">Trân trọng, <span className="sign-after">Ruby</span></p>

                                <a href="#　" onClick={topupcard} className="button-confirm">Ooh, shiny!</a>

                            </>
                        }


                    </div>
                </div >
                <div onClick={() => setOpen(!open)} className="door-frame"></div>
                <div className="door">
                    <div onClick={() => setOpen(!open)} className="door-left"></div>
                    <div onClick={() => setOpen(!open)} className="door-right"></div>

                    <button onClick={() => setOpen(!open)} className="hyper-button door-handle"></button>

                    <div className="welcome-sign">
                        WELCOME TO <br /> GALAXYPAY
                    </div>
                </div>
            </div >
        </>

    )
}
