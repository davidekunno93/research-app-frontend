import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import SidePanel from './components/SidePanel/SidePanel'
import PageHeader from './components/Page Header/PageHeader'
import SubjectsPage from './views/SubjectsPage'
import { Study } from './TypeFile'


function App() {

  // const GoutStudyInfo = {
  //   studyName: "Gout",
  //   protocol: "SAP-001-202",
  //   sponsor: "Shanton Pharma Co., Ltd.",
  //   site: "105",
  // }
  // const PredictStudyInfo = {
  //   studyName: "PREDICT",
  //   protocol: "PREDICT-001",
  //   sponsor: "Scipher Medicine",
  //   site: "016"
  // }

  const predictStudy : Study = {
    studyInfo: {
      studyName: "PREDICT",
      protocol: "PREDICT-001",
      sponsor: "Scipher Medicine",
      site: "016",
      phase: "",
      investigational: false,
      indication: "Rheumatoid Arthritis",
      informationLink: "https://docs.google.com/document/d/1RzFB5DT0tEej94uIAD31F39dE14nZuW6C5msMpuPiHw/edit",
      inclusions: {},
      exclusions: {},
      studyEnrollmentTarget: 0,
      siteEnrollmentTarget: 0,
    },
    accessPoints: {
      IRT: {
        siteName: "",
        siteLink: "",
      },
      EDC: {
        siteName: "",
        siteLink: "",
      },
      lab: {
        siteName: "",
        siteLink: "",
      },
      IRB: {
        siteName: "",
        siteLink: "",
      },
    },
    contacts: [
      {
        title: "CRA",
        contactName: "Vanessa Delgado",
        email: "vanessa@scipher.com",
        phoneNumber: "281"
      }
    ], // list objects {contactName, email, phoneNumber}
    subjectStats: {
      inScreening: 0,
      enrolled: 0,
      completed: 0,
      discontinued: 0,
      total: 0,
    },
    startupInformation: {
      ipArrival: "03 May 2024",
      sivDate: "19 April 2024",
      firstConsented: "07 May 2024",
    },
    regulatory: {
      protocols: {},
      ICFs: {}
    },
    schedule: {
      "visit-1": {
        id: "visit-1",
        title: "Visit 1",
        desc: "Screening/Baseline",
        target: "-8 to -1 weeks",
        visitType: "screening",
      },
      "visit-2": {
        id: "visit-2",
        title: "Visit 2",
        desc: "Treatment Initiation",
        target: "Day 0",
        visitType: "baseline",
        daysFromLastCheckpoint: 42,
        windowDaysFrom: {
          min: 7,
          max: 42
        },
        window: "+1 to 8 weeks after screening",
      },
      "visit-3": {
        id: "visit-3",
        title: "Visit 3",
        desc: "Follow-up",
        target: "+6 months",
        visitType: "treatment",
        daysFromLastCheckpoint: 168,
        windowDaysFrom: {
          min: 140,
          max: 182
        },
        window: "+2/-4 weeks",
      },
    },
    visitOrder: ["visit-1", "visit-2", "visit-3"],
    visitTypes: {
      "screening": ["visit-1"], 
      "run-in" : [],
      "baseline": ["visit-2"], 
      "treatment": ["visit-3"],
      "end-of-treatment" : [],
      "follow-up" : [],
      "end-of-study" : [],
    },
    unscheduled: {
      "unsched-1": {
        id: "unsched-1",
        title: "UNSCHED",
        desc: "Change in Treatment",
        visitType: "unscheduled",
      },
      "unsched-2": {
        id: "unsched-2",
        title: "UNSCHED",
        desc: "Blood Re-draw",
        visitType: "re-draw",
      },
    }
  }
  // const BiogenStudyInfo = {
  //   studyName: "Biogen",
  //   protocol: "230LE303",
  //   sponsor: "Biogen",
  //   site: "1019"
  // }
  // const BMSStudyInfo = {
  //   studyName: "BMS",
  //   protocol: "IM011246",
  //   sponsor: "Bristol Myers Squibb",
  //   site: "0005"
  // }
  // const M23StudyInfo = {
  //   studyName: "M23",
  //   protocol: "M23-700",
  //   sponsor: "AbbVie",
  //   site: "802"
  // }
  // const SolsticeStudyInfo = {
  //   studyName: "SOLSTICE",
  //   protocol: "CNTO1959PSA3005",
  //   sponsor: "Janssen",
  //   site: "US10075"
  // }

  return (
    <>
      <Navbar />
      <div className="page-container flx-r">
        <div className="">
          <SidePanel />
        </div>
        <div className="flx-1 flx-c">
          <PageHeader studyInfo={predictStudy.studyInfo} />
          <Routes>
            <Route children path='/' element={<SubjectsPage study={predictStudy} />} />
          </Routes>
        </div>
      </div>

    </>
  )
}

export default App
