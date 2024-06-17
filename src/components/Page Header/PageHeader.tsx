import "./pageheader.css"

type studyInfo = {
  studyName: string
  protocol: string
  sponsor: string
  site: string
}
export type PageHeaderProps = {
  studyInfo: studyInfo
}

const PageHeader = ({ studyInfo }: PageHeaderProps) => {
  
  return (
    <div className="page-header">
      <div className="flx-r gap-4 gray-text">
        <p><span className="bold600">Protocol: </span>{studyInfo.protocol ?? "Protocol #"}</p>
        <p><span className="bold600">Sponsor: </span>{studyInfo.sponsor ?? "Study sponsor"}</p>
        <p className='gray-text'><span className="bold600">Site: </span>{studyInfo.site ?? "Site #"}</p>
      </div>
      <p className='bold600 xx-large'>{studyInfo.studyName ?? "Name of Study"} Study</p>

    </div>
  )
}
export default PageHeader;