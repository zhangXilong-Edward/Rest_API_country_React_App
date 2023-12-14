import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    const [darkMode, setDarkMode] = React.useState(false);

    return (
        <div className={darkMode?'dark container': 'container'}>
            <div className={(darkMode ? 'dark header' : 'header')}>
                <h1>Where in the world?</h1>
                <div className='dark-toggle' onClick={() => { setDarkMode(darkMode => !darkMode) }}>
                    {darkMode ? (<p><i className="fa">&#xf185;</i>&nbsp;Light</p>) : <p><i className="fa">&#xf186;</i>&nbsp;Dark</p>}
                </div>
            </div>

            <Outlet context={[darkMode, setDarkMode]} />
        </div>
    )
}
