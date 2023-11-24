import { FormEvent, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import styles from './styles.module.scss';
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface QuestionProps {
    id: string;
    text: string;
    phase: {
        number: number;
        name: string;
    };
    alternatives: [
        {
            id: string;
            letter: string;
            text: string;
            true_or_false: boolean;
        }
    ];
}

function Questions() {
    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [alternativeSelected, setAlternativeSelected] = useState<string | null>(null);

    const [id, setId] = useState('')

    const apiClient = setupAPIClient();

    const navigate = useNavigate()

    useEffect(() => {
        async function loadQuestions() {

            const response = await apiClient.get("/listQuestions");
            setQuestions(response.data.slice(0, 1))

        }

        loadQuestions();
    }, []);

    function handleAlternativeSelection(alternativeId: string, question_id: string) {
        setAlternativeSelected(alternativeId);
        setId(question_id)
    }

    async function isCorrect(e: FormEvent) {
        e.preventDefault()

        

        const isCorrect = await apiClient.get("/isCorrect")

        if (isCorrect.data.alternatives[0].id === alternativeSelected) {
            toast.success("Correto!")
            setTimeout(() => {
                navigate(`textIfCorrect/${id}`)
            }, 2000)
        } else {
            toast.error("Errado!")
            setTimeout(() => {
                navigate(`textIfIncorrect/${id}`)
            }, 2000)
        }

    }

    return (
        <main className={styles.main}>
            {questions.map((question) => {
                return (
                    <div key={question.id} className={styles.question}>
                        <h1>{question.text}</h1>
                        <form className={styles.alt} onSubmit={isCorrect}>
                            {question.alternatives.map((alternative) => (
                                <div key={alternative.id} className={styles.alternative}>
                                    <button
                                        onClick={() => handleAlternativeSelection(alternative.id, question.id)}
                                    >
                                        {alternative.letter} {alternative.text}
                                    </button>
                                </div>
                            ))}
                        </form>
                        <Button type="submit">Avançar</Button>
                    </div>
                );
            })}
        </main>
    );
}

export default Questions;