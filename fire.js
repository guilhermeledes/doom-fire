const firePixelArray = []
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
let debug = false
let windDirection = -1
let fireWidth = 100
let fireHeight = 100
if (debug) {
	fireWidth = 25
	fireHeight = 15
}

function start() {
	createFireDataStructure()
	setInterval(calculateFirePropagation, 50)
}

function changeWindDirection() {
	windDirection *= -1
}

function toggleDebug() {
	if (debug) {
		fireWidth = 100
		fireHeight = 100
		debug = false
	} else {
		fireWidth = 25
		fireHeight = 15
		debug = true
	}
	createFireDataStructure()
}

function calculateFirePropagation() {
	for (let row = 0; row < fireHeight; row++) {
		for (let column = 0; column < fireWidth; column++) {
			let currentPixel = ( row * fireWidth ) + column
			let belowPixel = currentPixel + fireWidth

			if (belowPixel >= fireWidth * fireHeight) continue

			let decay = Math.floor(Math.random() * 3)
			let belowPixelFireIntensity = firePixelArray[belowPixel]
			let newFireIntensity = belowPixelFireIntensity - decay < 0 ? 0 : belowPixelFireIntensity - decay

			firePixelArray[currentPixel + decay * windDirection] = newFireIntensity
		}
	}
	renderCanvas()
}

function createFireDataStructure() {
	for (let currentPixel = 0; currentPixel < fireWidth * fireHeight; currentPixel++) {
		firePixelArray[currentPixel] = 0
	}
	createFireSource()
}

function renderCanvas() {
	html = '<table cellpadding="0" cellspacing="0">'

	for (let row = 0; row < fireHeight; row++) {
		html += '<tr>'

		for (let column = 0; column < fireWidth; column++) {
			let currentPixel = ( row * fireWidth ) + column
			let fireIntesity = firePixelArray[currentPixel]
			let color = fireColorsPalette[fireIntesity]
			let colorString = `${color.r},${color.g},${color.b}`

			if (debug === true) {
				html += `<td style="color: rgb(${colorString});">`
				html += `<div class="pixel-index">${currentPixel}</div>`
				html += `${fireIntesity}`
				html += '</td>'
			} else {
				html += `<td class="pixel" style="background-color: rgb(${colorString});"></td>`
			}

			
		}

		html += '</tr>'
	}

	html += '</table>'
	document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
	const overFlowPixelIndex = fireWidth * fireHeight

	for (let column = 0; column < fireWidth; column++) {
		const pixelIndex = (overFlowPixelIndex - fireWidth) + column

		firePixelArray[pixelIndex] = 36
	}
}

start()