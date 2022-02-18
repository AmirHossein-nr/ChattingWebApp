import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import TimePicker from 'react-time-picker';
function Setting(props) {
  const [open, setOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [value, onChange] = useState('10:00');
  // const [secondTime, setSecondTime] = React.useState("00:00:00");
  return (
    <>
      <Modal
        style={{ border: '1px #fff solid', borderRadius: '5px' }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        dimmer='blurring'
        trigger={<div className={'setting-button'}>
          <Icon corner name='cog' inverted circular />
        </div>}
      >
        <Modal.Header style={{ border: '1px #fff solid' }}>Setting</Modal.Header>
        <Modal.Content style={{ backgroundColor: '#fff', color: '#fff' }}>
          <Modal.Description style={{ backgroundColor: '#fff !important' }}>
            <Header style={{ backgroundColor: '#fff' }}>Setting</Header>
            <p>
              change the theme of the app
            </p>
          </Modal.Description>
          <br />
          <Button style={{ border: `1px ${props.dm ? '#000' : '#fff'} solid` }}
                  color={props.dm ? 'white' : 'black'} onClick={() => {
            if (props.dm) props.sdm(false);
            else props.sdm(true);
            setOpen(true);
          }}>
            {!props.dm ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <Button style={{ border: `1px ${props.dm ? '#000' : '#fff'} solid` }}
                  color='white' onClick={() => {
            setSecondOpen(true);
            setOpen(true);
          }}>
            set night time
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
      <Modal
        style={{ border: '1px #ff5 solid', borderRadius: '5px' }}
        onClose={() => setSecondOpen(false)}
        open={secondOpen}
        size='small'
      >
        <Modal.Header>Time dark mode</Modal.Header>
        <Modal.Content style={{ color: 'white' }}>
          <p style={{ color: 'white' }}>set the time of dark mode</p>
          <br />
          {/*<input*/}
          {/*  className={'time-input'}*/}
          {/*  type={'time'}*/}
          {/*  placeholder={'Time'}*/}
          {/*  onChange={(e) => {*/}
          {/*    console.log(e.target.value);*/}
          {/*  }}*/}

          {/*/>*/}
          <TimePicker
            format={"HH:mm:ss"}
            className={'time-input'}
            onChange={onChange}
            value={value} />
          &nbsp;
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon='check'
            content='save'
            onClick={() => {
              setSecondOpen(false);
            }}
          />
          <Button
            color={'red'}
            icon='close icon'
            content='close'
            onClick={() => setSecondOpen(false)}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
    ;
}

export default Setting;