import React from 'react'
import {Message} from 'primereact/message';

export const MessageComponent = (props) => {
    
    const {notification} = props
    console.log('Notification message : ', notification)
    if(notification && notification.severity && notification.text) {
        
        return <div>
        <Message severity={notification.severity} text={notification.text} life={notification.life}/>
        </div>
    } else {
        return <div></div>
    }
    

}