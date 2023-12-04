import { FormEvent, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import styles from './styles.module.scss';
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";

interface alternativesProps {
    id: string;
    letter: string;
    text: string;
    true_or_false: boolean;
}

interface QuestionProps {
    id: string;
    text: string;
    number: number;
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

    const [buttonClass, setButtonClass] = useState('');

    const [questions, setQuestions] = useState<QuestionProps[]>([]);
    const [alternativeSelected, setAlternativeSelected] = useState<string | null>(null);

    const { user_id } = useParams()

    const [question_id, setQuestion_id] = useState('')
    const [text, setText] = useState('')
    const [number, setNumber] = useState(0)
    const [list_alternatives, setList_alternatives] = useState<alternativesProps[]>([]);


    const apiClient = setupAPIClient();

    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);

    const [nameUser, setNameUser] = useState("")

    const [numberQuestion, setNumberQuestion] = useState(0)
    const [numberPhase, setNumberPhase] = useState(0)

    const [avatar, setAvatar] = useState("")
    const [imageSupDir, setImageSupDir] = useState("")
    const [imageInfDir, setImageInfDir] = useState("")
    const [imageInfEsq, setImageInfEsq] = useState("")

    const userService = new UserService()

    useEffect(() => {

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setNameUser(response.data.name)

        }

        idUser()

    }, [])

    useEffect(() => {

        if (!alternativeSelected) {
            return;
        }

        const selectedAlternative = list_alternatives.find(
            (alternative) => alternative.id === alternativeSelected
        );

        if (!selectedAlternative) {
            return;
        }

        if (selectedAlternative.true_or_false) {
            setButtonClass('green');
            // Restante do código
        } else {
            setButtonClass('red');
            // Restante do código
        }

        console.log(buttonClass);


    }, [])

    useEffect(() => {
        async function loadQuestions() {

            const response = await apiClient.get(`/userHasQuestions/${user_id}`);

            setNumberPhase(response.data.phase.number)
            setNumberQuestion(response.data.number)

            setQuestion_id(response.data.id);
            setText(response.data.text);
            setNumber(response.data.number);
            setList_alternatives(response.data.alternatives);
            setAvatar(response.data.avatar)
            setImageSupDir(response.data.image_upper_right)
            setImageInfDir(response.data.image_bottom_right)
            setImageInfEsq(response.data.image_bottom_left)

        }

        loadQuestions();

    }, [user_id]);

    function handleAlternativeSelection(alternativeId: string) {
        setAlternativeSelected(alternativeId);
    }

    async function isCorrect(e: FormEvent) {
        e.preventDefault()

        if (!alternativeSelected) {
            return;
        }

        const selectedAlternative = list_alternatives.find(
            (alternative) => alternative.id === alternativeSelected
        );

        if (!selectedAlternative) {
            return;
        }

        if (selectedAlternative.true_or_false) {
            toast.success("Correto!");
            setButtonClass('green');

            setTimeout(() => {
                navigate(`/home/questions/textIfCorrect/${question_id}`);
            }, 1000);

        } else {
            toast.error("Errado!");
            setButtonClass('red');

            setTimeout(() => {
                navigate(`/home/questions/textIfIncorrect/${question_id}`);
            }, 1000);

        }

    }

    const url = `http://localhost:3333/files/`;

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link to="/home"><img src="/brain.svg" alt="" /></Link>
                    <span>FilosoKids</span>
                </div>
                <div className={styles.center}>
                    <p>Fase: {numberPhase}</p>
                    <p>Questão: {numberQuestion}</p>
                </div>
                <nav className={styles.headerNav}>
                    <img src="/menu.svg" alt="" onClick={() => setShowDropdown(!showDropdown)} />
                    <div className={styles.dropdown} style={{ display: showDropdown ? 'block' : 'none' }}>
                        <div className={styles.user}>
                            <img src="/user (2).svg" alt="" />
                            <span>{nameUser}</span>
                        </div>
                        <Link to="/home/homeHelp"><button>Ajuda</button></Link>
                        <Link to=""><button onClick={userService.logOut}>Sair</button></Link>

                    </div>
                </nav>
            </header>

            <main className={styles.main}>

                <div className={styles.question}>
                    <div className={styles.text}>
                        <p>{text}</p>
                    </div>

                    <div className={styles.container}>

                        <div className={styles.avatarContainer}>
                            <img src={url + avatar} alt="" className={styles.avatar} />
                        </div>

                        <div className={styles.imageSupDir}>
                            <img src={url + imageSupDir} alt="" className={styles.supDir} />
                        </div>

                        <div className={styles.imageInfDir}>
                            <img src={url + imageInfDir} alt="" className={styles.infDir} />
                        </div>

                        <div className={styles.imageInfEsq}>
                            <img src={url + imageInfEsq} alt="" className={styles.infEsq} />
                        </div>

                        <div className={`${styles.alternatives} ${buttonClass}`}>
                            {list_alternatives.map((alternative) => (
                                <div key={alternative.id} className={styles.alternative}>
                                    <button
                                        onClick={() => handleAlternativeSelection(alternative.id)}
                                        className={`${styles.alternativeButton} ${buttonClass}`}
                                    >
                                        <span> {alternative.letter} </span>{alternative.text}
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>


                </div>

                <div className={styles.button}>
                    <input type="submit" onClick={isCorrect} value="Avançar" />
                </div>



            </main>
        </>
    );
}

export default Questions;
