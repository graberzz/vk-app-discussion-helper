import React from 'react'

import { Panel, PanelHeader, FormLayout, FormStatus, Textarea, Button, FixedLayout, Gallery, Header, Spinner } from '@vkontakte/vkui'

import Feedback from '../components/Feedback'
import * as api from '../api'

export class PanelRandom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      sending: false,
      anonymously: false,
      sentSuccessfully: false,
      user: null,
      feedbacks: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
      this.getFeedback()
  }

  async getFeedback() {
    this.setState({
      fetchingFeedback: true
    }, async () => {
      const feedbacks = await api.getFeedbacks()  
      this.setState({ feedbacks, fetchingFeedback: false })
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

    const { message } = this.state

    if (!message) return

    const { user } = this.props

    this.setState({ sending: true }, () => {
      api.sendFeedback({ message, user }).then(() => {
        this.setState({
          sentSuccessfully: true,
          message: '',
          sending: false,
        }, () => {
          this.getFeedback()
        })
      })
    })
  }

  render() {
      const { message, sentSuccessfully, feedbacks, sending, fetchingFeedback } = this.state

      return (
        <Panel id="feedback">
          <PanelHeader>Оставить отзыв</PanelHeader>
          {sentSuccessfully && <FormStatus title="Мы вас услышали" state="default">
            И обязательно прислушаемся.
          </FormStatus>}
          <FormLayout onSubmit={this.onSubmit}>
            <Textarea name="message" value={message} status={message ? 'default' : 'error'} onChange={this.onChange} top="А чем вы хотите рассказать?" placeholder="Заполните это поле" />
            <Button size="xl" disabled={sending}>Отправить</Button>
          </FormLayout>
          <FixedLayout vertical="bottom">
          <Header level="2">О нас говорят</Header>
          { fetchingFeedback ? <Spinner size="large" style={{ height: 150 }} /> :
            <Gallery
            slideWidth="90%"
            style={{ height: 150 }}
          > 
            { feedbacks.map((feedback, i) => ( 
                  <Feedback key={i} avatar={feedback.user.photo_200} name={feedback.user.first_name} message={feedback.message} />
                )
              )
            }
          </Gallery>
          }
          
          
          </FixedLayout>
        </Panel>
      )
    }
}

export default PanelRandom