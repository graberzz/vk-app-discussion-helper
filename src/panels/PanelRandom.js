import React from 'react'
import connect from '@vkontakte/vkui-connect';

import { Panel, PanelHeader, Button, Spinner, Group, FixedLayout, Div } from '@vkontakte/vkui'
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import Icon24Share from '@vkontakte/icons/dist/24/share';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';

import QuoteBlock from '../components/QuoteBlock'
import * as api from '../api'
import './PanelRandom.css'

export class PanelRandom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      fetching: false,
    }

    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.shareQuote = this.shareQuote.bind(this)
    this.addToFavorite = this.addToFavorite.bind(this)
  }
  
  componentDidMount() {
    this.getRandomQuote()
  }  

  getRandomQuote() {
		this.setState({
			fetching: true
		}, async () => {
			const quote = await api.getRandomQuote()

			this.setState({
				fetching: false,
				quote,
			})
		})
		
  }
  
  addToFavorite() {
    api.addToFavorite(this.state.quote)
  }

	shareQuote() {
		connect.send("VKWebAppShare", {"link": this.state.quote });
  }
  
  getQuoteFontSize() {
    const { length } = this.state.quote
    
    if (length < 50) {
      return 36
    }

    if (length < 100) {
      return 24
    }

    if (length < 200) {
      return 20
    }
 
    return 16
  }
  
  render() {
      const { quote, fetching } = this.state

      return (
        <Panel id="random">
          <PanelHeader><span style={{ fontSize: 14 }}>Случайное боевое сообщение</span></PanelHeader>
          { 
            fetching ?
            <Spinner className="PanelRandom__spinner" size="large" /> :
            <QuoteBlock quote={quote} style={{ paddingBottom: 103, fontSize: this.getQuoteFontSize() }}/>
          }
          <Group>
          <FixedLayout style={{ backgroundColor: '#fff' }}vertical="bottom">
              <Button size="xl" before={<Icon24Replay />} onClick={this.getRandomQuote}>Еще</Button>
              <Div style={{ display: 'flex' }}>
                <Button stretched size="l" style={{ marginRight: 10 }} before={<Icon24Favorite />} onClick={this.addToFavorite}>В избранное</Button>
                <Button stretched size="l" before={<Icon24Share />} onClick={this.shareQuote}>Поделиться</Button>
            </Div>
          </FixedLayout>
          </Group>
        </Panel>
      )
    }
}

export default PanelRandom