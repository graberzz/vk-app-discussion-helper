import React from 'react'
import { Div } from '@vkontakte/vkui'

import './QuoteBlock.css'

const QuoteBlock = ({ quote, style = {} }) => (
    <Div style={style}>{ quote }</Div>
)

export default QuoteBlock