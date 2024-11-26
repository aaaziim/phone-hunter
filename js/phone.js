const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const phones = await res.json()
    displayPhone(phones.data);

}

const displayPhone = (phones) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = ""
    phonesContainer.classList.add('bg-slate-300')

    if (phones.length >= 12) {
        document.getElementById('show-all').classList.remove('hidden')
    } else {
        document.getElementById('show-all').classList.add('hidden')

    }

    if (showAllPhone === true) {
        phones = phones
        document.getElementById('show-all').classList.add('hidden')

    } else {
        phones = phones.slice(0, 12)

    }


    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="card bg-gray-100  shadow-xl p-4">
                <figure>
                    <img src="${phone.image}" alt="Shoes" />
                </figure>
                <div class="card-body ">
                    <h2 class="card-title ">
                       ${phone.phone_name}
                        <div class="badge badge-secondary">${phone.brand}</div>
                    </h2>
                    
                     <div class="card-actions justify-center my-2">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
    </div>
                </div>
            </div>
    `
        phonesContainer.appendChild(phoneDiv)
    });

    spinnerHandler(false);

}

document.getElementById('search-btn').addEventListener('click', () => {
    showAllPhone = false

    spinnerHandler(true);
    const searchText = document.getElementById('search-text').value;
    loadPhone(searchText)
})


const spinnerHandler = (isSpin) => {

    if (isSpin) {
        document.getElementById('spinner').classList.remove('hidden')
    } else {
        document.getElementById('spinner').classList.add('hidden')

    }

}
showAllPhone = false
const showAll = () => {
    showAllPhone = true
    spinnerHandler(true);
    const searchText = document.getElementById('search-text').value;
    loadPhone(searchText)
};

const handleShowDetail = async (id) => {

    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data
    showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {



    setValueById('phone-name', phone.name
    );
    setValueById('phone-brand', phone.brand
    );
    setValueById('phone-releaseDate', phone.releaseDate
    );
    document.getElementById('phone-img').src = phone.image
    show_modal.showModal()
}

const setValueById = (id, value) => {
    document.getElementById(id).innerText = value;
}