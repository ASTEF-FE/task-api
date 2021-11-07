let searchForm = document.querySelector('.search-input')
let btn = document.querySelector('.search-button');
let element = document.querySelector('.show-info');
let elementErr = document.querySelector('.show-info');
let createElement = document.createElement(`div`);

btn.addEventListener(`click`, search);

function search() {
	let searchValue = searchForm.value;
	if (searchValue === ``) {
		createElement.innerHTML = `<p>Хорошо бы в поле поиска что-то ввести 😊☝️</p>`;
		elementErr.appendChild(createElement);
	} else {
		fetch(`https://airport-info.p.rapidapi.com/airport?iata=${searchValue}`, {
			"method": "GET",
			"headers": {"x-rapidapi-key": "982e5c482fmsh3d5b7ff2240e639p15d9a9jsn3a6016b9b73d"}
		})
			.then(function (response) {
				console.log(response);
				if (response.status != 200) {
					console.log(`err`);
					createElement.innerHTML = '<p>Что-то сломалось 😭. Повторите попытку позже!</p>';
				} else {
					return response.json();
				}
				elementErr.appendChild(createElement);
			})
			.then(function (data) {
				showInfo(data);
				searchForm.value = '';
			})
			.catch(err => {
				console.log(err);
			});
	}
}

function showInfo(data) {
	let keys = Object.keys(data);

	for (const key of keys) {
		if (data[key] === `` || data === `error`) {
			data[key] = `Данные отсутствуют :(`;
		}
	}
	createElement.innerHTML = `
					<div class="country">
						<div class="country__code">
							<p>Код страны:<span> ${data.country_iso}</span></p>
						</div>
						<div class="country__name">
							<p>Страна:<span> ${data.country} </span></p>
						</div>
						<div class="country__city-name">
							<p>Город:<span> ${data.city}</span> </p>
						</div>
					</div>
					<div class="airport">
						<p class="airport__name">Название аэропорта:<span> ${data.name}</span></p>
						<p class="airport__location">Расположение аэропорта: <span> ${data.location}</span></p>
						<div class="airport__address">
							<p class="airport__item">Адрес:</p>
							<div class="airport__item airport__item_position ">
								<p class="airport__street">Улица: <span> ${data.street}</span></p>
								<p class="airport__street-num">№ здания: <span> ${data.street_number}</span></p>
								<p class="airport__postal-code">Почтовый адрес:<span> ${data.postal_code}</span></p>
							</div>
						</div>
						<div class="airport_code">
							<p class="airport_code__iata"> IATA:<span>${data.iata}</span></p>
							<p class="airport_code__icao">ICAO: <span>${data.icao}</span></p>
						</div>
					</div>
				</aside>`;
	element.appendChild(createElement);
}