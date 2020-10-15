
console.log('Client side javascript file is loaded')


// fetch('http://localhost:3000/weather?address='+search).then((response)=>{
//     response.json().then((data)=>{
//         if(data.Error){
//         return console.log(data.Error)
//     }
//         console.log(data.Data)
//         console.log(data.Location)
//         console.log(data.Address)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    //fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
        return messageOne.textContent = '' +data.Error
    }
        messageTwo.textContent = 'Temperature: ' +data.Data.temperature+ ' .. Weather: ' +data.Data.weather+ ' .. Time-zone: ' +data.Data.timezone
        messageOne.textContent = 'Location: ' +data.Location
        //console.log(data.Address)
    })
})
})