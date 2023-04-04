let toDoInput, errorInfo, addBtn, ulList, newToDo
let popup, popupInfo, toDoToEdit, popupInput, popupAddBtn, popupCloseBtn

//* MAIN *//

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input')
	errorInfo = document.querySelector('.error-info')
	addBtn = document.querySelector('.btn-add')
	ulList = document.querySelector('.todolist ul')
	//!POPUP ELEMENTS
	popup = document.querySelector('.popup')
	popupInfo = document.querySelector('.popup-info')
	popupInput = document.querySelector('.popup-input')
	popupAddBtn = document.querySelector('.accept')
	popupCloseBtn = document.querySelector('.cancel')
}

const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask)
	ulList.addEventListener('click', checkClick)
	popupCloseBtn.addEventListener('click', closePopup)
	popupAddBtn.addEventListener('click', changeToDoText)
    toDoInput.addEventListener('keyup', enterKeyCheck)
}

//* FUNCTIONS *//

const addNewTask = () => {
	if (toDoInput.value != '') {
		newToDo = document.createElement('li')
		newToDo.textContent = toDoInput.value
		ulList.append(newToDo)

		createToolsArea()

		toDoInput.value = ''
		errorInfo.textContent = ''
	} else {
		errorInfo.textContent = 'Wpisz treść zadania!'
	}
}
const createToolsArea = () => {
	const toolsPanel = document.createElement('div')
	toolsPanel.classList.add('tools')

	const completeBTN = document.createElement('button')
	completeBTN.classList.add('complete')
	completeBTN.innerHTML = '<i class="fas fa-check"></i>'

	const editBTN = document.createElement('button')
	editBTN.classList.add('edit')
	editBTN.textContent = 'EDIT'

	const deleteBTN = document.createElement('button')
	deleteBTN.classList.add('delete')
	deleteBTN.innerHTML = '<i class="fas fa-times"></i>'

	toolsPanel.append(completeBTN, editBTN, deleteBTN)
	newToDo.append(toolsPanel)
}

const checkClick = e => {
	if (e.target.matches('.complete')) {
		e.target.closest('li').classList.toggle('completed')
		e.target.classList.toggle('completed')
	} else if (e.target.matches('.edit')) {
		showPopup(e)
	} else if (e.target.matches('.delete')) {
		deleteToDo(e)
	}
}

const showPopup = e => {
	toDoToEdit = e.target.closest('li')
	popupInput.value = toDoToEdit.firstChild.textContent
	console.log(toDoToEdit.firstChild)
	popup.style.display = 'flex'
}
const closePopup = () => {
	popup.style.display = 'none'
	popupInfo.textContent = ''
}
const changeToDoText = () => {
	if (popupInput.value !== '') {
		toDoToEdit.firstChild.textContent = popupInput.value
		popup.style.display = 'none'
		popupInfo.textContent = ''
	} else {
		popupInfo.textContent = 'Musisz podać jakąś treść!'
	}
}
const deleteToDo = e => {
    e.target.closest('li').remove()

    const allToDos = ulList.querySelectorAll('li')
    if (allToDos.length === 0) {
        errorInfo.textContent = 'Brak zadań na liście.'
    }
}

const enterKeyCheck = e => {
    if(e.key === 'Enter')
    {
        addNewTask()
    }
}
//* EVENTS *//

document.addEventListener('DOMContentLoaded', main)
