import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
//import { createClient } from "@supabase/supabase-js"
import Messages from "./Messages.jsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
/*
const SUPABASE_URL = 'https://fxxhuaqchybifkwskqvk.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eGh1YXFjaHliaWZrd3NrcXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkyNzM0NDUsImV4cCI6MjA0NDg0OTQ0NX0.6jNj-QC62XQe1u8yyihFL8rcFLthEsA0eFI5zNnJexg'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
*/

var test = ":hello:"


console.log("Connected to Supabase!")

var myChannel = null



function Chat({name, setAppState}) {
  let defaultMessages = [
	  {name: "jonny", message: "hello"},
	  {name: "bobby", message: "world"},
	  {name: "teddy", message: "now"}
  ]
  const [messages, setMessages] = useState(defaultMessages)
  useEffect(() => {
    console.log("Hopefully subscribing to myChannel")
   myChannel = supabase.channel('room', {
  config: {
    broadcast: { self: true },
  },
})
  myChannel.subscribe()

   const listener =  myChannel.on(
  'broadcast',
  { event: 'message' },
  (payload) => { 
  	let m = payload.payload
  	//messages.push(m.message)
	console.log(m)
	setMessages(old => [...old,m])
  })
	
  console.log("subscribed myChannel now!")
  return (() => listener.unsubscribe()) 
  },[])
 
  function send() {
	  let input = document.getElementById("input-message")
	  let value = input.value

	  myChannel.send({
		  type: 'broadcast',
		  event: 'message',
		  payload: {
			  name: name,
			  message: value
		  }
	  })
	  input.value = ""

  }


  function onKeydownSend(event) {
	  if (event.key === 'Enter') {
		  send()
	  }
  }

  return (
  <>
	<style>{` .bot { position: sticky; bottom: 0px;height: 10%;} .top { top: 0px; height: 90%;}`}</style>
	<div className="tttop">
	  <h1>Supachat!</h1>
	<Messages list={messages} />
	</div>  
	<div className="bot">
	  <input id="input-message" onKeyPress={onKeydownSend}></input>
	  <button  onClick={send}>Send</button>
	  </div>
  </>
  )
}

export default Chat
