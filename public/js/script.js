const weatherSearch = document.querySelector('form')
const searchElement = document.querySelector('input')
const firstPara = document.querySelector('#text-1')
const secondPara = document.querySelector('#text-2')


weatherSearch.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchElement.value

  firstPara.textContent = "Loading ..."
  secondPara.textContent = ""

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if(data.error){
        firstPara.textContent = data.error
      }else{
        firstPara.textContent = data.place
        secondPara.textContent = data.forecast
      }
    })
  })


  console.log(location)
})
