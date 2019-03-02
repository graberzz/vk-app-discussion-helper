import React from 'react'
import connect from '@vkontakte/vkui-connect'

import { Panel, PanelHeader, FormLayout, FormStatus, Textarea, Checkbox, Button } from '@vkontakte/vkui'

import * as api from '../api'

export class PanelRandom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      anonymously: false,
      sentSuccessfully: false,
      user: null,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    connect.subscribe((e) => {
			switch (e.detail.type) {
        case 'VKWebAppGetUserInfoResult':
          const user = e.detail.data
          const { message  } = this.state

          api.sendFeedback({ message, user }).then(() => {
            this.setState({
              sentSuccessfully: true,
              message: ''
            })
          })

					break
				default:
					console.log(e.detail.type)
			}
		})
  }

  onChange(e) {
    const { name, value } = e.currentTarget

    this.setState({
      [name]: value
    })
  }

  async onSubmit(e) {
    e.preventDefault()

    const { message, anonymously } = this.state

    if (!message) return

    connect.send("VKWebAppGetUserInfo", {});
  }

  render() {
      const { message, anonymously, sentSuccessfully } = this.state

      return (
        <Panel id="send">
          <PanelHeader>Внести вклад</PanelHeader>
          {sentSuccessfully && <FormStatus title="Мы вас услышали" state="default">
            И обязательно прислушаемся.
          </FormStatus>}
          <FormLayout onSubmit={this.onSubmit}>
            <Textarea name="message" value={message} status={message ? 'default' : 'error'} onChange={this.onChange} top="Сообщение" />
            <Checkbox name="anonymously" value={anonymously} onChange={this.onChange}>Анонимно</Checkbox>
            <Button size="xl">Отправить</Button>
          </FormLayout>
        </Panel>
      )
    }
}

export default PanelRandom