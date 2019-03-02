import React from 'react'
import { Avatar } from '@vkontakte/vkui'

import './Feedback.css'

const Feedback = ({ name, avatar, message }) => (
    <div className="Feedback">
        <div className="Feedback__head">
            <Avatar className="Feedback__avatar" src={avatar} />
            <span className="Feedback__author">{ name }</span>
        </div>
        <p className="Feedback__text">{ message }</p>
    </div>
)

export default Feedback

