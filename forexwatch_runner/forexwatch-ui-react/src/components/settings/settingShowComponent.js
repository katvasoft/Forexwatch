import React from 'react'
import {Card} from 'primereact/card';

export const SettingShowComponent = (props) => {

    const {setting} = props

    return <div>
        <Card title={setting.settingName}>
            <p>{setting.settingValue}</p>
        </Card>
    </div>

}