import React from 'react';
import { View, Panel, PanelHeader, Tabbar, TabbarItem, Epic, Div, Button, Spinner } from '@vkontakte/vkui';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';


import PanelRandom from './panels/PanelRandom'
import PanelSend from './panels/PanelSend'

import IconRandom from './icons/IconRandom'
import Favorite from './panels/Favorite'
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

export class App extends React.Component {
	constructor (props) {
	  super(props);
  
	  this.state = {
		activeStory: 'random',
	  };

	  this.onStoryChange = this.onStoryChange.bind(this);
	}
  
	onStoryChange (e) {
	  this.setState({ activeStory: e.currentTarget.dataset.story })
	}
  
	render () {  
	  return (
		<Epic activeStory={this.state.activeStory} tabbar={
		  <Tabbar>
			<TabbarItem
			  onClick={this.onStoryChange}
			  selected={this.state.activeStory === 'random'}
			  data-story="random"
			><IconRandom /></TabbarItem>
			<TabbarItem
			  onClick={this.onStoryChange}
			  selected={this.state.activeStory === 'favorite'}
			  data-story="favorite"
			><Icon28Favorite /></TabbarItem>
			<TabbarItem
			  onClick={this.onStoryChange}
			  selected={this.state.activeStory === 'send'}
			  data-story="send"
			><Icon28Newsfeed /></TabbarItem>
		  </Tabbar>
		}>
		<View id="random" activePanel="random">
			<PanelRandom id="random" />
		</View>
		  <View id="send" activePanel="send">
			<PanelSend id="send" />
		  </View>
		  <View id="favorite" activePanel="favorite">
			<Favorite id="favorite" />
		  </View>
		</Epic>
	  )
	}
  }

  export default App