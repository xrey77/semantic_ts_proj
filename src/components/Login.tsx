import { useState } from "react";
import Mfa from "./Mfa";
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

export default function Login() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('')
   const [message, setMessage] = useState<string>('');

   const submitLogin = (event: any) => {
    event.preventDefault();
    setMessage('please wait...');
    const data =JSON.stringify({ username: username, password: password });
    api.post("/signin", data)
    .then((res: any) => {
        if (res.data.statuscode === 200) {
            setMessage(res.data.message);
            if (res.data.qrcodeurl != null) {
                window.sessionStorage.setItem('USERID',res.data.id);
                window.sessionStorage.setItem('TOKEN',res.data.token);
                window.sessionStorage.setItem('ROLE',res.data.roles);
                window.sessionStorage.setItem('USERPIC',res.data.profilepic);
                $("#loginReset").trigger("click");
                $("#mfaModal").trigger("click");

            } else {
                window.sessionStorage.setItem('USERID',res.data.id);
                window.sessionStorage.setItem('USERNAME',res.data.username);
                window.sessionStorage.setItem('TOKEN',res.data.token);                        
                window.sessionStorage.setItem('ROLE',res.data.roles);
                window.sessionStorage.setItem('USERPIC',res.data.profilepic);
                // $("#loginReset").trigger('"click')
                closeLogin;
                location.reload();
            }
            return;
        } else {
          setMessage(res.data.message);
            setTimeout(() => {
              setMessage('');
            }, 3000);
            return;
        }
      }, (error: any) => {
            setMessage(error.response.data.message);
            setTimeout(() => {
              setMessage('');
            }, 3000);
            return;
    });    
  }

  const closeLogin = (event: any) => {
    event.preventDefault();
    setMessage('');
    setUsername('');
    setPassword('');
  }

  return (
    <>
<div className="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticLoginLabel" aria-hidden="true">
  <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header bg-warning">
        <h1 className="modal-title fs-5" id="staticLoginLabel">User's Login</h1>
        <button onClick={closeLogin} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={submitLogin} autoComplete="off">
        <div className="mb-3">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="form-control" id="usrname" placeholder="enter Username"/>
        </div>          
        <div className="mb-3">
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="usrname" placeholder="enter Password"/>
        </div>          
        <div className="mb-3">
          <button type="submit" className="btn btn-warning mx-2">login</button>
          <button id="loginReset" onClick={closeLogin} type="reset" className="btn btn-warning">reset</button>
          <button id="mfa" type="button" className="btn btn-warning d-none" data-bs-toggle="modal" data-bs-target="#staticMfa">mfa</button>

          </div>
        </form>
      </div>
      <div className="modal-footer">
        <div className="w-100 text-danger">{message}</div>
      </div>
    </div>
  </div>
</div>    
<Mfa/>
</>
  )
}
