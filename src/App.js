import useSound from 'use-sound';
import './App.css';
import Background from './Component/background';
import Card from './Component/card';
import apt from './APT.mp3';
import { getData } from './Component/API/manageData';
import { modelMobile } from './Component/Constants';
import { useLayoutEffect, useState } from 'react';
import { isMobile, mobileModel, deviceDetect } from 'react-device-detect'


function App() {
  let [onplay] = useSound(apt)
  const play = () => {
    onplay();
  }
  const [trigger, setTrigger] = useState(true)
  const modalBackdrop = document.querySelector(".modal-backdrop")
  if (modalBackdrop) {
    modalBackdrop.classList.add("addtion-Class")
    modalBackdrop.addEventListener("click", () => {
      play();
    })
  }


  useLayoutEffect(() => {
    document.getElementById("triggerButton")?.click();
    setTrigger(false);
    localStorage.clear();
    getData()
    console.log(deviceDetect())
    console.log(mobileModel)
    if (isMobile)
      localStorage.setItem(modelMobile, mobileModel)
    else localStorage.setItem(modelMobile, deviceDetect().toString())
  }, [])

  return (
    <>
      <div style={{ overflow: "hidden", }}>
        <Background />
        <Card />
      </div>
      {trigger && <button type="button" id="triggerButton"
        className="btn btn-primary disappear" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      }
      <div onClick={play} className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
        <div className="modal-dialog marginTopcenter">
          <div className="modal-content" onClick={() => { }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5 ceterText" id="exampleModalLabel">Lời Tâm sự</h1>
              <button type="button" onClick={play} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Chào bạn, khi bạn nhìn thấy những lời này là biết rằng mình quý bạn lắm đấy <br />
              <br />
              <span className='bold'>
                Best Regards. Ruby
              </span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={play} >Close</button>
            </div>
          </div>
        </div>
      </div></>


  );
}

export default App;
