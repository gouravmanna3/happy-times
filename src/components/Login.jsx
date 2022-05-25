import React, {
  useRef,
  useState,
  ChangeEvent,
  SyntheticEvent,
  useEffect
} from 'react';
import { useNavigate } from "react-router-dom";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
  UseRiveParameters,
  RiveState,
  StateMachineInput,
} from 'rive-react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';

const STATE_MACHINE_NAME = 'Login Machine';
const LOGIN_PASSWORD = 'teddy';
const LOGIN_TEXT = 'Login';



const Login = (riveProps= {}) => {

  const { rive: riveInstance, RiveComponent } = useRive({
    src: 'login-teddy.riv',
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    ...riveProps,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputLookMultiplier, setInputLookMultiplier] = useState(0);
  const [loginButtonText, setLoginButtonText] = useState(LOGIN_TEXT);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const isCheckingInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'isChecking'
  );
  const numLookInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'numLook'
  );
  const trigSuccessInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigSuccess'
  );
  const trigFailInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'trigFail'
  );
  const isHandsUpInput = useStateMachineInput(
    riveInstance,
    STATE_MACHINE_NAME,
    'isHandsUp'
  );

  // Divide the input width by the max value the state machine looks for in numLook.
  // This gets us a multiplier we can apply for each character typed in the input
  // to help Teddy track progress along the input line
  useEffect(() => {
    if (inputRef?.current && !inputLookMultiplier) {
      setInputLookMultiplier(
        (inputRef.current).offsetWidth / 100
      );
    }
  }, [inputRef]);

  // As the user types in the username box, update the numLook value to let Teddy know
  // where to look to according to the state machine
  const onUsernameChange = (e) => {
    const newVal = e.target.value;
    setEmail(newVal);
    if (!isCheckingInput.value) {
      isCheckingInput.value = true;
    }
    const numChars = newVal.length;
    numLookInput.value = numChars * inputLookMultiplier;
  };

  // Start Teddy looking in the correct spot along the username input
  const onUsernameFocus = () => {
    isCheckingInput.value = true;
    if (numLookInput.value !== email.length * inputLookMultiplier) {
      numLookInput.value = email.length * inputLookMultiplier;
    }
  };

  const onSubmit = (e) => {
    console.log(email, password)
    e.preventDefault();
    setLoginButtonText('Checking...');
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((response) => {
        setLoginButtonText(LOGIN_TEXT)
        trigSuccessInput.fire()
        sessionStorage.setItem('authToken', response._tokenResponse.refreshToken);
        navigate('/');
      })
      .catch((error) => {
        setLoginButtonText(LOGIN_TEXT)
        trigFailInput.fire();
        console.log(error)
        if(error.code === 'auth/wrong-password'){
          toast.error('Please check the Password', {theme: 'colored'});
        }
        if(error.code === 'auth/user-not-found'){
          toast.error('Please check the Email', {theme: 'colored'});
        }
      })
  };



  return (
    <div className="rive-story-container-login">
    <div className="login-form-component-root">
      <div className="login-form-wrapper">
        <div className="rive-wrapper">
          <RiveComponent className="rive-container" />
        </div>
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <label>
              <input
                type="text"
                className="form-username"
                name="username"
                placeholder="Username"
                onFocus={onUsernameFocus}
                value={email}
                onChange={onUsernameChange}
                onBlur={() => (isCheckingInput.value = false)}
                ref={inputRef}
              />
            </label>
            <label>
              <input
                type="password"
                className="form-pass"
                name="password"
                placeholder="Password (shh.. it's 'teddy')"
                value={password}
                onFocus={() => (isHandsUpInput.value = true)}
                onBlur={() => (isHandsUpInput.value = false)}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </label>
            <button className="login-btn">{loginButtonText}</button>
          </form>
        </div>
      </div>
    </div>
    </div>      
  )
}

export default Login;