// component imports
import { Ringing } from './index';

function Call({ call, setCall, callAccepted }) {
    const { receivingCall, callEnded } = call;

    return (
        <div>
            {
                receivingCall && !callAccepted && (
                    <Ringing call={call} setCall={setCall} />
                )
            }
        </div>
    )
}

// Default export
export default Call;