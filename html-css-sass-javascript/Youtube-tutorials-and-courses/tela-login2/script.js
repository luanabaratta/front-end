const init = () => {

    const inputEmail = document.querySelector('input[type="email"]')
    const inputPassword = document.querySelector('input[type="password"]')
    const buttonSubmit = document.querySelector('.login__submit')

    const validateEmail = e => {
        const input = e.currentTarget
        const regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/
        const emailTest = regex.test(input.value)

        if (!emailTest) {
            buttonSubmit.setAttribute('disabled', 'disabled')
            input.nextElementSibling.classList.add('error')
        } else {
            buttonSubmit.removeAttribute('disabled')
            input.nextElementSibling.classList.remove('error')
        }
    }

    const validatePassword = e => {
        const input = e.currentTarget

        if (input.value.length < 8) {
            buttonSubmit.setAttribute('disabled', 'disabled')
            input.nextElementSibling.classList.add('error')
        } else {
            buttonSubmit.removeAttribute('disabled')
            input.nextElementSibling.classList.remove('error')
        }
    }

    if (buttonSubmit) {
        buttonSubmit.addEventListener('click', (e) => {
            e.preventDefault()

            buttonSubmit.textContent = '...Loading'

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then(response => {
                if (response.status !== 200) {
                    return errorHandler()
                }
                successHandler()

            }).catch(() => {
                errorHandler()
            })
        })
    }

    const errorHandler = () => {
        buttonSubmit.classList.remove('success')
        buttonSubmit.classList.add('error')
        buttonSubmit.textContent = "Error :("
    }

    const successHandler = () => {
        buttonSubmit.classList.remove('error')
        buttonSubmit.classList.add('success')
        buttonSubmit.textContent = "Sent! :)"
    }

    inputEmail.addEventListener('input', validateEmail)
    inputPassword.addEventListener('input', validatePassword)
}

window.onload = init