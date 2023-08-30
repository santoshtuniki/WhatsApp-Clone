function CallVideo({
    myRef,
    myClass,
    setToggle
}) {
    return (
        <div>
            <video
                ref={myRef}
                playsInline
                muted
                autoPlay
                className={myClass}
                onClick={() => setToggle((prev) => !prev)}
            ></video>
        </div>
    )
}

// Default export
export default CallVideo;