import { useEffect, useRef, useState } from 'react'
import "./modals.css"
import { Fade } from 'react-awesome-reveal'
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker'
import { Comment, Demographics } from '../../TypeFile';

type AddSubjectModalProps = {
    open: boolean
    nextSubjectId: {
        subjectId: string
        trailingId: string
    }
    onClose: Function
};

const AddSubjectModal = ({ open, nextSubjectId, onClose }: AddSubjectModalProps) => {
    if (!open) return null;
    // [onload]

    // [elements]
    type SubjectPrecursor = {
        id: string
        demographics: Demographics
        studyName: string
        status: string
        comments: {
            [key: number]: Comment
        }
        screeningDate: string
        enrollmentDate: string
    }
    const [newSubject, setNewSubject] = useState<SubjectPrecursor>({
        id: "",
        demographics: {
            initials: "",
            birthYear: 0,
            language: "",
            gender: "",
        },
        studyName: "",
        status: "Not Screened",
        comments: {
            1: {
                comment: "",
                timeStamp: "",
                byUser: "",
            }
        },
        screeningDate: "",
        enrollmentDate: "",
    });
    // [demography]
    const genderRef = useRef<HTMLInputElement>(null);
    const genderDropperRef = useRef<HTMLInputElement>(null);
    const genderInputRef = useRef<HTMLInputElement>(null);
    const genderDropdownRef = useRef<HTMLInputElement>(null);
    const [genderDropdownOpen, setGenderDropdownOpen] = useState<boolean>(false);
    const languageRef = useRef<HTMLInputElement>(null);
    const languageDropperRef = useRef<HTMLInputElement>(null);
    const languageInputRef = useRef<HTMLInputElement>(null);
    const languageDropdownRef = useRef<HTMLInputElement>(null);
    const [languageDropdownOpen, setLanguageDropdownOpen] = useState<boolean>(false);
    const closeAllDropdowns = () => {
        // close all dropdown menus
    }
    // [enrollment]
    const enrollmentRef = useRef<HTMLInputElement>(null);
    const enrollmentDropdownRef = useRef<HTMLInputElement>(null);
    const [enrollmentDropdownOpen, setEnrollmentDropdownOpen] = useState<boolean>(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState<string>("Not Screened");
    useEffect(() => {
        if (enrollmentStatus === "Not Screened") {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.enrollmentDate = "";
            setNewSubject(newSubjectCopy);
        }
    }, [enrollmentStatus])

    const [screenDate, setScreenDate] = useState<any>("");
    useEffect(() => {
        subjectFuntions.updateScreenDate(screenDate);
    }, [screenDate]);
    const [enrollDate, setEnrollDate] = useState<any>("");
    useEffect(() => {
        subjectFuntions.updateEnrollDate(enrollDate);
    }, [enrollDate]);

    const [intitialsValid, setInitialsValid] = useState<boolean>(false);
    useEffect(() => {
        let initials = newSubject.demographics.initials;
        if (initials.length > 3 || initials.length < 2) {
            setInitialsValid(false);
        } else {
            setInitialsValid(true);
        }
    }, [newSubject.demographics.initials])

    const [ageVerified, setAgeVerified] = useState<boolean>(false);
    useEffect(() => {
        const birthYear = newSubject.demographics.birthYear;
        if (2024 - birthYear < 18 || 2024 - birthYear > 122) {
            setAgeVerified(false);
        } else {
            setAgeVerified(true);
        }
    }, [newSubject.demographics.birthYear])

    useEffect(() => {
        document.addEventListener('click', hideOnClickOutside, true);
        return () => document.removeEventListener('click', hideOnClickOutside, true);
    }, [])
    const hideOnClickOutside = (e: any) => {
        // gender, language
        // console.log("working")
        if (genderRef.current && !genderRef.current.contains(e.target) && !genderDropperRef.current?.contains(e.target) && !genderDropdownRef.current?.contains(e.target)) {
            // check if e.target outside genderInputRef
            // console.log("gender ref block")
            setGenderDropdownOpen(false);
        }
        if (languageInputRef.current && !languageInputRef.current.contains(e.target) && !languageDropperRef.current?.contains(e.target) && !languageDropdownRef.current?.contains(e.target)) {
            // check if e.target outside languageRef
            // console.log("lang ref block")
            setLanguageDropdownOpen(false);
        }
    }

    const subjectFuntions = {
        updateBirthYear: function (birthYear: string) {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.demographics.birthYear = parseInt(birthYear);
            setNewSubject(newSubjectCopy);
        },
        updateComments: function (comment: string) {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.comments[1].comment = comment.trim();
            setNewSubject(newSubjectCopy);
        },
        updateEnrollDate: function (newEnrollDate: string) {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.enrollmentDate = newEnrollDate;
            setNewSubject(newSubjectCopy);
        },
        updateEnrollmentStatus: function (newStatus: string) {
            // change options in enrollment section - update enrollment status state
            setEnrollmentStatus(newStatus);
            // close dropdown
            setEnrollmentDropdownOpen(false);

            // update new subject status 
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.status = newStatus;
            setNewSubject(newSubjectCopy);
        },
        updateGender: function (gender: string) {
            if (genderInputRef.current) {
                genderInputRef.current.value = gender;
            }
            setGenderDropdownOpen(false);

            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.demographics.gender = gender;
            setNewSubject(newSubjectCopy);
        },
        updateInitials: function (initials: string) {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.demographics.initials = initials.toUpperCase();
            setNewSubject(newSubjectCopy);
        },
        updateLanguage: function (language: string) {
            if (languageInputRef.current) {
                languageInputRef.current.value = language;
            }
            setLanguageDropdownOpen(false);

            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.demographics.language = language;
            setNewSubject(newSubjectCopy);
        },
        updateScreenDate: function (newScreenDate: string) {
            const newSubjectCopy = { ...newSubject };
            newSubjectCopy.screeningDate = newScreenDate;
            setNewSubject(newSubjectCopy);
        },
    };

    const dateIsAfter = (dateToCompare: string, dateToCheck: string) => {
        // if dates are the same it will return true
        const compareYear = parseInt(dateToCompare.slice(6));
        const compareMonth = parseInt(dateToCompare.slice(0, 2));
        const compareDay = parseInt(dateToCompare.slice(3, 5));
        const checkYear = parseInt(dateToCheck.slice(6));
        const checkMonth = parseInt(dateToCheck.slice(0, 2));
        const checkDay = parseInt(dateToCheck.slice(3, 5));
        if (checkYear > compareYear) {
            return true;
        } else if (checkYear < compareYear) {
            return false;
        } else {
            if (checkMonth > compareMonth) {
                return true;
            } else if (checkMonth < compareMonth) {
                return false;
            } else {
                if (checkDay > compareDay) {
                    return true;
                } else if (checkDay < compareDay) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
    const isNewSubjectValid = (): boolean => {
        if (newSubject.demographics.initials && newSubject.demographics.gender && newSubject.demographics.birthYear && newSubject.demographics.language && ageVerified && intitialsValid) {
            if (newSubject.status === "Screened") {
                if (newSubject.screeningDate) {
                    return true;
                } else {
                    return false;
                }
            } else if (newSubject.status === "Randomized") {
                if (newSubject.screeningDate && newSubject.enrollmentDate) {
                    // check if enrollment date is after screening date
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }

    }

    const addSubject = () => {
        if (isNewSubjectValid()) {
            if (newSubject.status === "Randomized") {
                // isNewSubjectValid has confirmed both screen and enroll dates have been entered
                // check if enrollment date is after screening date
                if (dateIsAfter(newSubject.screeningDate, newSubject.enrollmentDate)) {
                    // add randomized subject
                } else {
                    alert("Enrollment needs to be performed after screening");
                }

            } else {
                // add non-randomized subject
            }
        } else {
            alert("Please complete all required items before adding the subject");
        }
    }



    useEffect(() => {
        // console.log(typeof new Date());
    }, [])

    const printSubject = () => {
        console.log(newSubject);
    };
    const timeFunctions = {
        datinormal: function (systemDate: any, dateOrTime?: "date" | "time" | "dateAndTime" | null) {
            // system date => mm/dd/yyyy
            let day = systemDate.getDate().toString().length === 1 ? "0" + systemDate.getDate() : systemDate.getDate()
            let month = systemDate.getMonth().toString().length + 1 === 1 ? "0" + (systemDate.getMonth() + 1) : systemDate.getMonth() + 1
            if (month.toString().length === 1) {
                month = "0" + month
            }
            let fullYear = systemDate.getFullYear();
            let hour = systemDate.getHours().toString().length === 1 ? "0" + systemDate.getHours() : systemDate.getHours();
            let minutes = systemDate.getMinutes().toString().length === 1 ? "0" + systemDate.getMinutes() : systemDate.getMinutes();
            let timeConverted = hour + ":" + minutes;
            let dateConverted = month + "/" + day + "/" + fullYear
            if (!dateOrTime || dateOrTime === "date") {
                return dateConverted
            } else if (dateOrTime === "time") {
                return timeConverted
            } else if (dateOrTime === "dateAndTime") {
                return dateConverted + ", " + timeConverted
            } else {
                // else block to remove possibility of returning undefined type output
                return ""
            };
        },
        datify: function (normalDate: string) {
            // mm/dd/yyyy => mmm dd, yy
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let day = normalDate.slice(3, 5);
            let monthNum = normalDate.slice(0, 2);
            if (monthNum.charAt(0) === "0") {
                monthNum = monthNum[1];
            }
            let fullYear = normalDate.slice(6);
            const month = months[parseInt(monthNum) - 1];
            if (day.charAt(0) === "0") {
                day = day[1];
            }
            let twoYear = fullYear.slice(2);
            return month + " " + day + ", " + twoYear;
        },
        datidash: function (normalDate: string) {
            // mm/dd/yyyy => yyyy-mm-dd
            let year = normalDate.slice(6);
            let month = normalDate.slice(0, 2);
            let day = normalDate.slice(3, 5);
            return year + "-" + month + "-" + day
        },
        datiundash: function (dashDate: string) {
            // yyyy-mm-dd => mm/dd/yyyy
            let fullyear = dashDate.slice(0, 4)
            let month = dashDate.slice(5, 7)
            let day = dashDate.slice(8)
            return month + "/" + day + "/" + fullyear
        },
        dayToDate: function (days: number): string {
            const year = new Date().getFullYear();
            const isLeapYear: boolean = year % 4 === 0;
            const totalDays: number = isLeapYear ? 366 : 365;
            if (days > totalDays) {
                return "Too many days"
            } else if (days < 0) {
                return "Number of days must be positive"
            }
            const months = {
                "01": 31,
                "02": isLeapYear ? 29 : 28,
                "03": 31,
                "04": 30,
                "05": 31,
                "06": 30,
                "07": 31,
                "08": 31,
                "09": 30,
                "10": 31,
                "11": 30,
                "12": 31,
            };
            // if days is less than or equal to month days then stop 
            const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            for (let i = 0; i < monthArr.length; i++) {
                const monthNum = monthArr[i][0];
                const monthDays = monthArr[i][1];
                if (days > monthDays) {
                    days -= monthDays;
                } else {
                    const dayOfTheMonth = days.toString().length === 2 ? days.toString() : "0" + days.toString();
                    const monthOfTheYear = monthNum;
                    return dayOfTheMonth + "/" + monthOfTheYear + "/" + year.toString();
                }
            }
            return "Function should never reach this point"
        },
        dateToDay: function (date: string): number {
            // this func doesn't validate the date exists i.e. 01/32/2024 would take
            const year = new Date().getFullYear();
            const isLeapYear: boolean = year % 4 === 0;
            const dateMonth: string = date.slice(3, 5);
            const dateDays: number = parseInt(date.slice(0, 2));
            let days: number = 0;
            const months = {
                "01": 31,
                "02": isLeapYear ? 29 : 28,
                "03": 31,
                "04": 30,
                "05": 31,
                "06": 30,
                "07": 31,
                "08": 31,
                "09": 30,
                "10": 31,
                "11": 30,
                "12": 31,
            };
            const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            for (let i = 0; i < monthArr.length; i++) {
                const monthNum: string = monthArr[i][0];
                const monthDays: number = monthArr[i][1];
                if (dateMonth === monthNum) {
                    // add days from date
                    days += dateDays;
                    // stop
                    break;
                } else {
                    // add monthDays
                    days += monthDays;
                };
            };
            return days;
        },
        addDays: function (date: string, days: number): string {
            let yearDay: number = timeFunctions.dateToDay(date);
            yearDay += days;
            date = timeFunctions.dayToDate(yearDay);
            return date;
        },
    }

    const dayToDate = (days: number): string => {
        const year = new Date().getFullYear();
        const isLeapYear: boolean = year % 4 === 0;
        const totalDays: number = isLeapYear ? 366 : 365;
        if (days > totalDays) {
            return "Too many days"
        } else if (days < 0) {
            return "Number of days must be positive"
        }
        const months = {
            "01": 31,
            "02": isLeapYear ? 29 : 28,
            "03": 31,
            "04": 30,
            "05": 31,
            "06": 30,
            "07": 31,
            "08": 31,
            "09": 30,
            "10": 31,
            "11": 30,
            "12": 31,
        };
        // if days is less than or equal to month days then stop 
        const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
        for (let i = 0; i < monthArr.length; i++) {
            const monthNum = monthArr[i][0];
            const monthDays = monthArr[i][1];
            if (days > monthDays) {
                days -= monthDays;
            } else {
                const dayOfTheMonth = days.toString().length === 2 ? days.toString() : "0" + days.toString();
                const monthOfTheYear = monthNum;
                return dayOfTheMonth + "/" + monthOfTheYear + "/" + year.toString();
            }
        }
        return "Function should never reach this point"
    }
    const dateToDay = (date: string): number => {
        // this func doesn't validate the date exists i.e. 01/32/2024 would take
        const year = new Date().getFullYear();
        const isLeapYear: boolean = year % 4 === 0;
        const dateMonth: string = date.slice(3, 5);
        const dateDays: number = parseInt(date.slice(0, 2));
        let days: number = 0;
        const months = {
            "01": 31,
            "02": isLeapYear ? 29 : 28,
            "03": 31,
            "04": 30,
            "05": 31,
            "06": 30,
            "07": 31,
            "08": 31,
            "09": 30,
            "10": 31,
            "11": 30,
            "12": 31,
        };
        const monthArr = Object.entries(months).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
        for (let i = 0; i < monthArr.length; i++) {
            const monthNum: string = monthArr[i][0];
            const monthDays: number = monthArr[i][1];
            if (dateMonth === monthNum) {
                // add days from date
                days += dateDays;
                // stop
                break;
            } else {
                // add monthDays
                days += monthDays;
            };
        };
        return days;
    };
    const addDays = (date: string, days: number): string => {
        let yearDay: number = dateToDay(date);
        yearDay += days;
        date = dayToDate(yearDay);
        return date;
    };
    useEffect(() => {
        // console.log(addDays("06/06/2024", -7));
    }, []);
    return (
        <div className="overlay-placeholder">
            <Fade duration={200} triggerOnce>
                <div className="overlay">
                    <div className="modal add-subject">
                        <div className="closeBtn">
                            <span onClick={() => onClose()} className="material-symbols-outlined">close</span>
                        </div>
                        <div onClick={() => printSubject()} className="title">
                            <p className="main">Add Subject - PREDICT</p>
                            <p className="sub">Subject#: 016-{nextSubjectId.trailingId}
                                <span className="material-symbols-outlined gray-text small ml-2 pointer">edit</span>
                            </p>
                        </div>

                        <div className="body">
                            <div className="section demography">
                                <p className="heading">DEMOGRAPHY</p>
                                <div className="row px-2">
                                    <div className="element initials">
                                        <p className="subheading">Initials <span className="red-text">*</span></p>
                                        <input onChange={(e: any) => subjectFuntions.updateInitials(e.target.value)} type="text" className={`input-primary ${!intitialsValid && "invalid-required"}`} placeholder='Enter Initials' required />
                                    </div>
                                    <div className="element gender">
                                        <p className="subheading">Gender <span className="red-text">*</span></p>
                                        <div ref={genderRef} onClick={() => setGenderDropdownOpen(true)} className="inputBox">
                                            <div ref={genderDropperRef} onClick={(e: any) => { e.stopPropagation(); setGenderDropdownOpen(genderDropdownOpen => !genderDropdownOpen) }} className="right-icon pointer">
                                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                            </div>
                                            <input ref={genderInputRef} type="text" className="input-primary gender" placeholder='Gender' readOnly />
                                            <div ref={genderDropdownRef} className={`dropdown ${!genderDropdownOpen && "hidden"}`}>
                                                <div onClick={(e: any) => { subjectFuntions.updateGender(e.target.innerText); e.stopPropagation() }} className="option">Female</div>
                                                <div onClick={(e: any) => { subjectFuntions.updateGender(e.target.innerText); e.stopPropagation() }} className="option">Male</div>
                                                <div onClick={(e: any) => { subjectFuntions.updateGender(e.target.innerText); e.stopPropagation() }} className="option">N/A</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-2">
                                    <div className="element birthYear">
                                        <p className="subheading">Year of Birth <span className="red-text">*</span></p>
                                        <input onChange={(e: any) => subjectFuntions.updateBirthYear(e.target.value)} type="text" className={`input-primary ${!ageVerified && "invalid-required"}`} placeholder='Enter Birth Year' required />
                                    </div>
                                    <div className="element language">
                                        <p className="subheading">Preferred language <span className="red-text">*</span></p>
                                        <div ref={languageRef} onClick={() => setLanguageDropdownOpen(true)} className="inputBox">
                                            <div ref={languageDropperRef} onClick={(e: any) => { setLanguageDropdownOpen(languageDropdownOpen => !languageDropdownOpen); e.stopPropagation() }} className="right-icon pointer">
                                                <span className="material-symbols-outlined">keyboard_arrow_down</span>
                                            </div>
                                            <input ref={languageInputRef} type="text" className="input-primary language" placeholder='Select language' readOnly />
                                            <div ref={languageDropdownRef} className={`dropdown ${!languageDropdownOpen && "hidden"}`}>
                                                <div onClick={(e: any) => { subjectFuntions.updateLanguage(e.target.innerText); e.stopPropagation() }} className="option">English</div>
                                                <div onClick={(e: any) => { subjectFuntions.updateLanguage(e.target.innerText); e.stopPropagation() }} className="option">Spanish</div>
                                                <div onClick={(e: any) => { subjectFuntions.updateLanguage(e.target.innerText); e.stopPropagation() }} className="option">Other</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section enrollment">
                                <div className="flx-r">
                                    <p className="heading">ENROLLMENT</p>
                                    <div className="enrollment-select">
                                        <div ref={enrollmentRef} onClick={() => setEnrollmentDropdownOpen(enrollmentDropdownOpen => !enrollmentDropdownOpen)} className="dropper">
                                            <span className="material-symbols-outlined" style={{ fontSize: "19.5px" }}>arrow_drop_down</span>
                                            <p className='smaller aligns-c gray-text'>{enrollmentStatus}</p>
                                        </div>
                                        <div ref={enrollmentDropdownRef} className={`dropdown ${!enrollmentDropdownOpen && "hidden"}`}>
                                            <div onClick={(e: any) => { subjectFuntions.updateEnrollmentStatus(e.target.innerText); setEnrollmentDropdownOpen(false) }} className="option">
                                                <p>Not Screened</p>
                                            </div>
                                            <div onClick={(e: any) => { subjectFuntions.updateEnrollmentStatus(e.target.innerText); setEnrollmentDropdownOpen(false) }} className="option">
                                                <p>Screened</p>
                                            </div>
                                            <div onClick={(e: any) => { subjectFuntions.updateEnrollmentStatus(e.target.innerText); setEnrollmentDropdownOpen(false) }} className="option">
                                                <p>Randomized</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row px-2">
                                    <div className="element screeningDate">
                                        <p className="subheading">Screening date {(newSubject.status === "Screened" || newSubject.status === "Randomized") && <span className="red-text">*</span>}</p>
                                        <div className="inputBox">
                                            {/* <input type="text" className="input-primary" placeholder='Enter Date' /> */}
                                            <ReactDatePicker selected={screenDate} onChange={(date: Date) => setScreenDate(timeFunctions.datinormal(date))} className='input-primary' placeholderText='Enter Date' />
                                            <div className="right-icon">
                                                {screenDate ?
                                                    <span onClick={() => setScreenDate("")} className="material-symbols-outlined large gray-text pointer">close</span>
                                                    :
                                                    <span className="material-symbols-outlined gray-text">calendar_today</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {newSubject.status === "Randomized" &&
                                        <div className="element enrollmentDate">
                                            <p className="subheading">Enrollment date <span className="red-text">*</span></p>
                                            <div className="inputBox">
                                                {/* <input type="text" className="input-primary" placeholder='Enter Date' /> */}
                                                <ReactDatePicker selected={enrollDate} onChange={(date: Date) => setEnrollDate(timeFunctions.datinormal(date))} className='input-primary' placeholderText='Enter Date' />
                                                <div className="right-icon">
                                                    {enrollDate ?
                                                        <span onClick={() => setEnrollDate("")} className="material-symbols-outlined large gray-text pointer">close</span>
                                                        :
                                                        <span className="material-symbols-outlined gray-text">calendar_today</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {newSubject.status !== "Not Screened" &&
                                    <div className="row-2 px-2 flx-wrap gap-4">
                                        <div className="element optionalStudy">
                                            <div className="flx-r gap-1">
                                                <p className="subheading">Optional Study</p>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="element optionalStudy">
                                            <div className="flx-r gap-1">
                                                <p className="subheading">Genetic Study</p>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="element optionalStudy">
                                            <div className="flx-r gap-1">
                                                <p className="subheading">Digital Study</p>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="section comments">
                                <p className="heading">COMMENTS</p>
                                <textarea onChange={(e: any) => subjectFuntions.updateComments(e.target.value)} className='input-primary mx-2' rows={2} placeholder='Enter any extra information here...'></textarea>
                            </div>
                        </div>

                        <div className="footer">
                            <button onClick={() => addSubject()} className="btn-primary small">Add Subject</button>
                            <button onClick={() => onClose()} className="btn-secondary small">Cancel</button>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    )
}
export default AddSubjectModal;