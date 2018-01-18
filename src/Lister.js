import React from 'react'
import { List, Image } from 'semantic-ui-react'
import avatar from "./avatar.png"

export default ({names}) => (
  <List>
    { names.map(name => {
      return(
        <List.Item>
          <Image avatar src={avatar} />
          <List.Content>
            <List.Header as='a'>{name}</List.Header>
          </List.Content>
        </List.Item>
      )
    }
  )
}
 </List>

)
