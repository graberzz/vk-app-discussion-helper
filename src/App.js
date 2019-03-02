import React from 'react';
import connect from '@vkontakte/vkui-connect'

import { View, Tabbar, TabbarItem, Epic } from '@vkontakte/vkui';
import Icon28Write from '@vkontakte/icons/dist/28/write';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline'

import WelcomeScreen from './WelcomeScreen'

import PanelRandom from './panels/PanelRandom'
import PanelFeedback from './panels/PanelFeedback'
import PanelAdmin from './panels/PanelAdmin'

import IconRandom from './icons/IconRandom'
import PanelFavorite from './panels/PanelFavorite'
import '@vkontakte/vkui/dist/vkui.css';


const ADMINS = [38265770, 496030723]

export class App extends React.Component {
	constructor (props) {
	  super(props);
  
	  this.state = {
      activeStory: 'random',
      user: {},
      firstTime: localStorage.getItem('firstTime') === null,
	  }

    this.onStoryChange = this.onStoryChange.bind(this)
    this.onWelcomeScreenClose = this.onWelcomeScreenClose.bind(this)
  }
  
  componentDidMount() {
    connect.send("VKWebAppGetUserInfo", {})

    connect.subscribe((e) => {
        switch (e.detail.type) {
          case 'VKWebAppGetUserInfoResult':
            this.setState({ user: e.detail.data })
            break

          default:
            break
        }
      }
    )
  }
  
	onStoryChange (e) {
	  this.setState({ activeStory: e.currentTarget.dataset.story })
  }
  
  onWelcomeScreenClose() {
    this.setState({
      firstTime: false
    })

    localStorage.setItem('firstTime', 'no')
  }
  
	render () {  
    const { user, activeStory, firstTime } = this.state
 
    if (firstTime) {
      return <WelcomeScreen onClose={this.onWelcomeScreenClose} />
    }

	  return (
    <Epic activeStory={activeStory} tabbar={
		  <Tabbar>
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === 'random'}
          data-story="random"
        ><IconRandom /></TabbarItem>
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === 'favorite'}
          data-story="favorite"
        ><Icon28Favorite /></TabbarItem>
        <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === 'feedback'}
          data-story="feedback"
        ><Icon28Write /></TabbarItem>
        { ADMINS.includes(user.id) &&
          <TabbarItem
          onClick={this.onStoryChange}
          selected={activeStory === 'admin'}
          data-story="admin"
        ><Icon28ErrorOutline /></TabbarItem>
        }
		  </Tabbar>
		}>
		<View id="random" activePanel="random">
			<PanelRandom id="random" />
		</View>
		  <View id="feedback" activePanel="feedback">
			<PanelFeedback id="feedback" user={user} />
		  </View>
		  <View id="favorite" activePanel="favorite">
			<PanelFavorite id="favorite" />
		  </View>
      <View id="admin" activePanel="admin">
			  <PanelAdmin id="admin" />
		  </View>
		</Epic>
	  )
	}
  }

  export default App