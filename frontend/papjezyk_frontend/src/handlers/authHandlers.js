


export async function handleLogin (values) {
    console.log('logging');
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
    }
    const response =
        await fetch('/auth/login', fetchOptions)


    return response.status;
}

export const handleLogout = () => (
    fetch('/auth/logout')
        .then(res => res.status)

)

export async function handleRegister (values) {
    console.log('registering');
    const fetchOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values),
    }
    const response =
        await fetch('/auth/register', fetchOptions)


    return response.status;
}


export async function isLoggedIn () {
    console.log('checking if logged in');

    const response =
        await fetch('auth/logged_in');

    return response.json();

}