import { useEffect, useState } from 'react'
import {getTheme} from '../shared/utils/themes'
import Header from './Header'
import RouteManager from './Routes'
import { ThemeContext } from '../shared/utils/contexts'
import { AuthContext } from '../shared/utils/contexts'


function App() {
  const [theme, setTheme] = useState<string>("light")
  const [authState, setAuthState] = useState(false)

  useEffect(() => {
    let takeTheme = getTheme();
    if (takeTheme != null){
        setTheme(takeTheme)
    }
    setAuthState(false);
  }, [])

  const handleThemeChange = () => {
    if(theme == "light"){
      setTheme("dark")
    } else {
      setTheme("light")
    }
    return
  }
  return (
      <AuthContext value={authState}>
        <ThemeContext value={theme}>
          <Header handleThemeChange={handleThemeChange}/>
          <RouteManager />
        </ThemeContext>
      </AuthContext>
    )
}

export default App