const inp = document.querySelector('.prompt'),
chatSection = document.querySelector('.chat'),
senBtn = document.querySelector('.send_btn'),
main = document.querySelector('.main'),
instruct = document.querySelector('.instruct')

inp.focus()

function addAdminMessage(message) {
    const admin = document.createElement('div')
    admin.className = 'admin'

    const msg = document.createElement('p')
    msg.innerText = `${message}`

    admin.appendChild(msg)

    const dum = document.createElement('div')
    dum.className = 'dum'

    chatSection.appendChild(admin)
    chatSection.appendChild(dum)
    dum.scrollIntoView(true)
}

function fireImage(prompt) {
    let prompt_ = prompt.replace('img', '')
    prompt_ = prompt_.replace(/\s+/g, "")
    const generatedImage = document.createElement('img')

    const random = Math.floor(Math.random() * (9999 - 1)) + 1

    generatedImage.src = `https://image.pollinations.ai/prompt/${prompt_}?nologo=poll&nofeed=yes&seed=${random}`
    generatedImage.className = 'gen'

    const dum = document.createElement('div')
    dum.className = 'dum'

    chatSection.appendChild(generatedImage)
    chatSection.appendChild(dum)
    dum.scrollIntoView(true)
}

async function firePrompt(prompt) {
    const BASE_URL = 'https://admin1334.pythonanywhere.com/rev_admin'
    const payload = {
        prompt : prompt
    }

    fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
    .then(response => response.json())
    .then(data => addAdminMessage(data.response))
    .catch(err => console.error(err))
}

let first = false

function addUserMessage() {
    const user = document.createElement('div')
    user.className = 'user'
    
    const userProfile = document.createElement('i')
    userProfile.className = 'fa-solid fa-user'

    const msg = document.createElement('p')
    msg.innerText = `${inp.value}`

    user.appendChild(userProfile)
    user.appendChild(msg)

    const dum = document.createElement('div')
    dum.className = 'dum'

    chatSection.appendChild(user)
    chatSection.appendChild(dum)
    dum.scrollIntoView(true)

    const prompt = inp.value
    inp.value = ''

    if(!first) {
        main.removeChild(instruct)
        first = true
    }

    if(prompt.includes('img'))
        fireImage(prompt)
    else
        firePrompt(prompt)

}

inp.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && inp.value !== '')
        addUserMessage() 
})

senBtn.addEventListener('click', function(e){
    if(inp.value !== '')
        addUserMessage()
})