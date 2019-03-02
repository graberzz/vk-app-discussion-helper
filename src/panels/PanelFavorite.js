import React from 'react'

import connect from '@vkontakte/vkui-connect'
import { Panel, PanelHeader, Group, List, Cell } from '@vkontakte/vkui'
import Icon24Share from '@vkontakte/icons/dist/24/share'

import * as api from '../api'

export class PanelFavorite extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            favorites: api.getFavorite()
        }

        this.onQuoteClick = this.onQuoteClick.bind(this)
    }

    onQuoteClick(quote) {
		connect.send("VKWebAppShare", {"link": quote })
    }

    render() {
        const { favorites } = this.state

        return (
            <Panel id="favorite">
                <PanelHeader>Избранное [В разработке]</PanelHeader>
                <Group>
                    <List>
                        { favorites.map((favorite, id) => (
                            <Cell
                                key={id}
                                multiline
                                asideContent={<Icon24Share onClick={() => this.onQuoteClick(favorite)} />}
                            >{ favorite }</Cell>
                        ))}
                    </List>
                </Group>
            </Panel>
        )
    }
}

export default PanelFavorite