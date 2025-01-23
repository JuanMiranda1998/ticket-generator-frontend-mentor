import { useState } from 'react'
import Confirmation from './components/Confirmation.jsx'
import './App.css'
import { verifyEmail } from './utils/validations.js';

function App() {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ avatar: '', fullName: '', email: '', githubUsername: ''});
  const [imageError, setImageError] = useState()
  const [nameError, setNameError] = useState()
  const [emailError, setEmailError] = useState()
  const [githubError, setGithubError] = useState()


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      fileInputClick(e);
    }
  }

  const handleInput = (e) => {
    setFormData( {...formData, [e.target.id]: e.target.value} )
    switch (e.target.id) {
      case 'fullName':
        if (e.target.value != ''){
          setNameError('');
        } else {
          setNameError('Please enter a name.');
        }
        break;
      case 'email':
        if (e.target.value != ''){
          setEmailError('');
        } else {
          setEmailError('Please enter an email.');
        }
        break;
      case 'githubUsername':
      if (e.target.value != ''){
        setGithubError('');
      } else {
        setGithubError('Please enter your github username.');
      }
      break;
      default:
        break;
    }
  }
  
  const handleForm = (data) => {
    let verifiedEmail;
    if ( !data.avatar) {
      setImageError('Please upload an avatar.');
    }
    if ( !data.fullName) {
      setNameError('Please enter a name.');
    }
    if ( !data.email) {
      setEmailError('Please enter an email.');
    } 
    else {
      verifiedEmail = verifyEmail(data.email);
      if (!verifiedEmail){
        setEmailError('Please enter a valid email address.');
      }  
    }
    if ( !data.githubUsername) {
      setGithubError('Please enter your github username.');
    }
    if ( data.avatar && data.fullName && data.email && data.githubUsername && verifiedEmail){
      setFormSent(true);
      return true;
    } 
    else {
      return false;
    }
  }

  const dropHandler = (ev) => {
    ev.preventDefault();
    if (ev.dataTransfer.items) {
      [...ev.dataTransfer.items].forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file.type === 'image/jpeg' || file.type === 'image/png' ){
            if (file.size > 500000) {
              setImageError('File too large. Please upload a photo under 500KB.');
            } 
            else {
              setFormData( {...formData, avatar: `/${file.name}`}) 
              displayPicture(ev)
              setImageError('');
            }
          } else {
            setImageError('Please enter a valid image (JPG or PNG under 500KB.)')
          }
          
        }
      });
    } 
  }

  const dragOverHandler = (ev) => {
    ev.preventDefault();
    ev.target.style.background = 'hsla(245, 19%, 35%, 80%)';
  }

  const fileInputClick = (e) => {
    const fileInput = document.querySelector('#avatarInput');
    if (e.target.id == 'avatar' || e.target.id == 'changeImageBtn' || e.target.id == 'uploadIcon' || e.target.id == 'avatarImage'){
      fileInput.click();
    }
  }

  const fileUploadHandler = (e) => {
    if (e.target.files && e.target.files[0]){
      const file = e.target.files[0]
      if (file.type === 'image/jpeg' || file.type === 'image/png' ){
        if (file.size > 500000){
          setImageError('File too large. Please upload a photo under 500KB.');
          
        } else {
          setFormData( {...formData, avatar: `/${e.target.files[0].name}`}) 
          displayPicture(e);
          setImageError('');
        }
      } else {
        setImageError('Please enter a valid image (JPG or PNG under 500KB.)')
      }
    }
  }

  
 function displayPicture(input) {
  var reader = new FileReader();
  if (input.target.files && input.target.files[0]) {
  reader.onload = function (e) {
    ;
    document.querySelector('#avatarImage').setAttribute('src', e.target.result);
    document.querySelector('#avatarImage').style = 'width:100px;height:100px;';
    document.querySelector('.uploadIconContainer').style.padding = '0';
    document.querySelector('#avatar').style.background = 'hsla(245, 19%, 35%, 30%)';
  };
  reader.readAsDataURL(input.target.files[0]);
  } else {
    if (input.dataTransfer.files) {
      reader.onload = function (e) {
        document.querySelector('#avatarImage').setAttribute('src', e.target.result);
        document.querySelector('#avatarImage').style = 'width:100px;height:100px;';
        document.querySelector('.uploadIconContainer').style.padding = '0';
        document.querySelector('#avatar').style.background = 'hsla(245, 19%, 35%, 30%)';
      };
      
      reader.readAsDataURL(input.dataTransfer.files[0]);
    }}
  }

const removeImage = () => {
  setFormData({...formData, avatar: ''})
  document.querySelector('#avatarImage').setAttribute('src', '/icon-upload.svg');
  document.querySelector('#avatarImage').style = 'width:40px;height:40px;';
  document.querySelector('.uploadIconContainer').style.padding = '0.75rem';
  document.getElementById('avatarInput').value = null;
}


  if (formSent) return (
    <div className='container'>
      <div className='logo'><img src="/logo-full.svg" /></div>
      <Confirmation data={formData} />
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="#">Juan Miranda</a>.
      </div>
    </div>
  )

  return (
    <div className='container'>
      <div className='logo'><img src="/logo-full.svg" /></div>
      <h1 className='title'>Your Journey to Coding Conf  2025 Starts Here!</h1>
      <p className='titleDesc'>Secure your spot at next year{"'"}s biggest coding conference.</p>

      <form className='formElement' onSubmit={(e) => {
        e.preventDefault();
        handleForm(formData);
      }}>
        <div className='fieldContainer'>
          <label htmlFor="avatar">Upload Avatar</label>
          <div
            name="avatar"
            id="avatar"
            className='avatarInputZone'
            tabIndex={0}
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => e.target.style.background = 'hsla(245, 19%, 35%, 30%)'}
            onClick={(e) => { fileInputClick(e) }}
            onKeyDown={(e) => { handleKeyDown(e)}}
            >
            <div className='line1'></div>
            <div className="line2"></div>
            <div className='line3'></div>
            <div className='uploadIconContainer' id='uploadIcon'>
              <img src='/icon-upload.svg' id='avatarImage' />
            </div>
            <input
              className='avatarInput'
              type="file"
              accept="image/png, image/jpeg"
              name="avatarFile"
              id="avatarInput"
              onChange={(e) => fileUploadHandler(e)} />
            {formData.avatar ?
              <div className='avatarButtonContainer'>
                <button type='button' className='avatarButton' onClick={() => { removeImage() }}>Remove image</button>
                <button type='button' id='changeImageBtn' className='avatarButton'>Change image</button>
              </div>
              :
              <p className='avatarInputText'>Drag and drop or click to upload</p>}
          </div>
          <div className='avatarDescription'>
            <img src="/icon-info.svg" />
            <p className={`avatarDescriptionText ${imageError ? 'errorMessage' : ''}`}>
              {imageError ? imageError : 'Upload your photo (JPG or PNG, max size: 500KB).'}
            </p>
          </div>
        </div>
        <div className='fieldContainer'>
          <label htmlFor="fullName">Full Name</label>
          <input className={`formInput ${ nameError ? 'inputError' : ''}`} onChange={handleInput} type="text" name="fullName" id="fullName" />
          { nameError ? <div className='errorMessage'>{nameError}</div> : null }
        </div>
        <div className='fieldContainer'>
          <label htmlFor="email">Email Address</label>
          <input className={`formInput ${ emailError ? 'inputError' : ''}`} onChange={handleInput} type="text" placeholder='example@email.com' name="email" id="email" />
          { emailError ? <div className='errorMessage'>{emailError}</div> : null }
        </div>
        <div className='fieldContainer'>
          <label htmlFor="githubUsername">GitHub Username</label>
          <input className={`formInput ${ githubError ? 'inputError' : ''}`} onChange={handleInput} type="text" placeholder='@yourusername' name="githubUsername" id="githubUsername" />
          { githubError ? <div className='errorMessage'>{githubError}</div> : null }
        </div>
        <button className='submitButton' type='submit'>Generate My Ticket</button>
      </form>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="#">Juan Miranda</a>.
      </div>
    </div>
    
  )
}

export default App