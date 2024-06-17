
export type StudyVisit = {
    id: string
    title: string
    desc: string
    target: string
} & ({
    visitType: "screening"
} | {
    visitType: "baseline" | "treatment" | "follow-up" | "end-of-treatment" | "end-of-study"
    daysFromLastCheckpoint: number
    windowDaysFrom: {
        min: number
        max: number
    }
    window: string
} | {
    visitType: "run-in"
    daysFromLastCheckpoint: number
    windowDaysFrom: {
        min: number
        max: number
    }
    window: string
    daysTilNextCheckpoint: number
    windowDaysTil: {
        min: number
        max: number
    }
})
export type StudyUnscheduledVisit = {
    id: string
    title: string
    desc: string
    // unscheduled, other?
    visitType: "unscheduled" | "re-draw" | "early-termination"
}

export type Contact = {
    contactName: string
    title: string
    email: string
    phoneNumber: string
}
export type Study = {
    studyInfo: {
        studyName: string
        protocol: string
        sponsor: string
        site: string
        phase: string
        investigational: boolean,
        indication: string
        informationLink: string
        inclusions: {},
        exclusions: {},
        studyEnrollmentTarget: number,
        siteEnrollmentTarget: number,
    },
    accessPoints: {
        IRT: {
            siteName: string
            siteLink: string
        },
        EDC: {
            siteName: string
            siteLink: string
        },
        lab: {
            siteName: string
            siteLink: string
        },
        IRB: {
            siteName: string
            siteLink: string
        },
    },
    contacts:  Contact[] // list objects {contactName, email, phoneNumber}
    subjectStats: {
        inScreening: number,
        enrolled: number,
        completed: number,
        discontinued: number,
        total: number,
    },
    startupInformation: {
        ipArrival: string
        sivDate: string
        firstConsented: string
    },
    regulatory: {
        protocols: {},
        ICFs: {}
    },
    schedule: {
        [key: string]: StudyVisit
    },
    visitOrder: string[]
    visitTypes: {
        // [key in VisitTypes]: string[]
        "screening": string[]
        "run-in": string[]
        "baseline": string[]
        "treatment": string[]
        "end-of-treatment": string[]
        "follow-up": string[]
        "end-of-study": string[]
    }
    unscheduled: {
        [key: number]: StudyUnscheduledVisit
    }
}
// type VisitType = "screening" | "run-in" | "baseline" | "treatment" | "end-of-treatment" | "follow-up" | "end-of-study";
export type VisitStatus = "not scheduled" | "scheduled" | "completed" | "missed";
export type Demographics = {
    initials: string
    birthYear: number
    gender: string
    language: string
}
export type SubjectVisit = {
    id: string
    title: string
    date: string
    targetDate?: string
    windowStart?: string
    windowEnd?: string
    icfSigned: boolean
    oow: boolean
    status: "not scheduled" | "scheduled" | "completed" | "missed"
    comments: {
        [key: number]: Comment
    }
}
export type SubjectUnscheduledVisit = {
    title: string
    date: string
    targetDate: string
    status: "not scheduled" | "scheduled" | "completed" | "missed"
    comments: {
        [key: number]: Comment
    }
}
export type Comment = {
    comment: string
    timeStamp: string
    byUser: string
}
export type Subject = {
    id: string
    trailingId: string
    demographics: Demographics
    studyName: string
    status: "screening" | "randomized" | "completed" | "discontinued"
    // screening if no baseline or further visits completed
    // randomized if baseline completed and no early-termination or end-of-treatment completed or missed
    // completed if eot and follow-ups completed or missedd
    comments: {
        [key: number]: Comment
    }
}
export interface PredictSubject extends Subject {
    visits: {
        // unselected date - target date calculated by FE in gray, 
        // selected date - scheduled
        // selected date - completed
        // "visit-1": SubjectVisit
        // "visit-2": SubjectVisit
        // "visit-3": SubjectVisit
        [key: string]: SubjectVisit
    },
    unscheduledVisits: {
        [key: string]: SubjectUnscheduledVisit
    }
}
export type SubjectsState = {
    [key: string]: PredictSubject
}
