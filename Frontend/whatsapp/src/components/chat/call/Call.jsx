// module imports
import { useState } from 'react';

// component imports
import { Ringing, Header, CallArea, CallActions, CallVideo } from './index';

function Call({
    call,
    setCall,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    answerCall,
    show,
}) {
    const { receivingCall, callEnded, name, picture } = call;

    const [showActions, setShowActions] = useState(false);
    const [toggle, setToggle] = useState(false);

    return (
        <div
            className={
                `fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
                ${receivingCall && !callAccepted ? 'hidden' : ''}
            `}
            onMouseOver={() => setShowActions(true)}
            onMouseOut={() => setShowActions(false)}
        >
            {/*Container*/}
            <div>
                <div>
                    {/*Header*/}
                    <Header />

                    {/*Call area*/}
                    <CallArea
                        name={name}
                        callAccepted={callAccepted}
                    />

                    {/*Call actions*/}
                    {
                        showActions ? <CallActions /> : null
                    }
                </div>

                {/*Video streams*/}
                <div>
                    {/*user video*/}
                    {
                        callAccepted && !callEnded ? (
                            <div>
                                <video
                                    ref={userVideo}
                                    playsInline
                                    muted
                                    autoPlay
                                    className={toggle ? 'SmallVideoCall' : 'largeVideoCall'}
                                    onClick={() => setToggle((prev) => !prev)}
                                ></video>
                            </div>
                        ) : null
                    }

                    {/*my video*/}
                    {
                        stream ? (
                            <div>
                                <video
                                    ref={myVideo}
                                    playsInline
                                    muted
                                    autoPlay
                                    className={
                                        `${toggle ? 'largeVideoCall' : 'SmallVideoCall'} ${showActions ? 'moveVideoCall' : ''}`
                                    }
                                    onClick={() => setToggle((prev) => !prev)}
                                ></video>
                            </div>
                        ) : null
                    }
                </div>
            </div>

            {/*Ringing*/}
            {
                receivingCall && !callAccepted && (
                    <Ringing
                        call={call}
                        setCall={setCall}
                        answerCall={answerCall}
                    />
                )
            }

            {/*calling ringtone*/}
            {
                !callAccepted && show ? (
                    <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio>
                ) : null
            }
        </div>
    )
}

// Default export
export default Call;