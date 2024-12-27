import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PersonalInfo } from './components/personalInformation'
import { EducationalExperience } from './components/educationalExperience'
import { WorkExperience } from './components/workExperience'
import './styles/style.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PersonalInfo />
    <EducationalExperience />
    <WorkExperience />
    </>
  )
}

export default App
