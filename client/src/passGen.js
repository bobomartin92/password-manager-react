let lettersSmall = 'abcdefghijklmnopqrstuvwxyz'.split('')
let lettersCap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
let numbers = '0123456789'.split('')
let symbols = '!@#$%^&*()?'.split('')

export const passwordGen = () => {
    let chars = ''
    
    for (let i = 0; i < 5; i++) {
        chars += lettersSmall[Math.floor(Math.random() * lettersSmall.length)]    
    }
    for (let i = 0; i < 2; i++) {
        chars += lettersCap[Math.floor(Math.random() * lettersCap.length)]    
    }
    for (let i = 0; i < 3; i++) {
        chars += numbers[Math.floor(Math.random() * numbers.length)]    
    }
    for (let i = 0; i < 2; i++) {
        chars += symbols[Math.floor(Math.random() * symbols.length)]    
    }

    let passArr = chars.split('')

    for (let i = passArr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        let temp = passArr[i]
        passArr[i] = passArr[j]
        passArr[j] = temp
    }

    return passArr.join('')
}