import { useState } from 'react';
import styles from './styles.module.scss'
import Button from '../../components/Button';
import { Link } from 'react-router-dom';

const buttonNames: string[] = [
    'Nome de usuário indisponível.',
    'Esqueci a senha, e agora?',
    'O que é apelido?',
];

const explanations: string[] = [
    'O seu nome de usuário já foi utilizado por outra pessoa, você terá que usar outro nome!',
    'Caso não lembre da sua senha você pode criar outra conta.',
    'É o nome que será atribuido a você no jogo.',
];

function HelpLogin() {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const handleButtonClick = (index: number) => {
        setSelectedButton(selectedButton === index ? null : index);
    };

    return (
        <div className={styles.helpPage}>
            <h1>Perguntas frequentes</h1>
            <hr color='black' />
            <div className={styles.buttonContainer}>
                {buttonNames.map((buttonName, index) => (
                    <div key={index} className={styles.buttons}>
                        <button onClick={() => handleButtonClick(index)}>
                            {buttonName} <img src="/arrow-down (2).svg" className={styles.arrowIcon} />
                        </button>
                        {selectedButton === index && (
                            <div className={styles.explanation}>
                                <p>{explanations[index]}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.buttonBack}>
                <Link to="/"><Button>Voltar</Button></Link>
            </div>
        </div>
    );

}

export default HelpLogin