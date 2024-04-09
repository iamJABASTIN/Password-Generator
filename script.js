const resultEl =document.getElementById('result')
const clipboardEl =document.getElementById('clipboard')
const lengthEl =document.getElementById('length')
const uppercaseEl =document.getElementById('uppercase')
const lowercaseEl =document.getElementById('lowercase')
const numbersEl =document.getElementById('numbers')
const symbolsEl =document.getElementById('symbols')
const generateEl =document.getElementById('generate')

const randomFunction = {
    upper:getRandomUpper,
    lower:getRandomLower,
    numbers:getRandomNumber,
    symbols:getRandomSymbol
}

clipboardEl.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText
    if(!password) {
        return
    }
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copyed to the clipboard!')
})

generateEl.addEventListener('click', ()=> {
    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasNumbers = numbersEl.checked
    const hasSymbols = symbolsEl.checked
    resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumbers, hasSymbols)
})

function generatePassword(len, upper, lower, numbers, symbols) {
    let generatedPassword = ''
    const typesCount = upper+lower+numbers+symbols
    const typeArr = [{upper}, {lower}, {numbers}, {symbols}].filter( item => Object.values(item)[0])
    if(typesCount==0) {
        return ''
    } 
    for(let i=0;i<len;i+=typesCount) {
        typeArr.forEach( (type)=> {
            const funName = Object.keys(type)[0]
            generatedPassword += randomFunction[funName]()
        })
    }

    const finalPassword = generatedPassword.slice(0,len)
    return finalPassword
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48)
}

function getRandomSymbol(){
    const symbol = '~@#$%^&*()_+=`{}[]<>?'
    return symbol[Math.floor(Math.random() * symbol.length)]
}

