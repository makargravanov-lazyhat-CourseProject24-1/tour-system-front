import {useEffect, useState} from 'react';
import classes from './LogReg.module.css';
import {useNavigate} from "react-router-dom";

export const LogReg = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    });
    const [registerFormData, setRegisterFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [displayedText, setDisplayedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const navigate = useNavigate();
    const fullText = "М ы собрали лучшие практики, чтобы предоставить пользователям и предпринимателям наилучший опыт пользования нашими сервисами. Наша команда неустанно трудится над улучшением качества обслуживания, чтобы наш продукт был лучшим на рынке. Каждый день мы стремимся к инновациям и совершенствованию, чтобы адаптироваться к вашим потребностям и ожиданиям. Мы рады приветствовать Вас на нашем портале для планирования путешествий! Перед началом остался лишь один шаг...";

    useEffect(() => {
        let index = 0;
        let flag = false;
        const typingInterval = setInterval(async () => {
            if (index < fullText.length - 1) {
                setDisplayedText((prev) => prev + fullText[index]);
                setCursorVisible((prev) => !prev);
                index++;
            } else {
                clearInterval(typingInterval);
                flag = true;
            }
        }, 3);

        const cursorBlinkInterval = setInterval(async () => {
            if (flag) {
                setCursorVisible((prev) => !prev);
            }
        }, 500);

        return () => {
            clearInterval(typingInterval);
            clearInterval(cursorBlinkInterval);
        };
    }, []);

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    const handleJoinClick = () => {
        setIsFormVisible(true);
    };

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const validateForm = () => {
        const newErrors = {
            firstName: registerFormData.firstName.length < 2,
            lastName: registerFormData.lastName.length < 2,
            email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerFormData.email),
            password: registerFormData.password.length < 6
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            alert('Пожалуйста, исправьте ошибки в форме');
            return;
        }

        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/open/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerFormData)
            });

            if (response.ok) {
                setShowSuccessModal(true);
            } else {
                alert('Ошибка при регистрации');
            }
        } catch (error) {
            alert('Ошибка при отправке данных');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/open/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginFormData),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const profileResponse = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/profile/my', {
                    credentials: 'include'
                });

                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    navigate('/my/profile', { state: { profileData } });
                }
            } else {
                alert('Ошибка при входе');
            }
        } catch (error) {
            alert('Ошибка при отправке данных');
        }
    };

    const getInputStyle = (fieldName) => ({
        borderColor: errors[fieldName] ? 'red' : '#1ecd97'
    });


    return (
        <div>
            <div className={classes.background}>
            </div>
            {!isFormVisible && (
                <div className={classes.container}>
                    <div className={classes.jettours}>Напишите свою историю вместе с JetTours</div>
                    <div className={classes.typingtext}>
                        {displayedText}
                        <div className={classes.cursor}>
                        <span className={cursorVisible ? classes.cursor.visible : ''}>|</span>
                        </div>
                    </div>
                    <button className={classes.joinbutton} onClick={handleJoinClick}>Присоединиться</button>
                </div>
            )}
            {isFormVisible && (
                <div className={classes.container}>
                    {isRegistering ? (
                        <div className={classes.registerform}>
                            <div className={classes.jettours}>Регистрация</div>
                            <input
                                type="text"
                                placeholder="Имя"
                                style={getInputStyle('firstName')}
                                value={registerFormData.firstName}
                                onChange={(e) => {
                                    setRegisterFormData({
                                        ...registerFormData,
                                        firstName: e.target.value
                                    });
                                    setErrors({...errors, firstName: false});
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Фамилия"
                                style={getInputStyle('lastName')}
                                value={registerFormData.lastName}
                                onChange={(e) => {
                                    setRegisterFormData({
                                        ...registerFormData,
                                        lastName: e.target.value
                                    });
                                    setErrors({...errors, lastName: false});
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                style={getInputStyle('email')}
                                value={registerFormData.email}
                                onChange={(e) => {
                                    setRegisterFormData({
                                        ...registerFormData,
                                        email: e.target.value
                                    });
                                    setErrors({...errors, email: false});
                                }}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                style={getInputStyle('password')}
                                value={registerFormData.password}
                                onChange={(e) => {
                                    setRegisterFormData({
                                        ...registerFormData,
                                        password: e.target.value
                                    });
                                    setErrors({...errors, password: false});
                                }}
                            />
                            <button onClick={handleRegister}>Зарегистрироваться</button>
                            <button onClick={toggleForm}>Уже есть аккаунт? Войти</button>
                        </div>
                    ) : (
                        <div className={classes.loginform}>
                            <div className={classes.jettours}>Вход</div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={loginFormData.email}
                                onChange={(e) => setLoginFormData({...loginFormData, email: e.target.value})}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={loginFormData.password}
                                onChange={(e) => setLoginFormData({...loginFormData, password: e.target.value})}
                            />
                            <button onClick={handleLogin}>Войти</button>
                            <button onClick={toggleForm}>Нет аккаунта? Зарегистрироваться</button>
                        </div>
                    )}
                </div>
            )}
            {showSuccessModal && (
                <div className={classes.modal}>
                    <div className={classes.modalcontent}>
                        <h2>Регистрация успешна!</h2>
                        <button onClick={() => {
                            setShowSuccessModal(false);
                            setIsRegistering(false);
                        }}>
                            Войти
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};