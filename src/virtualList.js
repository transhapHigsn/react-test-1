import React from 'react'
import { List } from 'react-virtualized'
import { List as Listt, Image } from 'semantic-ui-react'
import avatar from './avatar.png'

export default function VList(props){
  let list = props.chats.reverse()
  
  const rowRenderer  = ({
    key,         // Unique key within array of rows
    index,       // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible,   // This row is visible within the List (eg it is not an overscanned row)
    style        // Style object to be applied to row (to position it)
  }) => {
    return (
      <div
        key={key}
        style={style}
      >
        <Listt.Item>
          <Image avatar src={avatar} />
          <Listt.Content>
            <Listt.Header as='a'>{list[index].username}</Listt.Header>
            <Listt.Description>{list[index].message}</Listt.Description>
          </Listt.Content>
        </Listt.Item>
      </div>
    )
  }
  
  return(
    <div id="col-12">
    
    <div id="col-10">
      <h4 align="left" margin="35px">Messages</h4>
      <List
        width={500}
        height={500}
        rowCount={list.length}
        rowHeight={75}
        rowRenderer={rowRenderer}
      />
    </div>
  </div>
  )
}
