import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"
import Input from '../../components/Input'
import Button from '../../components/Button'

interface PhaseProps {
    id: string
    number: number
}

interface AlternativeProps {
    letter: string
    text: string
    true_or_false: boolean
}

type AlternativesProps = {
    letter: string
    text: string
    true_or_false: boolean
}

function CreateQuestion() {

    const apiClient = setupAPIClient()

    const [text, setText] = useState('')
    const [textIfCorrect, setTextIfCorrect] = useState('')
    const [textIfIncorrect, setTextIfIncorrect] = useState('')
    const [number, setNumber] = useState<number>(0)

    const [phases, setPhases] = useState<PhaseProps[]>([])
    const [phaseSelected, setPhaseSelected] = useState(0)

    const [imageAvatar, setImageAvatar] = useState<File | null>(null)
    const [image_upper_right, setImage_upper_right] = useState<File | null>(null)
    const [image_bottom_right, setImage_bottom_right] = useState<File | null>(null)
    const [image_bottom_left, setImage_bottom_left] = useState<File | null>(null)

    const [list_Alternatives, setList_Alternatives] = useState<AlternativeProps[]>([])

    const [alternative_A, setAlternative_A] = useState<AlternativesProps>({ letter: 'A', text: '', true_or_false: false })
    const [alternative_B, setAlternative_B] = useState<AlternativesProps>({ letter: 'B', text: '', true_or_false: false })
    const [alternative_C, setAlternative_C] = useState<AlternativesProps>({ letter: 'C', text: '', true_or_false: false })
    const [alternative_D, setAlternative_D] = useState<AlternativesProps>({ letter: 'D', text: '', true_or_false: false })

    const [checkboxValueA, setCheckboxValueA] = useState(false)
    const [checkboxValueB, setCheckboxValueB] = useState(false)
    const [checkboxValueC, setCheckboxValueC] = useState(false)
    const [checkboxValueD, setCheckboxValueD] = useState(false)

    useEffect(() => {
        setList_Alternatives([alternative_A, alternative_B, alternative_C, alternative_D]);
    }, [alternative_A, alternative_B, alternative_C, alternative_D]);

    useEffect(() => {

        async function loadPhases() {

            const response = await apiClient.get("/phaseList")

            setPhases(response.data)
        }

        loadPhases()

    }, [])

    function handleChangePhase(e: any) {
        setPhaseSelected(e.target.value)
    }

    const addTextA = (text: string, valor: string) => {
        setAlternative_A({ ...alternative_A, [text]: valor, true_or_false: checkboxValueA })
    }

    const addTextB = (text: string, valor: string) => {
        setAlternative_B({ ...alternative_B, [text]: valor, true_or_false: checkboxValueB })
    }

    const addTextC = (text: string, valor: string) => {
        setAlternative_C({ ...alternative_C, [text]: valor, true_or_false: checkboxValueC })
    }

    const addTextD = (text: string, valor: string) => {
        setAlternative_D({ ...alternative_D, [text]: valor, true_or_false: checkboxValueD })
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

        console.log(imageAvatar);
        console.log(image_bottom_left);
        console.log(image_bottom_right);
        console.log(image_upper_right);

        const response = await apiClient.post('/createQuestion', {
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
        })

        console.log(response.data)

        toast.success("Cadastrado com sucesso!")

    }

    return (
        <main className={styles.container}>

            <h1>Cadastrar Questão</h1>

            <div className={styles.createQuestion}>

                <form onSubmit={handleRegister} encType='multipart/form-data'>

                    <select value={phaseSelected} onChange={handleChangePhase}>
                        {phases.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>{item.number}</option>
                            )
                        })}
                    </select>

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

                    <Input
                        placeholder='Digite a alternativa A...'
                        type='text'
                        value={alternative_A.text}
                        onChange={(e) => addTextA('text', e.target.value)}
                    />

                    <Input
                        name='A'
                        type='checkbox'
                        checked={checkboxValueA}
                        onChange={handleCheckboxChangeA}
                    />

                    <Input
                        placeholder='Digite a alternativa B...'
                        type='text'
                        value={alternative_B.text}
                        onChange={(e) => addTextB('text', e.target.value)}
                    />

                    <Input
                        name='B'
                        type='checkbox'
                        checked={checkboxValueB}
                        onChange={handleCheckboxChangeB}
                    />

                    <Input
                        placeholder='Digite a alternativa C...'
                        type='text'
                        value={alternative_C?.text}
                        onChange={(e) => addTextC('text', e.target.value)}
                    />

                    <Input
                        name='C'
                        type='checkbox'
                        checked={checkboxValueC}
                        onChange={handleCheckboxChangeC}
                    />

                    <Input
                        placeholder='Digite a alternativa D...'
                        type='text'
                        value={alternative_D?.text}
                        onChange={(e) => addTextD('text', e.target.value)}
                    />

                    <Input
                        name='D'
                        type='checkbox'
                        checked={checkboxValueD}
                        onChange={handleCheckboxChangeD}
                    />

                    <Input
                        type='file'
                        onChange={(e) => setImageAvatar(e.target.files ? e.target.files[0] : null)}
                    />

                    <Input
                        type='file'
                        onChange={(e) => setImage_bottom_left(e.target.files ? e.target.files[0] : null)}
                    />

                    <Input
                        type='file'
                        onChange={(e) => setImage_bottom_right(e.target.files ? e.target.files[0] : null)}
                    />

                    <Input
                        type='file'
                        onChange={(e) => setImage_upper_right(e.target.files ? e.target.files[0] : null)}
                    />

                    <Button type='submit'>Cadastar</Button>

                </form>
            </div>
        </main>
    )
}

export default CreateQuestion