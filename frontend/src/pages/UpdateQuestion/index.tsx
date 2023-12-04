import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"
import styles from './styles.module.scss'

interface PhaseProps {
    id: string
    number: number
}

interface AlternativeProps {
    id: string
    letter: string
    text: string
    true_or_false: boolean
}

type AlternativesProps = {
    id: string
    letter: string
    text: string
    true_or_false: boolean
}

function UpdateQuestion() {

    const apiClient = setupAPIClient()

    const navigate = useNavigate()

    const { id } = useParams()

    const [text, setText] = useState("")
    const [number, setNumber] = useState(0)
    const [textIfCorrect, setTextIfCorrect] = useState('')
    const [textIfIncorrect, setTextIfIncorrect] = useState('')

    const [phases, setPhases] = useState<PhaseProps[]>([])
    const [phaseSelected, setPhaseSelected] = useState(0)

    const [imageAvatar, setImageAvatar] = useState<File | null>(null)
    const [image_upper_right, setImage_upper_right] = useState<File | null>(null)
    const [image_bottom_right, setImage_bottom_right] = useState<File | null>(null)
    const [image_bottom_left, setImage_bottom_left] = useState<File | null>(null)

    const [list_Alternatives, setList_Alternatives] = useState<AlternativeProps[]>([])

    const [alternative_A, setAlternative_A] = useState<AlternativesProps>({ letter: 'A', text: '', true_or_false: false, id: '' })
    const [alternative_B, setAlternative_B] = useState<AlternativesProps>({ letter: 'B', text: '', true_or_false: false, id: '' })
    const [alternative_C, setAlternative_C] = useState<AlternativesProps>({ letter: 'C', text: '', true_or_false: false, id: '' })
    const [alternative_D, setAlternative_D] = useState<AlternativesProps>({ letter: 'D', text: '', true_or_false: false, id: '' })

    const [checkboxValueA, setCheckboxValueA] = useState(false)
    const [checkboxValueB, setCheckboxValueB] = useState(false)
    const [checkboxValueC, setCheckboxValueC] = useState(false)
    const [checkboxValueD, setCheckboxValueD] = useState(false)

    const [idAlternativeA, setIdAlternativeA] = useState('')
    const [idAlternativeB, setIdAlternativeB] = useState('')
    const [idAlternativeC, setIdAlternativeC] = useState('')
    const [idAlternativeD, setIdAlternativeD] = useState('')



    useEffect(() => {

        async function loadPhases() {

            const response = await apiClient.get("/phaseList")

            setPhases(response.data)
        }

        loadPhases()

    }, [])


    useEffect(() => {

        async function loadQuestion() {
            const response = await apiClient.get(`/listQuestion/${id}`)

            console.log(response.data.phase.number);


            setText(response.data.text)
            setNumber(response.data.number)
            setTextIfCorrect(response.data.text_if_correct)
            setTextIfIncorrect(response.data.text_if_incorrect)


            setAlternative_A(response.data.alternatives[0])
            setAlternative_B(response.data.alternatives[1])
            setAlternative_C(response.data.alternatives[2])
            setAlternative_D(response.data.alternatives[3])

            setCheckboxValueA(response.data.alternatives[0].true_or_false)
            setCheckboxValueB(response.data.alternatives[1].true_or_false)
            setCheckboxValueC(response.data.alternatives[2].true_or_false)
            setCheckboxValueD(response.data.alternatives[3].true_or_false)

            setImageAvatar(response.data.avatar)
            setImage_bottom_left(response.data.image_bottom_left)
            setImage_bottom_right(response.data.image_bottom_right)
            setImage_upper_right(response.data.image_upper_right)

            setIdAlternativeA(response.data.alternatives[0].id)
            setIdAlternativeB(response.data.alternatives[1].id)
            setIdAlternativeC(response.data.alternatives[2].id)
            setIdAlternativeD(response.data.alternatives[3].id)

        }

        loadQuestion()

    }, [id])

    useEffect(() => {
        setList_Alternatives([alternative_A, alternative_B, alternative_C, alternative_D]);
    }, [alternative_A, alternative_B, alternative_C, alternative_D]);

    function handleChangePhase(e: any) {
        setPhaseSelected(e.target.value)
    }

    const addTextA = (text: string, valor: string) => {
        setAlternative_A({ ...alternative_A, [text]: valor, true_or_false: checkboxValueA, id: idAlternativeA })
    }

    const addTextB = (text: string, valor: string) => {
        setAlternative_B({ ...alternative_B, [text]: valor, true_or_false: checkboxValueB, id: idAlternativeB })
    }

    const addTextC = (text: string, valor: string) => {
        setAlternative_C({ ...alternative_C, [text]: valor, true_or_false: checkboxValueC, id: idAlternativeC })
    }

    const addTextD = (text: string, valor: string) => {
        setAlternative_D({ ...alternative_D, [text]: valor, true_or_false: checkboxValueD, id: idAlternativeD })
    }

    const handleCheckboxChangeA = () => {
        setCheckboxValueA(!checkboxValueA)

        setAlternative_A({ ...alternative_A, true_or_false: !checkboxValueA });
    }

    const handleCheckboxChangeB = () => {
        setCheckboxValueB(!checkboxValueB)

        setAlternative_B({ ...alternative_B, true_or_false: !checkboxValueB });
    }

    const handleCheckboxChangeC = () => {
        setCheckboxValueC(!checkboxValueC)

        setAlternative_C({ ...alternative_C, true_or_false: !checkboxValueC });
    }

    const handleCheckboxChangeD = () => {
        setCheckboxValueD(!checkboxValueD)

        setAlternative_D({ ...alternative_D, true_or_false: !checkboxValueD });
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        const response = await apiClient.put(`/updateQuestion/${id}`, {
            text: text,
            number: number,
            text_if_correct: textIfCorrect,
            text_if_incorrect: textIfIncorrect,
            phase_id: phases[phaseSelected].id,
            list_alternatives: list_Alternatives,
            avatar: imageAvatar,
            image_bottom_left: image_bottom_left,
            image_bottom_right: image_bottom_right,
            image_upper_right: image_upper_right
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })


        if (response) {
            toast.success("Editado com sucesso!")
            navigate("/homeAdmin/updateRemoveQuestion")
        }

    }

    return (
        <main className={styles.main}>

            <div className={styles.title}>
                <h1>Editar Questão</h1>
            </div>


            <div className={styles.createQuestion}>

                <form onSubmit={handleRegister} encType='multipart/form-data'>

                    <div className={styles.phase}>
                        <span>Fase:</span>
                        <select value={phaseSelected} onChange={handleChangePhase}>
                            {phases.map((item, index) => {
                                return (
                                    <option key={item.id} value={index}>{item.number}</option>
                                )
                            })}
                        </select>
                    </div>

                    <Input
                        placeholder='Digite o texto da fase...'
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Input
                        placeholder='Digite o texto caso o usuário acerte...'
                        type='text'
                        value={textIfCorrect}
                        onChange={(e) => setTextIfCorrect(e.target.value)}
                    />

                    <Input
                        placeholder='Digite o texto caso o usuário erre...'
                        type='text'
                        value={textIfIncorrect}
                        onChange={(e) => setTextIfIncorrect(e.target.value)}
                    />

                    <Input
                        placeholder='Digite o numero da questão...'
                        type='text'
                        value={number}
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />


                    <div className={styles.alternative}>
                        <Input
                            placeholder='Digite a alternativa A...'
                            type='text'
                            value={alternative_A.text}
                            onChange={(e) => addTextA('text', e.target.value)} />
                        <Input
                            name='checbox'
                            type='radio'
                            checked={checkboxValueA}
                            onChange={handleCheckboxChangeA} />

                    </div>


                    <div className={styles.alternative}>

                        <Input
                            placeholder='Digite a alternativa B...'
                            type='text'
                            value={alternative_B.text}
                            onChange={(e) => addTextB('text', e.target.value)} />
                        <Input
                            name='checbox'
                            type='radio'
                            checked={checkboxValueB}
                            onChange={handleCheckboxChangeB} />

                    </div>

                    <div className={styles.alternative}>

                        <Input
                            placeholder='Digite a alternativa C...'
                            type='text'
                            value={alternative_C?.text}
                            onChange={(e) => addTextC('text', e.target.value)} />

                        <Input

                            name='checbox'
                            type='radio'
                            checked={checkboxValueC}
                            onChange={handleCheckboxChangeC} />

                    </div>


                    <div className={styles.alternative}>

                        <Input
                            placeholder='Digite a alternativa D...'
                            type='text'
                            value={alternative_D?.text}
                            onChange={(e) => addTextD('text', e.target.value)} />

                        <Input

                            name='checbox'
                            type='radio'
                            checked={checkboxValueD}
                            onChange={handleCheckboxChangeD} />

                    </div>

                    <div className={styles.avatar}>
                        <label htmlFor="">Avatar:</label>
                        <Input
                            type='file'
                            onChange={(e) => setImageAvatar(e.target.files ? e.target.files[0] : null)}
                            placeholder='Avatar' />
                    </div>


                    <div className={styles.supDir}>
                        <label htmlFor="">Imagem superior direita:</label>
                        <Input
                            type='file'
                            onChange={(e) => setImage_upper_right(e.target.files ? e.target.files[0] : null)} />
                    </div>


                    <div className={styles.infDir}>
                        <label htmlFor="">Imagem inferior direita:</label>
                        <Input
                            type='file'
                            onChange={(e) => setImage_bottom_right(e.target.files ? e.target.files[0] : null)} />
                    </div>


                    <div className={styles.infLeft}>
                        <label htmlFor="">Imagem inferior esquerda:</label>
                        <Input
                            type='file'
                            onChange={(e) => setImage_bottom_left(e.target.files ? e.target.files[0] : null)} />
                    </div>

                    <div className={styles.buttons}>

                        <Link to="/homeAdmin/UpdateRemoveQuestion" className={styles.backButton}><Button>Voltar</Button></Link>

                        <Button type='submit'>Editar</Button>

                    </div>


                </form>
            </div>
        </main>
    )
}

export default UpdateQuestion