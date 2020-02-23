// Master variable
let countdown
// All the selectors 
let timerShow = document.querySelector('.display__time-left')
let endTime = document.querySelector('.display__end-time')
let buttons = document.querySelectorAll('[data-time]')


//Timer function
function timer(seconds) {
	//clear any timers before if exists
	clearInterval(countdown)
	const now = Date.now()
	const then = now + seconds * 1000
	showTimeLeft(seconds)
	countdown = setInterval(() => {
		const timeLeft = Math.round((then - Date.now()) / 1000)
		//check if we need to stop the interval
		if (timeLeft < 0) {
			clearInterval(countdown)
			return
		}
		//display
		showTimeLeft(timeLeft)
		showEndTime(then)
	}, 1000)
}

//Time left function
function showTimeLeft(seconds) {
	const remainderSec = seconds % 60
	const minutes = Math.floor(seconds / 60)
	const remainderMins = minutes % 60
	const hours = Math.floor(minutes / 60)
	const display = `${hours < 10 ? '0' : ''}${hours}:${remainderMins < 10 ? '0' : ''}${remainderMins}:${remainderSec < 10 ? '0' : ''}${remainderSec}`
	timerShow.textContent = display
}

//End time function displayed bottom
function showEndTime(timestamp) {
	const end = new Date(timestamp)
	const endHours = end.getHours()
	const endMinutes = end.getMinutes()
	endTime.textContent = `At ${endHours < 10 ? '0' : ''}${endHours}:${endMinutes < 10 ? '0' : ''}${endMinutes}`
}

//Start timer
function startTimer() {
	const seconds = parseInt(this.dataset.time)
	timer(seconds)
}
buttons.forEach(button => button.addEventListener('click', startTimer))

// Custom submit minutes

document.customForm.addEventListener('submit', function (event) {
	event.preventDefault()
	const minutes = this.minutes.value
	timer(minutes * 60)
	this.reset()
})