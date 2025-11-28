import { ID, TimeStart, TimeEnd, AcceptDate, Name, modelMobile, PositionT5, success, positionField } from "../Constants";
// export const ID = "ID"
// export const TimeStart = "TimeStart"
// export const AcceptDate = "AcceptDate"
// export const Name = "Họ và tên"
// export const TimeEnd = "TimeEnd"
// export const modelMobile = "mobileModel"

const scriptURL = 'https://script.google.com/macros/s/AKfycbyZ-OltR-cC213b2XhUQNSWlf4Fk-MFX4CXkOOM7c6YuaXu54GIPqql1Ae8EnxSSkd_NA/exec'

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
function formatDay(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        console.log("Định dạng ngày không hợp lệ"); // Xử lý nếu chuỗi không hợp lệ
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

//Manage Data from API
export const getData = () => {
    fetch(scriptURL).then(response => {
        response.json().then((res) => {
            localStorage.setItem(ID, res[0] === "ID" ? 1 : res[0] + 1)
        });
        const now = new Date();

        localStorage.setItem(TimeStart, formatDate(now))
    }).catch(e => {
        console.log(e)
    })
}
export const postData = (inviter, setInviter, setStatusPOST, setOpen, setAlert, setStatus) => {
    const formData = new FormData();
    ///data post
    const now = new Date();
    formData.append(ID, localStorage.getItem(ID))
    formData.append(TimeStart, localStorage.getItem(TimeStart))
    formData.append(AcceptDate, formatDay(now))
    formData.append(Name, inviter)
    formData.append(modelMobile, localStorage.getItem(modelMobile))
    formData.append(positionField, PositionT5)

    if (!ID || !TimeStart || !AcceptDate || !Name) return;


    formData.append(TimeEnd, formatDate(now))
    // post data
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            console.log("đã ghi");
            console.log(response);
            setInviter("")
            setTimeout(() => {
                setAlert(true)
                setOpen(false)
                setStatusPOST(false)
            }, 2000);
            setStatus(success)
        })
        .catch(error => console.error('Error!', error.message))
}