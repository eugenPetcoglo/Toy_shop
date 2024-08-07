const subBody = document.querySelector('.subBody')



axios({
    method: 'get',
    url: 'http://localhost:3000/toys',
    responseType: 'json'
})
    .then(response => {
        const data = response.data;
        data.forEach(item => {
            fn(item);
        });
    })



const fn = (item) => {
    const div = document.createElement('div')

    div.classList.add('boxElements')
    subBody.append(div)
    div.setAttribute('data-id', item.id)

    const nume = document.createElement('h1')
    nume.textContent = item.name

    const image = document.createElement('img')
    image.setAttribute('src', item.image)

    const likes = document.createElement('button')
    likes.classList.add('like')
    likes.textContent = `${item.likes} likes`


    const del = document.createElement('button')
    del.classList.add('dell')
    del.textContent = 'Delete'

    del.addEventListener('click', () => deleteToy(item.id, div))

    div.append(nume, image, likes, del)
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


const deleteToy = (id, element) => {
    fetch(`http://localhost:3000/toys/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                element.remove();
            } else {
                console.error('Failed to delete the toy');
            }
        })
        .catch(error => console.error('Error:', error));
}


const addDiv = () => {
    const form = document.querySelector('form')
    const title = form.querySelector('.title').value
    const imgLink = form.querySelector('.img').value
    const likes = form.querySelector('.like')

    fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: title,
            image: imgLink,
            likes: 0
        })
    }).then(response => {
        return response.json()
    }).then(response => fn(response))
}

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    addDiv()
})

subBody.addEventListener('click', event =>{
    if (event.target.className === 'like'){
        const id_like = event.target.parentElement.dataset.id;
        console.log(id_like)
        const likes_counter = parseInt(event.target.textContent);
        event.target.textContent = `${likes_counter + 1} likes`;
        fetch(`http://localhost:3000/toys/${id_like}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: likes_counter + 1
            })
        })
            .then(response => response.json())
    }
})

