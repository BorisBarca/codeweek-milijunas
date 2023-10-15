import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Game from './Game';
import questions from './questions';

const App = () => {
	const [questionNumber, setQuestionNumber] = useState(1);
	const [finished, setFinished] = useState(false)
	const [questionId, setQuestionId] = useState(0)
	const moneyTree = useMemo(
		() => [
			{id: 1, value: "10 €"},
			{id: 2, value: "20 €"},
			{id: 3, value: "50 €"},
			{id: 4, value: "100 €"},
			{id: 5, value: "150 €"},
			{id: 6, value: "300 €"},
			{id: 7, value: "600 €"},
			{id: 8, value: "1.000 €"},
			{id: 9, value: "2.500 €"},
			{id: 10, value: "5.000 €"},
			{id: 11, value: "10.000 €"},
			{id: 12, value: "18.000 €"},
			{id: 13, value: "34.000 €"},
			{id: 14, value: "68.000 €"},
			{id: 15, value: "150.000 €"},
		].reverse(), []
	);
	const nextQuestion = () => {
		questionNumber == 15 ? finishGame() : setQuestionNumber(questionNumber + 1)
	}

	const finishGame = () => {
		setQuestionNumber(questionNumber => Math.floor(questionNumber / 5) * 5);
		setFinished(true)
	}

	const quitGame = () => {
		setQuestionNumber(questionNumber => questionNumber - 1);
		setFinished(true)
	}

	const restartGame = () => {
		setQuestionNumber(1)
		setFinished(false)
	}

	const randomRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	useEffect(() => {
		if (questionNumber <= questions?.length) {
			setQuestionId(randomRange(0, questions[questionNumber - 1]?.length - 1))
		}
	}, [questionNumber])
	
	return (
		<div className="App">
			{finished || questionNumber > questions?.length ? 
				<div className="game">
					<div className="question shadow">
						{questionNumber == 0 ? "Nažalost, niste osvojili ništa."
						:
						`Čestitamo, osvojili ste ${moneyTree[15 - questionNumber].value}.`
						}
					</div> 
					<div className="answer shadow"
						onClick={restartGame}
					>
						Nova igra
					</div>
				</div> : <Game 
					question={questions[questionNumber - 1][questionId]} 
					nextQuestion={nextQuestion}
					finishGame={finishGame}
					quitGame={quitGame}
				/>
			}
			<div className="moneyTree">
				<ul className="moneyList shadow">
					{moneyTree.map((m) => (
						<li className={
							questionNumber === m.id ? 
							"moneyListItem shadow current" : "moneyListItem"
						} >
							<span className={
								m.id % 5 == 0 || m.id == questionNumber ?
								"moneyListNumber white" : "moneyListNumber" 
							}>
								{m.id}
							</span>
							<span className={m.id < questionNumber ? "square solved" : "square"} />
							<span className={
								m.id % 5 == 0 || m.id == questionNumber ?
								"moneyListAmount white" : "moneyListAmount" 
							}>
								{m.value}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default App;
