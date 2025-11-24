import "./RubyImage.css";
import React, { useEffect, useState } from 'react'

export default function RubyImage() {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(true);
    }, [])


    return (
        <>
            {/* <button id="startFade" onClick={() => setVisible(!visible)}>Bấm để hiện phần tử</button> */}
            <div id="box" className={`fade-in-element image-container ${visible ? "is-visible" : ""}`}>
                <img src="transparent.jpg"
                    alt="Cô gái và bó hoa" className="image-responsive"></img>
            </div>
        </>

    )
}
