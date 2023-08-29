// module imports
import { useState } from 'react';

// component imports
import { Ringing, Header, CallArea, CallActions } from './index';

function Call({ call, setCall, callAccepted }) {
    const { receivingCall, callEnded } = call;

    const [showActions, setShowActions] = useState(false);

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
                        name='sneha'
                    />

                    {/*Call actions*/}
                    {
                        showActions ? <CallActions /> : null
                    }
                </div>
            </div>

            {/*Ringing*/}
            {
                receivingCall && !callAccepted && (
                    <Ringing
                        call={call}
                        setCall={setCall}
                    />
                )
            }
        </div>
    )
}

// Default export
export default Call;