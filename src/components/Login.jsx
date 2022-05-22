import React from 'react';

import './Login.css';

const Login = ({setEmail, setPassword, handleLogin}) => {
  return (
    <div className="login-container">
      <div className="form-container">
        <div className="title-container">
          <h3 className="title">Are you L ?</h3>
          <p>Please confirm</p>
        </div>
        <form className="form-horizontal">
            <div className="form-icon">
              <i className="fa fa-user-circle"></i>
            </div>
            <div className="form-group">
              <span className="input-icon"><i className="fa fa-user"></i></span>
              <input type="email" name="email" className="form-control" placeholder="Username" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <span className="input-icon"><i className="fa fa-lock"></i></span>
              <input type="password" name="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              {/* <span className="forgot"><a href="">Forgot Password?</a></span> */}
            </div>                
            <button className="btn signin" onClick={handleLogin}>Login</button>
          </form>
      </div>
    </div>         
  )
}

export default Login;