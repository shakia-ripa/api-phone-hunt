const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}

const displayPhones = phones => {
    phones.forEach(phone => {
        console.log(phone);
        const phonesContainer = document.getElementById('card-container');

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 border p-8`;
        phoneCard.innerHTML = `
            <figure class=" bg-slate-100 rounded-xl">
                <img class="p-12 " src=${phone.image} alt="Phones"
                    class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>Brand: ${phone.brand}</p>
                <div class="card-actions">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneCard);
    })
}

const handleSearch = () =>{
    console.log('Searching Searching ...');
}

loadPhone();