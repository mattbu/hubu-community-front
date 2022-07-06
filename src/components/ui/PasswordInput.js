import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../scss/ui/PasswordInput.module.scss'

function PasswordInput({ password, passwordCheck, setPassword, setPasswordCheck }) {
    const [validatePW, setValidatePW] = useState(null);

    const passwordValidator = () => {
        if (password !== '' && passwordCheck !== '' && (password === passwordCheck)) {
            setValidatePW(true)
        } else if (password !== '' && passwordCheck !== '' && (password !== passwordCheck)){
            setValidatePW(false)
        } else {
            setValidatePW(null)
        }
    }

    const inputChange = (e) => {
        const {target: {name, value}} = e
        switch (name) {
            case 'password':
                setPassword(value)
                break
            case 'password-check':
                setPasswordCheck(value)
                break
            default:
        }
    }

    useEffect(() => {
        passwordValidator()
    }, [password, passwordCheck])

    return (
        <>
            <label htmlFor="password-input" className={'mt-3'}>비밀번호</label>
            <input
                name="password"
                id="password-input"
                type="password"
                placeholder="비밀번호를 6자리 이상 입력해 주세요."
                className={validatePW ? styles.validInput : validatePW === null ? null : styles.invalidInput}
                value={password}
                onChange={inputChange}
            />
            <label htmlFor="password-check-input" className={'mt-3'}>비밀번호 확인</label>
            <input
                name="password-check"
                id="password-check-input"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해 주세요."
                className={validatePW ? styles.validInput : validatePW === null ? null : styles.invalidInput}
                value={passwordCheck}
                onChange={inputChange}
            />
            {
                validatePW ? 
                <p className={styles.valid}>동일한 비밀번호 입니다!</p> :
                validatePW === null ? 
                null :
                <p className={styles.invalid}>동일한 비밀번호를 입력해 주세요.</p>
            }
        </>
    )
}

export default PasswordInput