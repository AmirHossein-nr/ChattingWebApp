import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
function Setting(props) {
  const [open, setOpen] = React.useState(false);
  const [st,setSt] = React.useState(undefined);
  const [ed,setEd] = React.useState(undefined);
  const [secondOpen, setSecondOpen] = React.useState(false);
  const [changed,setChanged] = React.useState(false);

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
          dark mode from
          <input className={"input-num"} type='number'
                 max={24} min={0} placeholder={"start"} required
                 onChange={(e)=> {
                   setEd(parseInt(e.target.value));
                   setChanged(st!==undefined && ed!==undefined && st!==null && ed!==null);
                 }} />
          to
          <input type='number' className={"input-num"}
                 max={24} min={0} placeholder={"end"} required={true}
                 onChange={(e)=> {
                   setSt(parseInt(e.target.value));
                   setChanged(st!==undefined && ed!==undefined && st!==null && ed!==null);
                 }} />
          &nbsp;
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled ={!changed}
            icon='check'
            content='save'
            onClick={() => {
              console.log("st:",st,"ed:",ed,typeof(st),typeof(ed));
                // props.end(ed)
                // props.start(st)
                setSecondOpen(true);
            }}
          />
          <Button
            color={'red'}
            icon='close icon'
            content='close'
            onClick={() => {

              setSecondOpen(false);
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
    ;
}

export default Setting;