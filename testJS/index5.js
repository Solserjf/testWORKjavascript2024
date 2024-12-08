
let formInputValue = document.forms.formInputValue;
let list = document.getElementById('list');
let sortByName = document.getElementById('sortByName');
let sortByValue = document.getElementById('sortByValue');
let deleteItem = document.getElementById('deleteItem');

formInputValue.addEventListener("submit", function (ev)  {
    ev.preventDefault();
    let pairNameValue = formInputValue.userNameValue.value;/*зчитуємо input*/
    if (!pairNameValue.includes('=')) {/*перевірка на наявність '=' між ім'ям та значенням*/
        alert("Please enter a valid pair name in the format name=value");
        return;
    }
    let name = pairNameValue.split('=')[0].trim();/*вичавлюємо ім'я за допомогою розділення по '=' через split і видаляємо пробіли на початку і в кінці імені, якщо такі є (за допомогою trim())*/
    let value = pairNameValue.split('=')[1].trim();/*те саме робимо зі значенням*/

    const  correctInput = /^[a-zA-Zа-яА-я0-9]+$/;/*перевірка регуляркою на коректність введення даних(тільки літери та цифри мають бути)*/
    if(!correctInput.test(name) || !correctInput.test(value)) {
        alert('The name and value can contain only alphanumeric characters.');
        return;
    }

    const li = document.createElement('li');/*створюємо li*/
    li.innerText = `${name}=${value}`;/*додаємо до списку нашу пару 'ім'я=значення'*/
    li.classList.add('list-item');/*присвоюємо li клас list-item*/

    li.addEventListener('click', function () {/*додаємо можливість видалення ел-тів через клік по них*/
        this.classList.toggle('selected');
    });

    list.appendChild(li);/*додаємо li в ul id="list*/
    formInputValue.userNameValue.value = '';/*очищаємо input*/

    sortByName.addEventListener('click', function () {/*сортування за ім'ям*/
        let items = Array.from(list.querySelectorAll('.list-item'));/*знаходимо усі ел-ти з класом list-item і за допомогою Array.from перетворюємо на масив ті вузли(а HTML ел-ти є нащадками вузлів) що повернув нам querySelectorAll */
        items.sort((a, b) => {
            let nameA = (a.innerText.split('=')[0].trim()).toLowerCase();/*беремо 1-й ел-нт нашого масиву - 'ім'я' вичавлене за доп. split по знаку '=' і забираємо зайві пробіли якщо є, приводимо до нижнього регістру, щоб сортування не залежало від регістру*/
            let nameB = (b.innerText.split('=')[0].trim()).toLowerCase();
            return nameA > nameB ? 1 : -1;/*(застосувуємо тернарний оператор, якщо умова правдива то повернеться nameA, інакше - nameB )*/
        });
        list.replaceChildren();/*очищення списку*/
        items.forEach(item => list.appendChild(item));
    })

    sortByValue.addEventListener('click', function () {/*сортування за значенням*/
        let items = Array.from(list.querySelectorAll('.list-item'));
        items.sort((a, b) => {
            let valueA = (a.innerText.split('=')[1].trim()).toLowerCase();
            let valueB = (b.innerText.split('=')[1].trim()).toLowerCase();
            return valueA > valueB ? 1 : -1;
        });
        list.replaceChildren();/*очищення списку*/
        items.forEach(item => list.appendChild(item));/*додаємо відсортовані ел-ти назад до списку*/

        });

        deleteItem.addEventListener('click', function () {
            let selectedItems = list.querySelectorAll('.list-item.selected');/*знаходимо усі ел-ти які ми кліком позначили для видалення*/
            selectedItems.forEach(item => item.remove());/*видаляємо ел-ти списка які ми обрали для видалення кліком*/
    });

});


