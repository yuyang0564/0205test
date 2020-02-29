import _ from 'lodash'
export default function (num = 6, letters = 'QWERTYUIOPLKJHGFDSAZXCVBNM1234567890')
{
  let tpl = ''
  let captcha = []

  try {
    captcha = [...Array(num)].map(() => {
      return letters[Math.floor(Math.random() * letters.length)]
    })
  } catch (e) { }

 
  _.each(captcha , item => {
    tpl += `<span class="flex1 hcenter">${item}</span>`
  })

  captcha = captcha.join('')

  return {
    tpl,
    captcha
  }
}