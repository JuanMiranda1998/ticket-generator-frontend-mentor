import './Confirmation.css'

const Confirmation = (data) => {

  console.log(data.data)


  return (
    <div className='confirmationContainer'>
      <h1 className='confirmationTitle'>Congrats, <span className='gradientName'>{data.data.fullName}</span>! Your ticket is ready.</h1>

      <p className='confirmationMessage'>We{"'"}ve emailed your ticket to <span className='confirmationEmail'>{data.data.email}</span> and will send updates in the run up to the event.</p>

      <div className='ticketContainer'>
        <div className='ticketDetails'>
          <div className='ticketDetailsHeading'>
            <img src="/logo-mark.svg" alt="" />
            <h2>Coding Conf</h2>
          </div>
          <p className='ticketDate'>Jan 31, 2025 / Austin, TX</p>
        </div>
        <div>
          <div>
            <img src={data.data.avatar} alt="" />
          </div>
          <h2>{data.data.fullName}</h2>
          <div>
            <img src="/icon-gihub.svg" alt="" />
            <p>{data.data.githubUsername}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation