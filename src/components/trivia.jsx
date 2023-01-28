import React, { useEffect, useState } from "react";
import useSound from "use-sound";

import play from "../assets/src_sounds_play.mp3"
import correct from "../assets/src_sounds_correct.mp3"
import wait from "../assets/src_sounds_wait.mp3"
import wrong from "../assets/src_sounds_wrong.mp3"

export default function Trivia({data,setStop,questionNumber,setQuestionNumber}){
    const [question,setQuestion]=useState(null);
    const [selectedAnswer,setSelectedAnswer]=useState(null);
    const [className,setClassName]=useState("answer");
    const [letsPlay]=useSound(play);
    const [correctAnswer]=useSound(correct);
    const [wrongAnswer]=useSound(wrong);

    useEffect(()=>{
        letsPlay();
    },[letsPlay]);

    useEffect(()=>{
        setQuestion(data[questionNumber-1]);
    },[data,questionNumber]);

    const handleClick=(a)=>{
        setSelectedAnswer(a);
        setClassName("answer active");
        setTimeout(()=>{
            setClassName(a.correct? "answer correct": "answer wrong")
        },1000);
        setTimeout(()=>{
            if(a.correct){
                correctAnswer();
                setTimeout(() => {
                    setQuestionNumber((prev)=>prev+1);
                    setSelectedAnswer(null);
                }, 3000);
                
            }
            else{
                wrongAnswer();
                setTimeout(() => {
                    setStop(true);
                }, 3000);
                
            }
        },2000);
    }

    return(
        <div className="trivia">
            <div className="question">{question?.question}</div>
            
            <div className="answers">
            {question?.answers.map((a)=>(
                <div className={selectedAnswer === a ? className : "answer"} onClick={()=>handleClick(a)}>{a.text}</div>
            ))}
                
            </div>
        </div>
    );
}