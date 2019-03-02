import React from 'react'
import { Div, Button } from '@vkontakte/vkui'
import './WelcomeScreen.css'

const WelcomeScreen = ({ onClose }) => (
    <div className="WelcomeScreen">
        <div className="WelcomeScreen__content">
            <Div className="WelcomeScreen__text">Иногда, нам нехватает слов, чтобы сказать, что чувствуем. Иногда, нам не хватает сил признаться в том, что любим. Иногда, мы не можем понизить свою гордость и сказать: Подожди, ты мне нужен, останься! А иногда мы даже не понимаем как нам дорог человек...
            <br/><br/>
            Надеемся это приложение вам поможет...
            </Div>
            <Button size="xl" onClick={onClose}>Ясно!</Button>
        </div>
    </div>
)

export default WelcomeScreen