import { useState } from "react";
import { useInput } from "../hooks/useInput";

export default function StateLogin() {
  const { value: emailValue } = useInput('');
  const emailIsInvalid =
    enteredValue.email !== '' && !enteredValue.email.includes('@')

  function handleSubmit(event) {
    event.preventDefault()
    console.log(enteredValue)

    setEnteredValue({
      email: '',
      password: ''
    })
  }


  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value)

  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value)
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">


        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleInputChange('password', event.target.value)}
            value={enteredValue.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button"
          onClick={handleSubmit}
        >Login</button>
      </p>
    </form>
  );
}
