import React, {useEffect, useState} from 'react';
import {Button, Icon, Image, Item, Menu} from 'semantic-ui-react';
import {Grid, Header, Ref, Segment, Sidebar} from 'semantic-ui-react';
import Chart from './Chart';
import './MyProfile.css';
import {Link, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function MyPage() {
  const segmentRef = React.useRef();

  const [userList, setUserList] = useState({});
  const [butcheck, setButcheck] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButcheck(false);
    console.log(userList);
    axios
      .post('http://localhost:8000/user/current/', { userList }, {headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`}})
      .then((res) => res.data);
  };

  useEffect(() => {
    const take = async () => {
      await axios.get('http://localhost:8000/user/myprofile/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      }).then(res => console.log(setUserList(res.data)));
    };
    take();
  }, []);
  console.log(userList);
  return (
      <>
      <div>
          <div className="profilebox" style={{display: 'flex'}}>
                <div style={{paddingRight: '100px'}}>
                </div>
              <Grid columns={1}>
                  <Grid.Column>
                      <Sidebar.Pushable as={Segment.Group} raised>
                          <Ref innerRef={segmentRef}>
                              <Segment secondary>
                                  <Header as='h3'>Profile</Header>
                              </Segment>
                          </Ref>

                          <Segment>
                              {butcheck === false ? (
                                  <Item.Group divided>
                                  <Item>
                                  <div className="box">
                                  <img className="profile" src={'http://localhost:8000' + userList.photo} />
                                  </div>
                                  <Item.Content>
                                  <Item.Header as='a'>
                                  <div className="name">{userList.nickname}</div>
                                  </Item.Header>
                                  <Item.Meta>
                                  <div className="content">{userList.myInfo}</div>
                                  </Item.Meta>
                                  <Item.Extra>
                                  <div>

                                  <Button floated='right' basic color='yellow' style={{marginLeft: '400px'}} onClick={e => { setButcheck(true); }}>>
                                  ????????? ????????????
                                  <Icon name='right chevron' />
                                  </Button>

                                  </div>
                                  </Item.Extra>
                                  </Item.Content>
                                  </Item>
                                  </Item.Group>
                              ) : (
                                  <Item.Group divided>
                                      <Item>
                                          <div className="box">
                                              <img className="profile" src={photo} />
                                          </div>
                                          <Item.Content>
                                              <Item.Header as='a'>
                                                  <div className="name">{username}</div>
                                              </Item.Header>
                                              <Item.Meta>
                                                  <div className="content"><input type="text" onChange={e => { setUserList({...userList, myInfo: e.target.value}); }}/></div>
                                              </Item.Meta>
                                              <Item.Extra>
                                                  <div>

                                                      <Button floated='right' basic color='yellow' style={{marginLeft: '400px'}} onClick={
                                                        handleSubmit
                                                      }
                                                      >
                                                          ?????? ??????
                                                          <Icon name='right chevron' />
                                                      </Button>

                                                  </div>
                                              </Item.Extra>
                                          </Item.Content>
                                      </Item>
                                  </Item.Group>
                              )
                              }
                          </Segment>
                      </Sidebar.Pushable>
                  </Grid.Column>
              </Grid>
            </div>
          <div>
              <Chart/>
          </div>
      </div>
      </>
  );
}

export default MyPage;
