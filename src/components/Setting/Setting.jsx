import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function Setting(props) {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      style={{border:'1px #fff solid',borderRadius:'5px'}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer='blurring'
      trigger={<div className={'setting-button'}>
        <Icon corner name='cog' inverted circular />
      </div>}
    >
      <Modal.Header style={{border:'1px #fff solid'}}>Setting</Modal.Header>
      <Modal.Content style={{ backgroundColor: '#fff', color: '#fff' }}>
        <Modal.Description style={{backgroundColor:'#fff !important'}}>
          <Header style={{ backgroundColor: '#fff' }}>Setting</Header>
          <p>
            change the theme of the app
          </p>
        </Modal.Description>
        <br />
        <Button style={{border:`1px ${props.dm?'#000':'#fff'} solid`}}
                color={props.dm ? 'white' : 'black'} onClick={() => {
          if (props.dm) props.sdm(false);
          else props.sdm(true);
          setOpen(true);
        }}>
          {!props.dm ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content='Close'
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