import './Confirmation.css'

const Confirmation = (data) => {

  console.log(data.data)


  return (
    <div>
      Congrats, {data.data.fullName}! Your ticket is ready.

      We{"'"}ve emailed your ticket to {data.data.email} and will send updates in the run up to the event.

      Coding Conf
      Jan 31, 2025 / Austin, TX
    </div>
  )
}

export default Confirmation