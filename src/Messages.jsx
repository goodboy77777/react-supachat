function Messages(props) {
	return (<>
		{props.list.map(msg => <div>{msg.name}: {msg.message}</div>)}

		</>)
}

export default Messages
