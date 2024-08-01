const subBody = document.querySelector('.subBody')



fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => data.forEach(item => {
        fn(item)
    }))


           const fn = (item) => {
        const div = document.createElement('div')
        subBody.append(div)
            div.classList.add('boxElements')

        const id = document.createElement('h1')
        id.setAttribute('item-id', item.id)

        const nume = document.createElement('h1')
        nume.textContent = item.nume

        const image = document.createElement('img')
        image.setAttribute('src', item.image)

        const likes = document.createElement('button')
        likes.classList.add('like')
        likes.textContent = 'Likes'


        const del = document.createElement('button')
        del.classList.add('dell')
        del.textContent = 'Delete'


        div.append(id, nume, image, likes, del)
           }


const buton = document.querySelector('button')
const containerForm = document.querySelector('.containerForm')

buton.addEventListener('click', () => {
    if (containerForm.classList.contains('containerForm')) {
        containerForm.classList.remove('containerForm')
        containerForm.classList.add('containerForm1')
    } else {
        containerForm.classList.remove('containerForm1')
        containerForm.classList.add('containerForm')
    }

})



const butonTest = document.querySelector('button')
butonTest.addEventListener('click', () => {
    fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({

        name: "Eugen",
        image: "https://w7.pngwing.com/pngs/17/532/png-transparent-rex-toy-story-sheriff-woody-lelulugu-pixar-toy-story-background-tyrannosaurus-terrestrial-animal-velociraptor-thumbnail.png",
        likes: 10
    })
}).then(responce => responce.json()).then(data => fn(data))
})




