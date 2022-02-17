import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function Setting(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      className={"thiss"}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div className={'setting-button'}>
        <Icon corner name='cog' inverted circular />
      </div>}
    >
      <Modal.Header >Setting</Modal.Header>
      <Modal.Content  style={{ backgroundColor: '#fff',color:"#fff" }}>
        <Modal.Description>
          <Header style={{ backgroundColor: '#fff' }}>Setting</Header>
          <p>
           change the theme of the app
          </p>
        </Modal.Description>
        <Button color='black' onClick={() =>{
          if(props.dm) props.sdm(false)
          else props.sdm(true)
          setOpen(true)
        } }>
          Dark Mode
        </Button>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default Setting;