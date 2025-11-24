import { useEffect, useState } from 'react';
import './Alert.css'
import * as constant from "../Constants"

/* eslint-disable */
export default function Alert({ setAlert, status }) {
    let autoHideTimeout;
    const [alertBoxClassName, setAlertBoxClassName] = useState(["alert-box", status])
    const showAlert = () => {
        const classTemp = [...alertBoxClassName];
        classTemp.push("show")
        setAlertBoxClassName(classTemp)
        clearTimeout(autoHideTimeout);

        // Tự động ẩn sau 5 giây
        autoHideTimeout = setTimeout(() => {
            hideAlert();
        }, 5000);
    }

    useEffect(() => {
        showAlert();
    }, [])

    function hideAlert() {
        let classTemp = [...alertBoxClassName];
        if (classTemp.includes('show')) {
            classTemp = classTemp.filter(e => { return e !== "show" });
        }
        setAlertBoxClassName(classTemp)
        console.log(alertBoxClassName)
        clearTimeout(autoHideTimeout);
        setAlert(false)
    };

    return (
        <>
            <div id="customAlert" className={alertBoxClassName.join(" ")}>
                <div className="alert-content">
                    <span className="icon"> {status === constant.success ? "✔️" : "❌"}</span>
                    <p className="message">
                        {status === constant.success ?
                            "OK! Tui tặng bạn 1 bó hoa nè. Hẹn bạn 30/11 nhó!!!"
                            : "**Bạn ơi! ** Vui lòng nhập tên của bạn vô bạn ơi! **."}
                    </p>
                    <button className="close-btn" onClick={hideAlert}>×</button>
                </div>
            </div>

        </>
    )
}