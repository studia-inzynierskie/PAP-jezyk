

export async function handleCreateRoom (values) {
  console.log('creating a room');
  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }
  const response =
      await fetch('/room/create', fetchOptions)

  return response.status;
}

export async function handleJoinRoom (values) {
  console.log('joining a room');
  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }
  const response =
      await fetch('/room/join', fetchOptions)

  return response.status;
}

export async function handleGameStructure() {
  const res = await fetch('/room/structure');

  return res.json();
}

export async function handleGameState() {
  const res = await fetch('/room/');

  return res.json();
}

export async function handleSendGameState (values) {
  console.log('sending data');
  const fetchOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }
  const response =
      await fetch('/room/', fetchOptions)

  return response.json();
}