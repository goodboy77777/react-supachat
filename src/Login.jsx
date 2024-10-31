import { useEffect, useState } from 'react'

function Login({setName,setAppState}) {
	function setOnChange() {
		let elem = document.getElementById("login-input")
		setName(elem.value)
		console.log(`name: ${elem.value}`)
	}
	function login() {
		setAppState("chat")
		console.log("Logging in to Chat!")
	}
	return (
		<>
		<h1>Login</h1>
		<input id="login-input" defaultValue="noname" onChange={setOnChange}></input>
		<button onClick={login}>Login</button>
		</>
	)
}

export default Login
