import React, { useEffect, useState } from "react";
import "./Game.css"
import Modal from "./Modal";

const Game = ({question, nextQuestion, finishGame, quitGame}) => {
    const [answer, setAnswer] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const quit = {
        quit: true,
    }

    const toggleModal = () => { setShowModal(!showModal)};

    useEffect(() => {
        setShowAnswer(false)
        setAnswer(null)
    }, [question])

    return (
        <>
        {question && 
        <div className="game shadow">
            {showModal && (<Modal> 
                    <div className="final shadow">
                        Je li to vaš konačan odgovor?
                        <div className="btns">
                            <div className="final-btn shadow"
                                onClick={() => {setShowAnswer(true)
                                    toggleModal(showModal)
                                }}
                            >
                                Da
                            </div>
                            <div className="final-btn shadow"
                                onClick={toggleModal}
                            >
                                Ne  
                            </div>
                        </div>
                    </div>
                </Modal>)}
            <div className="question shadow">
                {question.question}
            </div>
            <div className="answers">
                {question?.answers.map((a) => (
                    <div 
                    className={
                        (answer?.label == a.label ? 
                            "answer shadow selected" : 
                            "answer shadow")
                        + (showAnswer ? a.correct ? " correct disabled " : " disabled " : "")
                    }
                    onClick={() => {
                        !showAnswer && setAnswer(a); 
                        !showAnswer && toggleModal()
                    }}
                    >
                        {a.label}
                    </div>
                ))}
            </div>
            <div className={
                    (answer?.quit == true ? "answer selected shadow" : "answer shadow") +
                    (showAnswer ? " disabled" : "")
                }
                onClick={() => 
                    {!showAnswer && setAnswer(quit); 
                    {!showAnswer && toggleModal()}
                }}
            >
                Odustajem
            </div>
            {showAnswer && (
                (answer.correct) ? 
                <div className="answer shadow"
                    onClick={nextQuestion}
                >
                    Sljedeće pitanje
                </div> 
                : 
                <div className="answer shadow"
                    onClick={ 
                        (answer.quit ? quitGame : finishGame)
                    }
                >
                    Završi igru
                </div> 
            )}
            {/*answer != undefined &&
            <div className="answer final shadow"
                onClick={() => setShowAnswer(true)}
            >
                Konačan odgovor
            </div>*/}
            <div className="jokers">
                
            </div>
        </div>
        }
        </>
    );
}

export default Game;