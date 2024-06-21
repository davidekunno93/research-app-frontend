
import { useContext, useEffect } from "react";
import { StudyVisit, SubjectVisit } from "../../TypeFile";
import "./rightsidepanel.css"
import { DataContext } from "../../context/DataProvider";

type RightSidePanelProps = {
    open: boolean
    subjectId: string | null
    subjectVisit: SubjectVisit | null
    studyVisit: StudyVisit | null
    onClose: Function
}

const RightSidePanel = ({ open, subjectId, subjectVisit, studyVisit, onClose }: RightSidePanelProps) => {

    const { timeFunctions, textFunctions, wait } = useContext(DataContext);
    // pass thru subjectId, and studyVisitObj and studyVisitObj
    // const subjectVisit: SubjectVisit = {
    //     id: "Visit-1",
    //     title: "Visit 1",
    //     date: "07/14/2024",
    //     targetDate: "07/14/2024",
    //     windowStart: "07/07/2024",
    //     windowEnd: "07/21/2024",
    //     icfSigned: true,
    //     oow: false,
    //     status: "scheduled",
    //     comments: {
    //         1: {
    //             comment: "Patient agreed to visit over the phone on 01Jul24",
    //             timeStamp: "07/01/2024, 10:30",
    //             byUser: "David Ekunno",
    //         }
    //     }
    // }

    useEffect(() => {
        if (open && subjectId && subjectVisit && studyVisit) {
            openPanel();
        }
    }, [open])
    
    const openPanel = () => {
        const content = document.getElementById("rightPanelContent");
        wait(100).then(() => {
            content?.classList.replace("hidden", "shown");
        })
    }
    const closePanel = () => {
        const content = document.getElementById("rightPanelContent");
        content?.classList.replace("shown", "hidden");
        wait(800).then(() => {
            onClose();
        })
    }


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

            {open && subjectId && subjectVisit && studyVisit &&
                <div id="rightPanelContent" className="rightsidepanel-content hidden">
                    <div onClick={() => closePanel()} className="closeBtn">
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <div className="view-visit">
                        <div className="head">
                            <p className="subject-number">#{subjectId}</p>
                            <div className="flx-r gap-4 align-c w-100">
                                <p className="title">{subjectVisit.title}</p>
                                <div className="stack-text gray-text">
                                    <p className="x-small aligns-l">{textFunctions.titalize(studyVisit.visitType.replace(/-/g, " "))}</p>
                                    <p className="x-small aligns-l">visit</p>
                                </div>
                            </div>
                            <div className="date">
                                <p className={`${!subjectVisit.date && "gray-text"}`}>{subjectVisit.date ? timeFunctions.datify(subjectVisit.date) : "Not Scheduled"}</p>
                                <span className="material-symbols-outlined">edit</span>
                            </div>
                            <div className="status">
                                <p><b>Status:</b> {textFunctions.titalize(subjectVisit.status)}</p>
                                <span className="material-symbols-outlined">edit</span>
                            </div>

                        </div>
                        <hr className="w-85" />
                        <div className="body">

                            <div className="detail">
                                <p className="key">Target date:</p>
                                {subjectVisit.targetDate ?
                                    <p>{timeFunctions.datify(subjectVisit.targetDate)}</p>
                                    :
                                    <p className="gray-text">None</p>
                                }
                            </div>
                            <div className="detail">
                                <p className="key">Visit Window:</p>
                                {subjectVisit.windowStart && subjectVisit.windowEnd ?
                                    <p>{timeFunctions.datify(subjectVisit.windowStart) + " - " + timeFunctions.datify(subjectVisit.windowEnd)}</p>
                                    :
                                    <p className="gray-text">N/A</p>
                                }
                            </div>
                            <div className="detail">
                                <p className="key">Visit Type:</p>
                                <p>{textFunctions.titalize(studyVisit.visitType.replace(/-/g, " "))}</p>
                            </div>
                            <div className="detail">
                                <p className="key">ICF Signed:</p>
                                <p>{subjectVisit.icfSigned ? "Yes" : "No"}</p>
                            </div>
                            <div className="detail">
                                <p className="key">Out of window:</p>
                                <p className={`${subjectVisit.oow && "red-text"}`}>{subjectVisit.oow ? "Yes" : "No"}</p>
                            </div>
                            {/* <div className="detail">
                            <span className="material-symbols-outlined">keyboard_arrow_down</span>
                            <p className="bold500">Visit Description</p>
                        </div> */}
                            <div className="detail-drop">
                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                <p className="bold500">Comments</p>
                            </div>


                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
export default RightSidePanel;