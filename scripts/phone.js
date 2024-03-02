const loadPhone = async (brand, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phonesContainer = document.getElementById('card-container');
    phonesContainer.innerHTML = '';
    console.log(phones);
    if (phones.length==0) {
        phonesContainer.innerHTML = `
        <h1 class="text-4xl my-40 font-semibold w-full col-span-3">No Data Available</h1>
        `;
    }

    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        phones = phones.slice(0, 9);
    }

    phones.forEach(phone => {

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
                    <button onclick ="handleShowDetails('${phone.slug}'); show_details_modal.showModal() " class="btn bg-[#0D6EFD] text-lg font-semibold text-white">Show Details</button>
                </div>
            </div>
        `
        phonesContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleLoadingSpinner(true);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    show_details_modal.showModal();

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="w-full flex justify-center bg-slate-100 rounded-xl">
            <img class="" src="${phone.image}" alt="">
        </div>
        <div class="text-left space-y-4">
            <h3 class="text-3xl font-semibold">${phone.name}</h3>
            <p></p>
            <p><span class="text-lg font-medium">Brand: </span>${phone?.brand}</p>
            <p><span class="text-lg font-medium">Storage: </span>${phone?.mainFeatures?.storage}</p>
            <p><span class="text-lg font-medium">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
            <p><span class="text-lg font-medium">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
            <p><span class="text-lg font-medium">Memory: </span>>${phone?.mainFeatures?.memory}</p>
            <p><span class="text-lg font-medium">Slug: </span>${phone?.slug}</p>
            <p><span class="text-lg font-medium">Release Data: </span>${phone?.releaseDate}</p>
            <p><span class="text-lg font-medium">GPS: </span>${phone?.others?.GPS ? phone?.others?.GPS : 'N/A'}</p>
        </div>
    `

}

loadPhone('iphone', false);