import {Navigate, useLocation} from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
    const location = useLocation();
    const profileData = location.state?.profileData;
    let emailVerifiedColor = "#1ecd97"
    let phoneVerifiedColor = "#1ecd97"

    if (!profileData) {
        return <Navigate to="/"/>;
    }

    const formatDate = (dateString) => {

        if (!dateString) return 'Не заполнено';
        return new Date(dateString).toLocaleString();
    };

    const getValue = (value) => {
        if (profileData.emailVerified) {
            emailVerifiedColor = "#cd1e1e"
        }
        if (profileData.phoneVerified) {
            phoneVerifiedColor = "#cd1e1e"
        }
        return value || 'Не заполнено';
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Личный кабинет</h1>
                <div className="profile-info">
                    <div className="info-group">
                        <h2>Основная информация</h2>
                        <div className="info-item">
                            <label>Имя:</label>
                            <span>{getValue(profileData.firstName)}</span>
                        </div>
                        <div className="info-item">
                            <label>Фамилия:</label>
                            <span>{getValue(profileData.lastName)}</span>
                        </div>
                        <div className="info-item">
                            <label>Отчество:</label>
                            <span>{getValue(profileData.middleName)}</span>
                        </div>
                    </div>

                    <div className="info-group">
                        <h2>Контактные данные</h2>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{getValue(profileData.email)}</span>
                            <span className="verification-status">
                                <div className={"verification-status-data"} color={emailVerifiedColor}>
                                    {profileData.emailVerified ? '✓ Подтвержден' : '⚠ Не подтвержден'}
                                </div>
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Телефон:</label>
                            <span>{getValue(profileData.phone)}</span>
                            <span className="verification-status">
                                <div className={"verification-status-data"} color={phoneVerifiedColor}>
                                    {profileData.phoneVerified ? '✓ Подтвержден' : '⚠ Не подтвержден'}
                                </div>
                            </span>
                        </div>
                    </div>

                    <div className="info-group">
                        <h2>Паспортные данные</h2>
                        <div className="info-item">
                            <label>Серия:</label>
                            <span>{getValue(profileData.passportSeries)}</span>
                        </div>
                        <div className="info-item">
                            <label>Номер:</label>
                            <span>{getValue(profileData.passportNumber)}</span>
                        </div>
                    </div>

                    <div className="info-item">
                        <label>Дата регистрации:</label>
                        <span>{formatDate(profileData.createdAt)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};