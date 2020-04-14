window.addEventListener('load', () => {
	const appliance = {
		focusInputModel: () => {
			document.querySelector("input[name='model']").focus();
		},

		CreateEventButtonRemove: () => {
			const buttonsDelete = document.querySelectorAll('button#exclued');
			for (let i = 0; i < buttonsDelete.length; i++) {
				buttonsDelete[i].addEventListener('click', (e) => {
					const board = document.querySelectorAll('td#board');
					vehicle.remove(board[i].innerText, i);
				})
			}
		},

		checkBlankField: (model, board) => {
			if (model == '' || board == '') {
				return false;
			}
			return true;
		},

		checkYardExist: () => {
			const yard = localStorage.getItem('yard');
			if (yard) {
				return true;
			} else {
				return false;
			}
		}

	}

	appliance.focusInputModel();

	const form = document.querySelector('form#form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const model = formData.get('model');
		const board = formData.get('board');

		const data = new Date();
		const entry = data.getHours() + ':' + data.getMinutes();

		const response = appliance.checkBlankField(model, board);

		response ? vehicle.add(model, board, entry) : window.alert('preencha todos os campos');

	});




	const vehicle = {

		add: (model, board, entry) => {
			const car = {
				model,
				board,
				entry
			};

	      	if (localStorage.getItem('yard') == null) {
	        	const cars = [];
	       		cars.push(car);
	        	localStorage.setItem('yard', JSON.stringify(cars));

		    } else {
		    	const cars = JSON.parse(localStorage.getItem('yard'))
		    	cars.push(car);
		    	localStorage.setItem('yard', JSON.stringify(cars));
		    }

      		form.reset();
      		vehicle.show();
      		appliance.focusInputModel();

		},

		remove: (trueBoard, position) => {

			const yard = JSON.parse(localStorage.getItem('yard'));
			const boardFinded = yard[position].board;

			if (trueBoard == boardFinded && boardFinded.indexOf(trueBoard) === 0) {

				yard.splice(position, 1);
				localStorage.setItem('yard', JSON.stringify(yard));
				vehicle.show();

				window.alert('Veículo removido com sucesso!');

			} else {
				window.alert('Algo deu errado!');
			}

			appliance.focusInputModel();

		},

		show: () => {
			const divCars = document.querySelector('div#cars');
			const cars = JSON.parse(localStorage.getItem('yard'));

			let table = `<table>`
			table += 		`<thead>`
			table += 			`<th>Modelo</th>`
			table += 			`<th>Placa</th>`
			table += 			`<th>Entrada</th>`
			table += 			`<th>Terminar</th>`
			table += 		`</thead>`
			table += 		`<tbody>`
			for (let i = 0; i < cars.length; i++) {
				table += 			`<tr>`
				table += 				`<td>${cars[i].model}</td>`
				table += 				`<td id="board">${cars[i].board}</td>`
				table += 				`<td>${cars[i].entry}</td>`
				table += 				`<td>
											<button id='exclued'>Excluir</button>
										</td>`
				table += 			`</tr>`
			}
			table += 		`</tbody>`
			table += 	`</table>`

			divCars.innerHTML = table;

			appliance.CreateEventButtonRemove();

		}
	};

	const response = appliance.checkYardExist();
	if (response) {
		vehicle.show();
	} else {
		localStorage.setItem('yard', JSON.stringify([]));
		vehicle.show();
	}



});