import React from 'react'
import {SettingShowComponent} from './settingShowComponent'

export const SettingsView = (props) => {
    const { settings } = props
    console.log('Settings : ', settings)
    if(settings && Array.isArray(settings)) {
        return settings.map( (setting) => <SettingShowComponent key={setting.id} setting={setting}/> )
    } else {
        return <div></div>
    }
    

} 