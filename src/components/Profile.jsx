import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import classes from './Profile.module.css';


export const Profile = () => {
    const location = useLocation();
    const profileData = location.state?.profileData;
    const navigate = useNavigate();

    if (!profileData) {
        return <Navigate to="/"/>;
    }

    const agencies = async () =>{
        navigate('/my/agencies')
    }
    const tours = async () =>{
        navigate('/my/tours')
    }


    const formatDate = (dateString) => {
        if (!dateString) return 'Не заполнено';
        return new Date(dateString).toLocaleString();
    };

    const getValue = (value) => {
        return value || 'Не заполнено';
    }

    return (

        <div className={classes.layoutcontainer}>
            <header className={classes.topbar}>
                <button className={classes.logoutbtn}>Выйти</button>
            </header>

            <div className={classes.subheader}>

            </div>

            <div className={classes.maincontent}>
                <nav className={classes.sidemenu}>
                    <ul>
                        <li>
                            <button>Мои билеты</button>
                        </li>
                        <li>
                            <button onClick={tours}>Смотреть туры</button>
                        </li>
                        <li>
                            <button onClick={agencies}>Агентства</button>
                        </li>
                        <li>
                            <button>Служба поддержки</button>
                        </li>
                        <li>
                            <button>FAQ</button>
                        </li>
                    </ul>
                </nav>

                <div className={classes.profilesection}>
                    <div className={classes.profileheader}>
                        <h1>Информация профиля</h1>
                        <button className={classes.editbtn}>Редактировать</button>
                    </div>
                    <div className={classes.profileinfo}>
                        <div className={classes.infogroup}>
                            <h2>Основная информация</h2>
                            <div className={classes.infoitem}>
                                <label>Имя:</label>
                                <span>{getValue(profileData.firstName)}</span>
                            </div>
                            <div className={classes.infoitem}>
                                <label>Фамилия:</label>
                                <span>{getValue(profileData.lastName)}</span>
                            </div>
                            <div className={classes.infoitem}>
                                <label>Отчество:</label>
                                <span>{getValue(profileData.middleName)}</span>
                            </div>
                        </div>

                        <div className={classes.infogroup}>
                            <h2>Контактные данные</h2>
                            <div className={classes.infoitem}>
                                <label>Email:</label>
                                <span>{getValue(profileData.email)}</span>
                                <span className={classes.verificationstatus}>
                                <div
                                    className= {profileData.emailVerified ? classes.verified : classes.notverified}>
                                    {profileData.emailVerified ? '✓ Подтвержден' : '⚠ Не подтвержден'}
                                </div>
                            </span>
                            </div>
                            <div className={classes.infoitem}>
                                <label>Телефон:</label>
                                <span>{getValue(profileData.phone)}</span>
                                <span className={classes.verificationstatus}>
                                <div
                                    className={profileData.phoneVerified ? classes.verified : classes.notverified}>
                                    {profileData.phoneVerified ? '✓ Подтвержден' : '⚠ Не подтвержден'}
                                </div>
                            </span>
                            </div>
                        </div>

                        <div className={classes.infogroup}>
                            <h2>Паспортные данные</h2>
                            <div className={classes.infoitem}>
                                <label>Серия:</label>
                                <span>{getValue(profileData.passportSeries)}</span>
                            </div>
                            <div className={classes.infoitem}>
                                <label>Номер:</label>
                                <span>{getValue(profileData.passportNumber)}</span>
                            </div>
                        </div>

                        <div className={classes.infoitem}>
                            <label>Дата регистрации:</label>
                            <span>{formatDate(profileData.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};