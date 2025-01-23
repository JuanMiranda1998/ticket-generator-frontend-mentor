import './Confirmation.css'

const Confirmation = (data) => {

  console.log(data.data)


  return (
    <div className='confirmationContainer'>
      <h1 className='confirmationTitle'>Congrats, <span className='gradientName'>{data.data.fullName}</span>!<br/> Your ticket is ready.</h1>

      <p className='confirmationMessage'>We{"'"}ve emailed your ticket to <span className='confirmationEmail'>{data.data.email}</span> and will send updates in the run up to the event.</p>

      <div className='ticketContainer'>
          <div className='ticketNum'>#01609</div>
          <div className='ticketDetailsHeading'>
            <img src="/logo-mark.svg" alt="" />
            <div className='ticketDetails'>
              <h2 className='ticketTitle'>Coding Conf</h2>
              <p className='ticketDate'>Jan 31, 2025 / Austin, TX</p>
            </div>
          </div>
        <div className='ticketUserData'>
          <div className='userAvatar'>
            <img src={data.data.avatar} alt="" />
          </div>
          <div className='ticketUserHeading'>
            <h2 className='userFullName'>{data.data.fullName}</h2>
            <div className='githubDataContainer'>
              <img className='githubIcon' src="/icon-github.svg" alt="" />
              <p className='userGithubAccount'>{data.data.githubUsername}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation