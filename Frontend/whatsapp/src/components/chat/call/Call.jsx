// component imports
import { Ringing } from './index';

function Call({ call, setCall, callAccepted }) {
    const { receiveingCall, callEnded } = call;

    return (
        <div>
            {
                receiveingCall && !callAccepted && (
                    <Ringing call={call} setCall={setCall} />
                )
            }
        </div>
    )
}

// Default export
export default Call;