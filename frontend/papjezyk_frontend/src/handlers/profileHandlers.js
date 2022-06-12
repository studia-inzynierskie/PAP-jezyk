
//ToDo change console logs to returns
export async function handleUserData() {
    const res = await fetch('/user/profile');

    return res.json();
}

export const handleChangeUserEmail = (newEmail) => {
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: newEmail}),
    }

    fetch('/user/update_email', fetchOptions)
        .then(res => res.status)
        .then(data => console.log(data))
}

export const handleChangeUserName = (newName) => {
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newName}),
    }

    fetch('/user/update_email', fetchOptions)
        .then(res => res.status)
        .then(data => console.log(data))
}

export const handleChangeUserPassword = (newPassword) => {
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: newPassword}),
    }

    fetch('/user/update_email', fetchOptions)
        .then(res => res.status)
        .then(data => console.log(data))
}