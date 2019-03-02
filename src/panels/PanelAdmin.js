import React from 'react'

import { Panel, PanelHeader, FormLayout, FormStatus, Textarea, Button, Header } from '@vkontakte/vkui'

import * as api from '../api'

export class PanelRandom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      sending: false,
      success: false,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    const { name, value } = e.currentTarget

    this.setState({
      [name]: value
    })
  }

  async onSubmit(e) {
    e.preventDefault()

    const { quote } = this.state

    if (!quote) return

    await api.addQuote({ quote })

    this.setState({
        quote: '',
        success: true,
    })
  }

  render() {
      const { quote, sending, success } = this.state

      return (
        <Panel id="admin">
          <PanelHeader>Админ-панель</PanelHeader>
          <Header level="2">Добавить боевое сообщение</Header>
          <FormLayout onSubmit={this.onSubmit}>
      { success && <FormStatus>Сообщение успешно добавлено</FormStatus> }
            <Textarea name="quote" value={quote} status={quote ? 'default' : 'error'} onChange={this.onChange} top="Новое сообщение" disabled={sending} />
            <Button size="xl" disabled={sending}>Отправить</Button>
          </FormLayout>
        </Panel>
      )
    }
}

export default PanelRandom