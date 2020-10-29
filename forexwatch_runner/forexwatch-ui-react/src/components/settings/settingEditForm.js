import React from 'react';

import {Card} from 'primereact/card';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

export class SettingEditForm extends React.Component {
    constructor() {
        super();
        this.state = {
            settingName : '',
            settingValue : '',

        }

        this.saveSetting = this.saveSetting.bind(this);
    }

    saveSetting() {
        const setting = {
            settingName : this.state.settingName,
            settingValue : this.state.settingValue,
            settingAccountId : this.props.accountId
        }
        this.props.saveSetting(setting)
    }

    render() {
        return (
            <div>
                <Card>
                <div className="content-section implementation">
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.settingName} onChange={(e) => this.setState({settingName: e.target.value})} />
                            <label htmlFor="float-input">Setting name</label>
                    </span>
                    <br/>
                    <span className="p-float-label">
                            <InputText id="float-input" type="text" size="30" value={this.state.settingValue} onChange={(e) => this.setState({settingValue: e.target.value})} />
                            <label htmlFor="float-input">Setting value</label>
                    </span>
                </div>
                <br/>
                <div className="content-section implementation">
                      <Button label="Save"  onClick={this.saveSetting}/>
                    </div>
                </Card>
            </div>
        )
    }
}

