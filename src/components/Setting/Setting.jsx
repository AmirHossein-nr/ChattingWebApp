import React from 'react';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

function Setting() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<div className={'setting-button'}>
        <Icon corner name='cog' inverted circular />
      </div>}
    >
      <Modal.Header>Setting</Modal.Header>
      <Modal.Content style={{ background: '#fff' }}>
        <Modal.Description>
          <Header style={{ backgroundColor: '#fff' }}>Setting</Header>
          <p>
            change the setting of the app
          </p>
        </Modal.Description>

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