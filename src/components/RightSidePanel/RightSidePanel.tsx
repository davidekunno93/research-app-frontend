import "./rightsidepanel.css"

const RightSidePanel = () => {
    return (
        <div className="rightsidepanel-container">
            <div className="rightsidepanel-options">
                <div className="option">
                    <div className="tooltip">
                        <div className="tooltip-box">
                            <p>Notifications</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined">notifications</span>
                </div>
                <div className="option">
                    <div className="tooltip">
                        <div className="tooltip-box">
                            <p>View feed</p>
                        </div>
                    </div>
                    <span className="material-symbols-outlined">bolt</span>
                </div>
            </div>
            <div className="rightsidepanel-content d-none">
                <div className="view-visit">
                    <div className="head">
                        <p className="subject-number">#016-0001</p>
                        <div className="flx-r gap-4 align-c w-100">
                            <p className="title">Visit 1</p>
                            <div className="stack-text gray-text">
                                <p className="x-small aligns-l">Screening</p>
                                <p className="x-small aligns-l">visit</p>
                            </div>
                        </div>
                        <div className="date">
                            <p>10 Jun, 2024</p>
                            <span className="material-symbols-outlined">edit</span>
                        </div>
                        <div className="status">
                            <p><b>Status:</b> Completed</p>
                            <span className="material-symbols-outlined">edit</span>
                        </div>

                    </div>
                    <hr className="w-85" />
                    <div className="body">

                        <div className="detail">
                            <p className="bold500">Target date:</p>
                            <p>...</p>
                        </div>
                        <div className="detail">
                            <p className="bold500">Visit Window:</p>
                            <p>...</p>
                        </div>
                        <div className="detail">
                            <p className="bold500">Visit Type:</p>
                            <p>...</p>
                        </div>
                        <div className="detail">
                            <p className="bold500">ICF Signed:</p>
                            <p>...</p>
                        </div>
                        <div className="detail">
                            <p className="bold500">Late:</p>
                            <p>...</p>
                        </div>
                        <div className="detail">
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                            <p className="bold500">Visit Description</p>
                        </div>
                        <div className="detail">
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                            <p className="bold500">Comments</p>
                            
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default RightSidePanel;