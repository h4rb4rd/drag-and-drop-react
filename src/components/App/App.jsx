import React, { useState } from 'react'

const cards = [
	{ id: 1, order: 3, text: 'Карточка 3' },
	{ id: 2, order: 1, text: 'Карточка 1' },
	{ id: 3, order: 2, text: 'Карточка 2' },
	{ id: 4, order: 4, text: 'Карточка 4' },
]

const App = () => {
	const [cardList, setCardList] = useState(cards)
	const [currentCard, setCurrentCard] = useState(null)

	const dragStartHandler = card => {
		setCurrentCard(card)
	}

	const dragEndHandler = e => {
		e.target.style.background = 'white'
	}

	const dragOverHandler = e => {
		e.preventDefault()
		e.target.style.background = 'lightgray'
	}

	const dropHandler = (e, card) => {
		e.preventDefault()
		e.target.style.background = 'white'
		changeCardOrder(card)
	}

	const changeCardOrder = card => {
		const orderedCards = cardList.map(c => {
			if (c.id === card.id) {
				return { ...c, order: currentCard.order }
			}

			if (c.id === currentCard.id) {
				return { ...c, order: card.order }
			}
			return c
		})

		setCardList(orderedCards)
	}

	const sortCards = (a, b) => {
		if (a.order > b.order) {
			return 1
		} else {
			return -1
		}
	}

	return (
		<div className='app'>
			{cardList.sort(sortCards).map(card => {
				return (
					<div
						className='card'
						key={card.id}
						draggable={true}
						onDragStart={() => dragStartHandler(card)}
						onDragLeave={e => dragEndHandler(e)}
						onDragEnd={e => dragEndHandler(e)}
						onDragOver={e => dragOverHandler(e)}
						onDrop={e => dropHandler(e, card)}
					>
						{card.text}
					</div>
				)
			})}
		</div>
	)
}

export default App
