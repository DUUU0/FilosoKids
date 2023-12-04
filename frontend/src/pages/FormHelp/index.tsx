import { useState, useEffect, FormEvent } from 'react';
import UserService from '../../services/UserService';
import { setupAPIClient } from '../../services/api';
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import Button from '../../components/Button';

function FormHelp() {

    const [showDropdown, setShowDropdown] = useState(false);

    const [nameUser, setNameUser] = useState("")

    const apiClient = setupAPIClient()

    const userService = new UserService()

    const [email, setEmail] = useState("")

    const [text, setText] = useState("")
    const [user_id, setUser_id] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setNameUser(response.data.name)
            setUser_id(response.data.id)

        }

        idUser()

    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (text == "" || email == "") {
            return toast.warning("Preencha todos os campos!")
        }
        try {
            const apiClient = setupAPIClient();

            const response = await apiClient.post('/sendForm', {
                text: text,
                user_id: user_id
            });

            if (response) {
                toast.success("Dúvida enviada!");
                navigate('/home/homeHelp')
            }
        } catch (error) {
            console.error("Erro ao enviar:", error);
            toast.warning("Erro ao enviar dúvida!.");
        }
    }

    return (
        <><header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link to="/home"><img src="/brain.svg" alt="" /></Link>
                <span>FilosoKids</span>
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

            <main className={styles.container}>

                <div className={styles.title}>
                    <h1>Formulário de dúvida</h1>
                    <hr color='black'></hr>
                </div>

                <form onSubmit={handleRegister}>
                    <div className={styles.email}>
                        <Input
                            type='text'
                            placeholder='Digite seu email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.textarea}>
                        <textarea
                            placeholder="Digite sua dúvida..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        >
                        </textarea>
                    </div>

                    <div className={styles.buttons}>

                        <div className={styles.buttonBack}>
                            <Link to="/home/homeHelp"><Button>Voltar</Button></Link>
                        </div>

                        <div className={styles.buttonSend}>
                            <Button type='submit'>Enviar</Button>
                        </div>

                    </div>

                </form>

            </main>

        </>
    )

}

export default FormHelp