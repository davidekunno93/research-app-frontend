import { useEffect, useRef, useState } from 'react'
import "./css/subjectspage.css"
import AddSubject from '../components/Modals/AddSubjectModal'
import ReactDatePicker from 'react-datepicker'
import { PredictSubject, Study, StudyVisit, SubjectVisit, SubjectsState, VisitStatus } from '../TypeFile'






type SubjectsPageProps = {
    study: Study
}

const SubjectsPage = ({ study }: SubjectsPageProps) => {
    // [imports]
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
            let year = new Date().getFullYear();
            let isLeapYear: boolean = year % 4 === 0;
            let totalDays: number = isLeapYear ? 366 : 365;
            if (days < 0) {
                return "Number of days must be positive"
            }
            while (days > totalDays) {
                days -= totalDays;
                year += 1;
                isLeapYear = year % 4 === 0;
                totalDays = isLeapYear ? 366 : 365;
            };
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
                    return monthOfTheYear + "/" + dayOfTheMonth + "/" + year.toString();
                }
            }
            return "Function should never reach this point"
        },
        dateToDay: function (date: string): number {
            // this func doesn't validate the date exists i.e. 01/32/2024 would take
            const year = new Date().getFullYear();
            const isLeapYear: boolean = year % 4 === 0;
            const dateMonth: string = date.slice(0, 2);
            const dateDays: number = parseInt(date.slice(3, 5));
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
    useEffect(() => {
        // console.log(timeFunctions.dayToDate(732))
    }, [])
    // [onload]
    // [elements]
    // filter dropdown code
    const [filterDropdownOpen, setFilterDropdownOpen] = useState<boolean>(false);
    const filterDropdownRef = useRef<HTMLInputElement>(null);
    const filterDropdownSelectorRef = useRef<HTMLInputElement>(null);
    const hideOnClickOutsideFilterDropdown = (e: any) => {
        if (filterDropdownSelectorRef.current && !filterDropdownSelectorRef.current.contains(e.target)) {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
                setFilterDropdownOpen(false);
            }
        }
    }
    useEffect(() => {
        window.addEventListener('click', hideOnClickOutsideFilterDropdown, true);
        return () => window.removeEventListener('click', hideOnClickOutsideFilterDropdown, true);
    })
    const [filterValue, setFilterValue] = useState<any>("None");
    const updateFilterValue = (filter: any) => {
        setFilterValue(filter);
        setFilterDropdownOpen(false);
    }


    // subjects
    const subjectTest: PredictSubject = {
        id: "016-0001",
        trailingId: "0001",
        demographics: {
            initials: "ML",
            birthYear: 1960,
            gender: "f",
            language: "es"
        },
        studyName: "PREDICT",
        status: "screening",
        comments: {
            1: {
                comment: "Comment 1...",
                timeStamp: "06-01-2024, 12:50",
                byUser: "David Ekunno",
            },
            2: {
                comment: "Comment 2...",
                timeStamp: "06-01-2024, 12:51",
                byUser: "David Ekunno",
            },
        },
        visits: {
            "visit-1": {
                id: "visit-1",
                title: "Visit 1",
                date: "05/07/2024",
                // targetDate: null,
                // windowStart: null,
                // windowEnd: null,
                icfSigned: true,
                oow: false,
                status: "completed",
                // visitType: "screening",
                comments: {
                    1: {
                        comment: "Visit Comment 1...",
                        timeStamp: "06-01-2024, 12:50",
                        byUser: "David Ekunno",
                    },
                    2: {
                        comment: "Visit Comment 2...",
                        timeStamp: "06-01-2024, 12:51",
                        byUser: "David Ekunno",
                    },
                }
            },
            "visit-2": {
                id: "visit-2",
                title: "Visit 2",
                date: "05/15/2024",
                targetDate: "07/02/2024",
                windowStart: "05/14/2024",
                windowEnd: "07/02/2024",
                icfSigned: false,
                oow: false,
                status: "scheduled",
                // visitType: "baseline",
                comments: {},
            },
            "visit-3": {
                id: "visit-3",
                title: "Visit 3",
                date: "",
                targetDate: "10/30/2024",
                windowStart: "10/02/2024",
                windowEnd: "11/13/2024",
                icfSigned: false,
                oow: false,
                status: "not scheduled",
                // visitType: "treatment",
                comments: {},
            },
        },
        unscheduledVisits: {}

    }
    const [subjects, setSubjects] = useState<SubjectsState>({
        "016-0001": subjectTest,
    });



    const visitFunctions = {
        closeVisitOptions: function (id: string) {
            const btn = document.getElementById(`visit-optionsBtn-${id}`);
            const dropper = document.getElementById(`visit-optionsDropper-${id}`);
            const btnIcon = btn?.firstChild as HTMLElement
            btn?.classList.remove('show');
            btnIcon?.classList.remove('pressed');
            dropper?.classList.replace('shown', 'hidden');
        },
        openVisitOptions: function (id: string) {
            const btn = document.getElementById(`visit-optionsBtn-${id}`);
            const dropper = document.getElementById(`visit-optionsDropper-${id}`);
            const btnIcon = btn?.firstChild as HTMLElement
            btn?.classList.add('show');
            btnIcon.classList.add('pressed');
            dropper?.classList.replace('hidden', 'shown');
        },
        toggleVisitOptions: function (id: string) {
            const btn = document.getElementById(`visit-optionsBtn-${id}`);
            if (btn?.classList.contains('show')) {
                visitFunctions.closeVisitOptions(id);
            } else {
                visitFunctions.openVisitOptions(id);
            }
        },
        openVisitDatePicker: function (id: string) {
            const datePicker = document.getElementById(`visit-datepicker-${id}`);
            datePicker?.classList.replace("hidden", "shown");
        },
        closeVisitDatePicker: function (id: string) {
            const datePicker = document.getElementById(`visit-datepicker-${id}`);
            datePicker?.classList.replace("shown", "hidden");
            visitFunctions.closeVisitDropdown(id);

            setVisitDatePickerStatus(null);
        },
        toggleVisitDatePicker: function (id: string) {
            const datePicker = document.getElementById(`visit-datepicker-${id}`);
            if (datePicker?.classList.contains("shown")) {
                visitFunctions.closeVisitDatePicker(id);
            } else if (datePicker?.classList.contains("hidden")) {
                visitFunctions.openVisitDatePicker(id);
            }
        },
        openVisitDropdown: function (id: string) {
            // const dropper = document.getElementById(`visit-dropper-${id}`);
            const dropdown = document.getElementById(`visit-dropdown-${id}`);
            dropdown?.classList.replace("hidden", "shown");
        },
        closeVisitDropdown: function (id: string) {
            // const dropper = document.getElementById(`visit-dropper-${id}`);
            const dropdown = document.getElementById(`visit-dropdown-${id}`);
            dropdown?.classList.replace("shown", "hidden");
        },
        toggleVisitDropdown: function (id: string) {
            const dropdown = document.getElementById(`visit-dropdown-${id}`);
            if (dropdown?.classList.contains("shown")) {
                visitFunctions.closeVisitDropdown(id);
            } else if (dropdown?.classList.contains("hidden")) {
                visitFunctions.openVisitDropdown(id);
            }
        },
    }

    const textFunctions = {
        capitalize: function (str: string): string {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        titalize: function (str: string): string {
            const words = str.split(" ")
            for (let i = 0; i < words.length; i++) {
                words[i] = textFunctions.capitalize(words[i]);
            }
            return words.join(" ");
        }
    }

    const [visitDatePickerStatus, setVisitDatePickerStatus] = useState<"scheduled" | "completed" | null>(null);
    const updateDatePickerStatus = (id: string, newStatus: "scheduled" | "completed" | null) => {
        visitFunctions.closeVisitDropdown(id)
        setVisitDatePickerStatus(newStatus);
    };
    // useEffect(() => {
    //     console.log(visitDatePickerStatus);
    // }, [visitDatePickerStatus])

    // status = not scheduled - no date, targetDate + window start/end, no icfSigned, no oow --> if og status then update to scheduled
    // status = scheduled - yes date, check targetDate + window start/end, leave icfSigned, check oow
    // status = completed - yes date, check targetDate + window start/end, leave icfSigned, check oow
    // status = missed - no date, leave targetDate + window start/end, no icfSigned, no oow --> if og status then update to completed
    const subjectFunctions = {
        toggleICFSigned: function (subjectId: string, visitObj: StudyVisit, icfSigned?: boolean) {
            const subjectsCopy = { ...subjects };
            const visitNum = visitObj.id;
            const visitStatus = subjectsCopy[subjectId].visits[visitNum].status;
            if (visitStatus === "completed") {
                if (icfSigned === true || icfSigned === false) {
                    subjectsCopy[subjectId].visits[visitNum].icfSigned = icfSigned;
                } else {
                    let isICFSigned = subjectsCopy[subjectId].visits[visitNum].icfSigned;
                    subjectsCopy[subjectId].visits[visitNum].icfSigned = !isICFSigned;
                }
                setSubjects(subjectsCopy);
            }
        },
        updateVisitDate: function (subjectId: string, visitObj: StudyVisit, newDate: Date) {
            const selectedDate = timeFunctions.datinormal(newDate);
            let visitType = visitObj.visitType;
            let visitNum = visitObj.id;
            const subjectsCopy = { ...subjects };
            const thisSubjectVisit = subjectsCopy[subjectId].visits[visitNum];
            let currentStatus = thisSubjectVisit.status;
            if (visitDatePickerStatus) {
                currentStatus = visitDatePickerStatus;
            }

            // if not scheduled
            if (currentStatus === "not scheduled" || currentStatus === "scheduled") {
                // update status to scheduled
                subjectsCopy[subjectId].visits[visitNum].status = "scheduled";
            } else if (currentStatus === "missed" || currentStatus === "completed") {
                // update status to completed
                subjectsCopy[subjectId].visits[visitNum].status = "completed";
            }

            // set new visit.date
            subjectsCopy[subjectId].visits[visitNum].date = timeFunctions.datinormal(newDate);

            // check targets
            // if screening
            if (visitType === "screening") {
                // update baseline targetDate
                // we need to access the visitNums via the visitTypes
                const baselineVisitNum = study.visitTypes["baseline"][0];
                const baselineVisit = study.schedule[baselineVisitNum]
                const subjectBaselineVisit = subjectsCopy[subjectId].visits[baselineVisit.id]
                if (baselineVisit.visitType === "baseline") {
                    subjectsCopy[subjectId].visits[baselineVisit.id].targetDate = timeFunctions.addDays(selectedDate, baselineVisit.daysFromLastCheckpoint);
                    subjectsCopy[subjectId].visits[baselineVisit.id].windowStart = timeFunctions.addDays(selectedDate, baselineVisit.windowDaysFrom.min);
                    subjectsCopy[subjectId].visits[baselineVisit.id].windowEnd = timeFunctions.addDays(selectedDate, baselineVisit.windowDaysFrom.max);
                    subjectsCopy[subjectId].visits[baselineVisit.id].oow = isOOW(subjectBaselineVisit);
                }

                // missing run-in code
            }
            // if run-in
            // [not coded]
            // if baseline 
            if (visitType === "baseline") {
                // update all treatment and end-of-treatment targetDates
                const treatmentVisitNums = study.visitTypes["treatment"];
                for (let i = 0; i < treatmentVisitNums.length; i++) {
                    let treatmentVisit = study.schedule[treatmentVisitNums[i]];
                    const subjectTreatmentVisit = subjectsCopy[subjectId].visits[treatmentVisit.id];
                    if (treatmentVisit.visitType === "treatment") {
                        subjectsCopy[subjectId].visits[treatmentVisit.id].targetDate = timeFunctions.addDays(selectedDate, treatmentVisit.daysFromLastCheckpoint);
                        subjectsCopy[subjectId].visits[treatmentVisit.id].windowStart = timeFunctions.addDays(selectedDate, treatmentVisit.windowDaysFrom.min);
                        subjectsCopy[subjectId].visits[treatmentVisit.id].windowEnd = timeFunctions.addDays(selectedDate, treatmentVisit.windowDaysFrom.max);
                        subjectsCopy[subjectId].visits[treatmentVisit.id].oow = isOOW(subjectTreatmentVisit);
                    }
                }

                if (study.visitTypes["end-of-treatment"].length > 0) {
                    const eotVisitNum = study.visitTypes["end-of-treatment"][0];
                    let eotVisit = study.schedule[eotVisitNum];
                    const subjectEOTvisit = subjectsCopy[subjectId].visits[eotVisit.id];
                    if (eotVisit.visitType === "end-of-treatment") {
                        subjectsCopy[subjectId].visits[eotVisit.id].targetDate = timeFunctions.addDays(selectedDate, eotVisit.daysFromLastCheckpoint);
                        subjectsCopy[subjectId].visits[eotVisit.id].windowStart = timeFunctions.addDays(selectedDate, eotVisit.windowDaysFrom.min);
                        subjectsCopy[subjectId].visits[eotVisit.id].windowEnd = timeFunctions.addDays(selectedDate, eotVisit.windowDaysFrom.max);
                        subjectsCopy[subjectId].visits[eotVisit.id].oow = isOOW(subjectEOTvisit);
                    }
                }

            }
            // if end-of-treatment
            if (visitType === "end-of-treatment") {
                // update all follow-up targetDates
                // get visitNums needed via study.visitTypes
                const followUpVisitNums = study.visitTypes["follow-up"]
                // loop thru visitNums
                if (followUpVisitNums) {
                    for (let i = 0; i < followUpVisitNums.length; i++) {
                        // in loop - get study visit via visitNum
                        let followUpVisit = study.schedule[followUpVisitNums[i]];
                        const subjectFollowUpVisit = subjectsCopy[subjectId].visits[followUpVisit.id];
                        if (followUpVisit.visitType === "follow-up") {
                            // set subject visitNum target to selected date + study VisitNum daysFromLastCheckpoint
                            subjectsCopy[subjectId].visits[followUpVisit.id].targetDate = timeFunctions.addDays(selectedDate, followUpVisit.daysFromLastCheckpoint);
                            // set subject windowStart & windowEnd to selectedDate + windowDayFrom min & max
                            subjectsCopy[subjectId].visits[followUpVisit.id].windowStart = timeFunctions.addDays(selectedDate, followUpVisit.windowDaysFrom.min);
                            subjectsCopy[subjectId].visits[followUpVisit.id].windowEnd = timeFunctions.addDays(selectedDate, followUpVisit.windowDaysFrom.max);
                            subjectsCopy[subjectId].visits[followUpVisit.id].oow = isOOW(subjectFollowUpVisit);
                        }  
                    }
                }
            }

            // check oow
            subjectsCopy[subjectId].visits[visitNum].oow = isOOW(thisSubjectVisit);
            // if date is before windowStart, or after windowEnd - set oow to true else false
            // if (thisSubjectVisit.windowStart && thisSubjectVisit.windowEnd) {
            //     if (newDate < new Date(thisSubjectVisit.windowStart) || newDate > new Date(thisSubjectVisit.windowEnd)) {
            //         subjectsCopy[subjectId].visits[visitNum].oow = true;
            //     } else {
            //         subjectsCopy[subjectId].visits[visitNum].oow = false;
            //     }
            // }
            // check all affected visits for oow
            // if screening - check baseline and run-in?
            // if baseline - check run-in? and treatments and end-of-treatment
            // if eot - check follow-ups
            // code added in condition blocks

            setSubjects(subjectsCopy);
        },
        updateVisitStatus: function (subjectId: string, visitObj: StudyVisit, newStatus: VisitStatus) {
            // get subject visit
            // update visit status
            const subjectsCopy = { ...subjects };
            let visitNum = visitObj.id;
            subjects[subjectId].visits[visitNum].status = newStatus;
            // if prev status = not scheduled
            // not scheduled - no change
            // scheduled - open datepicker
            // completed - open datepicker



            // if status = not scheduled
            // modal pop up to status guard

            // if status = scheduled

            // if status = completed
            // if status = missed


            setSubjects(subjectsCopy);
        },
        updateVisitToMissed: function (id: string, subjectId: string, visitObj: StudyVisit) {
            // confirmation modal

            // check visit Type
            // if screening/baseline - reject action
            if (visitObj.visitType === "screening" || visitObj.visitType === "baseline") {
                // alert - cannot Miss this type of visit
                alert("Screening and Baseline visits cannot be missed")
            } else {
                const visitNum = visitObj.id;
                const subjectsCopy = { ...subjects };
                subjectsCopy[subjectId].visits[visitNum].date = "";
                subjectsCopy[subjectId].visits[visitNum].status = "missed";


                visitFunctions.closeVisitDropdown(id);
                visitFunctions.closeVisitDatePicker(id);
                setSubjects(subjectsCopy);
            }
        },
        updateVisitToNotScheduled: function (id: string, subjectId: string, visitObj: StudyVisit) {
            // get subject visit
            const subjectsCopy = { ...subjects};
            const thisSubjectVisit = subjectsCopy[subjectId].visits[visitObj.id];
            // reomve .date
            subjectsCopy[subjectId].visits[visitObj.id].date = "";
            // update status to not scheduled
            subjectsCopy[subjectId].visits[visitObj.id].status = "not scheduled";

            // if pivotol visit, change affected visits to unscheduled if they are "completed" or "missed"
        }
    }


    const trailingIdPlusOne = (trailingId: string): string => {
        // separate any leading 0s to return at the end
        let leadingZeros: string = ""
        let trailingNum: string = "";
        for (let i = 0; trailingId.length; i++) {
            if (trailingId[i] !== "0") {
                trailingNum = trailingId.slice(i)
                break
            } else {
                leadingZeros += "0"
            }
        }

        // add one
        let newTrailingNum = (parseInt(trailingNum) + 1).toString();
        if (newTrailingNum.length === trailingNum.length) {
            return leadingZeros + newTrailingNum
        } else {
            let lengthOffset = newTrailingNum.length - trailingNum.length;
            return leadingZeros.slice(lengthOffset) + newTrailingNum;
        }
    }
    const getNextSubjectId = (subjectsObj: SubjectsState): { subjectId: string, trailingId: string } => {
        // missing code - wtd if no subjects in subjectsObj yet
        const subjectsKeys: string[] = Object.keys(subjectsObj)
        let max_trailingId: string = "1";
        let max_subjectId: string = "";
        for (let i = 0; i < subjectsKeys.length; i++) {
            const trailingId: string = subjectsObj[subjectsKeys[i]].trailingId;
            if (parseInt(trailingId) >= parseInt(max_trailingId)) {
                max_subjectId = subjectsKeys[i];
                max_trailingId = subjectsObj[subjectsKeys[i]].trailingId;
            }
        }
        const newTrailingId: string = trailingIdPlusOne(max_trailingId);
        return {
            subjectId: max_subjectId.slice(0, -newTrailingId.length) + newTrailingId,
            trailingId: newTrailingId,
        }
    }

    const isOOW = (subjectVisitObj: SubjectVisit): boolean => {
        // when update date of a visit
        // when update pivotal visit (screening/baseline/end-of-treatment) > check all affected visits
        // do this in return statement with conditional oow re-underline render? - nope
        if (subjectVisitObj.windowStart && subjectVisitObj.windowEnd) {
            const visitDate = new Date(subjectVisitObj.date);
            const windowStartDate = new Date(subjectVisitObj.windowStart);
            const windowEndDate = new Date(subjectVisitObj.windowEnd);
            if (visitDate < windowStartDate || visitDate > windowEndDate) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    useEffect(() => {

    }, [])

    const [addSubjectModalOpen, setAddSubjectModalOpen] = useState<boolean>(false);

    return (
        <>
            <AddSubject open={addSubjectModalOpen} nextSubjectId={getNextSubjectId(subjects)} onClose={() => setAddSubjectModalOpen(false)} />
            <div className="subjects-page">
                <div className="head">
                    <div className="row">
                        <div className="search-barDiv" style={{ width: 240 }}>
                            <input type="text" className="search-bar" placeholder='Search subject' />
                            <div className="left-icon gray-text">
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </div>
                        </div>
                        <div className="filter-dropdownDiv">
                            <div ref={filterDropdownRef} onClick={() => setFilterDropdownOpen(filterDropdownOpen => !filterDropdownOpen)} className="filter-dropdown">
                                <p>Filter</p>
                                <div className="material-symbols-outlined">arrow_drop_down</div>
                                <p className='gray-text smedium'>{filterValue}</p>
                            </div>
                            <div ref={filterDropdownSelectorRef} className={`dropdown-selector ${filterDropdownOpen ? "shown" : "hidden"}`}>
                                <div onClick={(e: any) => updateFilterValue(e.target.innerText)} className="option">None</div>
                                <div onClick={(e: any) => updateFilterValue(e.target.innerText)} className="option">Screening</div>
                                <div onClick={(e: any) => updateFilterValue(e.target.innerText)} className="option">Randomized</div>
                                <div onClick={(e: any) => updateFilterValue(e.target.innerText)} className="option">Completed</div>
                                <div onClick={(e: any) => updateFilterValue(e.target.innerText)} className="option">Discontinued</div>
                            </div>
                        </div>
                        <button onClick={() => setAddSubjectModalOpen(true)} className="add-patient btn-primary position-right">
                            <div className="material-symbols-outlined medium">person_add</div>
                            <p className='smedium'>Add Subject</p>
                        </button>
                    </div>
                    <div className="visit-icon-legend">
                        <div className="icon-key">
                            <span className="material-symbols-outlined yellow-text">calendar_add_on</span>
                            <p>= Not Scheduled</p>
                        </div>
                        <div className="icon-key">
                            <span className="material-symbols-outlined blue-text">event</span>
                            <p>= Scheduled</p>
                        </div>
                        <div className="icon-key">
                            <span className="material-symbols-outlined green-text">check_circle</span>
                            <p>= Completed</p>
                        </div>
                        <div className="icon-key">
                            <span className="material-symbols-outlined red-text">event_busy</span>
                            <p>= Missed</p>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="subject-table">

                        <div className="scroller">

                            <div className="scroller-content">

                                <div className="title-row">
                                    <div className="col-options material-symbols-outlined">more_vert</div>
                                    <p className="col subject-id">Subject ID</p>
                                    <p className="col initials">Intitials</p>
                                    <p className="col year-of-birth">Year of Birth</p>
                                    {Object.values(study.schedule).map((visit, index) => {
                                        return <div key={index} className="col">
                                            <p>{visit.title}</p>
                                            <p className='visit-description'>{visit.desc}</p>
                                        </div>
                                    })}
                                    {Object.values(study.unscheduled).map((visit, index) => {
                                        return <div key={index} className="col unscheduled">
                                            <p>{visit.title}</p>
                                            <p className='visit-description'>{visit.desc}</p>
                                        </div>
                                    })}
                                </div>

                                {Object.values(subjects).map((subject, index) => {
                                    return <div key={index} className="row">
                                        <div className="col-options material-symbols-outlined">more_vert</div>
                                        <p className="col">{subject.id}</p>
                                        <p className="col">{subject.demographics.initials}</p>
                                        <p className="col">{subject.demographics.birthYear}</p>
                                        {study.visitOrder.map((visitNum: string, index) => {
                                            // const id: string = subject.id + "-" + index.toString();
                                            const id: string = subject.id + "-" + visitNum;
                                            const subjectVisit = subject.visits[visitNum];
                                            const studyVisit = study.schedule[visitNum];

                                            return <div key={index} className="col">
                                                <div className="fill-div">
                                                    <div className="dateBox">
                                                        <p onClick={() => visitFunctions.toggleVisitDatePicker(id)} className={`smedium pointer ${subjectVisit.status === "not scheduled" && "lightgray-text"} ${subjectVisit.status === "scheduled" && "blue-text"} ${subjectVisit.status === "missed" && "red-text"} ${subjectVisit.oow && "red-underlined"}`}>{subjectVisit.status !== "missed" ? subjectVisit.date ? timeFunctions.datify(subjectVisit.date) : subjectVisit.targetDate ? timeFunctions.datify(subjectVisit.targetDate) : "Error" : "Missed"}</p>
                                                        <div className="visit-level-icon">
                                                            <span className={`material-symbols-outlined ${subjectVisit.status === "scheduled" && "blue-text"} ${subjectVisit.icfSigned && "gray-text"}`}>{subjectVisit.status === "completed" && subjectVisit.icfSigned && "description"}{subjectVisit.status === "scheduled" && "schedule"}</span>
                                                        </div>
                                                    </div>
                                                    <div className="icon-tray">
                                                        {studyVisit.visitType !== "screening" &&
                                                            <span onClick={() => subjectFunctions.updateVisitToNotScheduled(id, subject.id, studyVisit)} className={`material-symbols-outlined yellow-icon ${subjectVisit.status === "not scheduled" && "selected"}`}>calendar_add_on</span>
                                                        }
                                                        <span onClick={() => { visitFunctions.openVisitDatePicker(id); updateDatePickerStatus(id, "scheduled") }} className={`material-symbols-outlined blue-icon ${subjectVisit.status === "scheduled" && "selected"}`}>event</span>
                                                        <span onClick={() => { visitFunctions.openVisitDatePicker(id); updateDatePickerStatus(id, "completed") }} className={`material-symbols-outlined green-icon ${subjectVisit.status === "completed" && "selected"}`}>check_circle</span>
                                                        {studyVisit.visitType !== "screening" && studyVisit.visitType !== "baseline" &&
                                                            <span onClick={() => subjectFunctions.updateVisitToMissed(id, subject.id, studyVisit)} className={`material-symbols-outlined red-icon ${subjectVisit.status === "missed" && "selected"}`}>event_busy</span>
                                                        }
                                                    </div>
                                                </div>

                                                <div onClick={() => visitFunctions.toggleVisitOptions(id)} id={`visit-optionsBtn-${id}`} className="options-btn">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                    <div id={`visit-optionsDropper-${id}`} className="dropdown hidden" style={{ width: subjectVisit.icfSigned ? 180 : 150 }}>
                                                        <div className="option">
                                                            <span className="material-symbols-outlined large">visibility</span>
                                                            <p>View visit</p>
                                                        </div>
                                                        <div onClick={() => subjectFunctions.toggleICFSigned(subject.id, studyVisit)} className={`option ${subjectVisit.status !== "completed" && "disabled"}`}>
                                                            <span className="material-symbols-outlined large">description</span>
                                                            <p>{subjectVisit.icfSigned ? "Remove" : "Add"} ICF signed</p>
                                                        </div>
                                                        <div onClick={() => {visitFunctions.openVisitDatePicker(id)}} className="option">
                                                            <span className="material-symbols-outlined large">workspaces</span>
                                                            <p>Change status</p>
                                                        </div>
                                                        <div className="option">
                                                            <span className="material-symbols-outlined large">chat</span>
                                                            <p>Add comment</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id={`visit-datepicker-${id}`} className="visit-datepicker hidden">
                                                    <div className="header">
                                                        <div onClick={() => visitFunctions.toggleVisitDropdown(id)} id={`visit-dropper-${id}`} className="visit-status-dropper">
                                                            <span className="material-symbols-outlined">{subjectVisit.status === "not scheduled" && "calendar_add_on"}{subjectVisit.status === "scheduled" && "event"}{subjectVisit.status === "completed" && "check_circle"}{subjectVisit.status === "missed" && "event_busy"}</span>
                                                            {/* <p>{visitDatePickerStatus}</p> */}
                                                            <p>{visitDatePickerStatus ? textFunctions.titalize(visitDatePickerStatus) : subjectVisit.status === "not scheduled" ? "Scheduled" : subjectVisit.status === "missed" ? "Completed" : textFunctions.titalize(subjectVisit.status)}</p>
                                                            <span className="material-symbols-outlined position-right">arrow_drop_down</span>
                                                        </div>
                                                        <div onClick={() => visitFunctions.closeVisitDatePicker(id)} className="circle-closeBtn">
                                                            <span className="material-symbols-outlined">close</span>
                                                        </div>
                                                        <div id={`visit-dropdown-${id}`} className="visit-status-dropdown hidden">
                                                            <div className="option underlined">
                                                                <span className="material-symbols-outlined">calendar_add_on</span>
                                                                <p>Not Scheduled</p>
                                                            </div>
                                                            <div onClick={() => updateDatePickerStatus(id, "scheduled")} className="option">
                                                                <span className="material-symbols-outlined">event</span>
                                                                <p>Scheduled</p>
                                                            </div>
                                                            <div onClick={() => updateDatePickerStatus(id, "completed")} className="option">
                                                                <span className="material-symbols-outlined">check_circle</span>
                                                                <p>Completed</p>
                                                            </div>
                                                            <div onClick={() => subjectFunctions.updateVisitToMissed(id, subject.id, studyVisit)} className="option red-text">
                                                                <span className="material-symbols-outlined">event_busy</span>
                                                                <p>Missed</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ReactDatePicker
                                                        selected={new Date(subjectVisit.date ? subjectVisit.date : subjectVisit.targetDate ?? new Date())}
                                                        onChange={(date: Date) => subjectFunctions.updateVisitDate(subject.id, studyVisit, date)}
                                                        inline />
                                                </div>

                                            </div>
                                        })}
                                        {Object.values(study.unscheduled).map((visit, index) => {
                                            return <div key={index} className="col">
                                                <span className="material-symbols-outlined pointer visit-addBtn">add_circle</span>
                                            </div>
                                        })}
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SubjectsPage;