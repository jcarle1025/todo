let todoList = [];
let change = false;
let edex = 0;

//define our initial layout so that todoList can be populated
document.getElementById('add').addEventListener('click', function() {
	let value = document.getElementById('item').value;
	if (value) {
		add(value);
		render();
	}
});

document.getElementById('item').addEventListener('keydown', function (e) {
	let value = this.value;
	if (e.keyCode === 13 && value) {
		add(value);
		render();
	}
});

render();

function add(value) { todoList.push({txt: value, checked:false}); }
function remove(index) { todoList.splice(index, 1); }
function cross(index, item) {
	item.checked = !item.checked;
	return item;
}

//Now Create HTML Elements for the items in our list
function render() {
	document.getElementById('item').value = '';
	document.getElementById('all').innerHTML = "";
	document.getElementById('modText').value = "";

	if (!todoList.length) { return; }

	for(let i=0; i<todoList.length; i++)
		makeTaskElement(todoList[i], i);
}

function makeTaskElement(item, idx){
	let l = document.getElementById('all');
	let modal = document.getElementById('myModal');

	let buttons = document.createElement('div');
	buttons.classList.add('buttons');

	let removeButton = document.createElement('button');
	removeButton.classList.add('remove');
	removeButton.innerHTML  = 'delete';
	removeButton.addEventListener('click', function() {
		remove(idx);
		render();
	});

	let cbDiv = document.createElement('div');
	cbDiv.classList.add('cbDiv');
	let cb = document.createElement('input');
	cb.id = 'cb';
	cb.type = 'checkbox';
	cb.classList.add('cb');
	cb.checked = item.checked;

	cb.addEventListener('click', function(){
			todoList[idx] = cross(idx, item);
			render();
	});

	cbDiv.appendChild(cb);

	let editButton = document.createElement('button');
	editButton.classList.add('edit');
	editButton.innerHTML = 'edit';
	editButton.addEventListener('click', function() {
		edex = idx;
		modal.style.display = "block";
		render();
		change = true;
	});

	let modalOkButton = document.getElementById('modOK');
	modalOkButton.addEventListener('click', function() {
		let nameValue = document.getElementById('modText').value;
		if(change && nameValue){
			todoList[edex].txt = nameValue;
			render();
		}

		modal.style.display = "none";
		change = false;
	});

	document.getElementById('modText').addEventListener('keydown', function(e){
		let nameValue = this.value;
		if (e.keyCode === 13 && nameValue) {
			todoList[edex].txt = nameValue;
			render();
			modal.style.display = "none";
			change = false;
		}
	});

	window.addEventListener('click', function(event) {
    if (event.target == modal)
        modal.style.display = "none";
	});


	let task = document.createElement('li');
	task.className = "task";
	let t = document.createElement('div');
	t.className = (item.checked) ? "strike" : "regular";
	t.innerText = item.txt;

	buttons.appendChild(removeButton);
	buttons.appendChild(editButton);
	task.appendChild(cbDiv);
	task.appendChild(t);
	task.appendChild(buttons);
	l.insertBefore(task, l.childNodes[0]);
}
