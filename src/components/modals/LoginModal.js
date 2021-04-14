import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './LoginModal.css';
import axios from 'axios';
// import GoogleLogin from 'react-google-login';

function LoginModal(props) {
  let [JoinLoign, setJoinLogin] = useState('로그인');
  const history = useHistory();

  let [username, setUsername] = useState();
  let [userpassword, setUserPassword] = useState();

  const data = { username: username, password: userpassword};

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  console.log(props);
  return (
        <>
            <div className="login-container">
                <div className="login-box">

                    <span>{JoinLoign}</span>
                    <form>
                        {
                            JoinLoign === '로그인'
                              ? (
                                    <>
                                        <input type="text" placeholder="아이디를 입력하세요" onChange={handleNameChange}/>
                                        <input type="password" placeholder="비밀번호를 입력하세요" id="password" onChange={handlePasswordChange}/>
                                        <button className="JoinLoign-button" onClick={(e)=>{
                                          e.preventDefault();
                                          axios.post('http://localhost:8000/login/', {
                                            headers: {
                                              'Content-Type': 'application/json'
                                            },
                                            body: data
                                          })
                                            .then(res => {
                                              // user data와 token정보가 일치하면 로그인 성공
                                              if (res.user && res.user.username && res.token) {
                                                props.userHasAuthenticated(
                                                  true,
                                                  res.user.username,
                                                  res.token);
                                                history.push('/');
                                                props.setModal(true);
                                              } else {
                                                alert('아이디 또는 비밀번호를 확인해주세요.');
                                              }
                                            })
                                            .catch(error => alert(error));
                                        }}>{JoinLoign}</button>
                                    </>
                              )
                              : (
                                    <>
                                        <input type="text" placeholder="아이디를 입력하세요" onChange={handleNameChange}/>
                                        <input type="password" placeholder="비밀번호를 입력하세요" onChange={handlePasswordChange}/>
                                        <button className="JoinLoign-button" onClick={(e)=>{
                                          e.preventDefault();
                                          fetch('http://localhost:8000/user/', {
                                            method: 'POST',
                                            headers: {
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                          }).then(res => res.json())
                                            .then(json => {
                                              if (json.username && json.token) {
                                                props.userHasAuthenticated(
                                                  true,
                                                  json.username,
                                                  json.token);
                                                history.push('/');
                                                props.setModal(true);
                                              } else {
                                                alert('사용불가능한 아이디입니다.');
                                              }
                                            })
                                            .catch(error => alert(error));
                                        }}
                                        >{JoinLoign}</button>
                                    </>
                              )
                        }

                    </form>
                    <div className="login-foot">
                        {
                            JoinLoign === '회원가입'
                              ? (
                                    <>
                                        <span>이미 회원이신가요  ?</span>
                                        <div className="foot-link" onClick={(e)=>{
                                          e.preventDefault();
                                          setJoinLogin('로그인');
                                        }}>로그인</div>
                                    </>
                              )
                              : (
                                    <>
                                        <span>아직 회원이 아니신가요 ?</span>
                                        <div className="foot-link" onClick={(e)=>{
                                          e.preventDefault();
                                          setJoinLogin('회원가입');
                                        }}>회원가입</div>
                                    </>
                              )
                        }
                    </div>
                </div>
            </div>
        </>
  );
}
export default LoginModal;
