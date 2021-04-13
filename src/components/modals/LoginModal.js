import React, { useState } from 'react';
import { useHistory } from 'react-router';
import './LoginModal.css';
// import GoogleLogin from 'react-google-login';

function LoginModal(props) {
  let [JoinLoign, setJoinLogin] = useState('로그인');
  const history = useHistory();

  let [userId, setUserId] = useState();
  let [pw, setPw] = useState();
  let [pw1, setPw1] = useState();
  let [nickname, setNickname] = useState('');
  let [name, setname] = useState('');
  let [email, setEmail] = useState('');
  let [phone, setPhone] = useState('');

  const data = {userId: userId, pw: pw, pw1: pw1, nickname: nickname, email: email, phone: phone};

  const handleIdChange = (e) => {
    setUserId(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setUserPw(e.target.value);
  };

  console.log(props);
  return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <div className="exit">
                        <button onClick={()=>{ history.goBack(); }}>
                            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                        </button>
                    </div>
                    <span>{JoinLoign}</span>
                    <form>
                        {
                            JoinLoign === '로그인'
                              ? (
                                    <>
                                        <input type="user_id" placeholder="아이디를 입력하세요" onChange={handleIdChange}/>
                                        <input type="pw" placeholder="비밀번호를 입력하세요" id="pw" onChange={handlePasswordChange}/>
                                        <button className="JoinLoign-button" onClick={(e)=>{
                                          e.preventDefault();
                                          fetch('http://localhost:8000/login/', {
                                            method: 'POST',
                                            headers: {
                                              'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                          })
                                            .then(res => res.json())
                                            .then(json => {
                                              // user data와 token정보가 일치하면 로그인 성공
                                              if (json.user && json.user.username && json.token) {
                                                // eslint-disable-next-line max-len
                                                props.userHasAuthenticated(true, json.user.username, json.token);
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
                                        <input type="userId" placeholder="아이디를 입력하세요" onChange={(e)=>setUserId(e.target.value)}/>
                                        <input type="pw" placeholder="비밀번호를 입력하세요" onChange={(e)=>setPw(e.target.value)}/>
                                        <input type="pw1" placeholder="비밀번호를 입력하세요" onChange={(e)=>setPw1(e.target.value)}/>
                                        <input type="name" placeholder="이름을 입력하세요" onChange={(e)=>setname(e.target.value)}/>
                                        <input type="nickname" placeholder="닉네임을 입력하세요"/>
                                        <input type="phone" placeholder="핸드폰 번호 입력하세요"/>
                                        <input type="email" placeholder="이메일을 입력하세요"/>
                                        <input type="name" placeholder="이름을 입력하세요"/>
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
                                                // eslint-disable-next-line max-len
                                                props.userHasAuthenticated(true, json.username, json.token);
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
