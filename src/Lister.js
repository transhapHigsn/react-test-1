import React from 'react'
import { List, Image } from 'semantic-ui-react'
import avatar from "./avatar.png"

export default ({chats}) => (
  <List>
    { chats.map(chat => {
      return(
        <List.Item>
          <Image avatar src={avatar} />
          <List.Content>
            <List.Header as='a'>{chat.username}</List.Header>
            <List.Description>{chat.message}</List.Description>
          </List.Content>
        </List.Item>
      )
    }
  )
}
 </List>

)
