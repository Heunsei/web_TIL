import { useState } from "react";
import { useInput } from "../hooks/useInput";
import Input from "./Input";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput('', (value) => idEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlue,
  } = useInput('', (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault()
    console.log(enteredValue)

    setEnteredValue({
      email: '',
      password: ''
    })
  }




  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="control-row">
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && 'please enter a valid email'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && 'please enter a valid email'}
        />
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
