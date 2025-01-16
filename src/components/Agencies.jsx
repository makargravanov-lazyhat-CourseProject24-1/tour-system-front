import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AgenciesPage.module.css';

export const AgenciesPage = () => {
    const [agencies, setAgencies] = useState([]);
    const [newAgencyName, setNewAgencyName] = useState('');
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const [bankAccounts, setBankAccounts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = async () => {
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/agency/my', {
                credentials: 'include'
            });
            const data = await response.json();
            setAgencies(data);

            // Инициализируем состояние для банковских счетов
            const initialBankAccounts = {};
            data.forEach(agency => {
                initialBankAccounts[agency.id] = '';
            });
            setBankAccounts(initialBankAccounts);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    const createAgency = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.lazyhat.ru/bff/api/v1/secured/agency/${newAgencyName}`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                setNewAgencyName('');
                setIsCreateFormVisible(false);
                fetchAgencies();
            }
        } catch (error) {
            console.error('Error creating agency:', error);
        }
    };

    const updateBankAccount = async (agencyId) => {
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/update-bank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    agencyId: agencyId,
                    bankAccountId: bankAccounts[agencyId]
                })
            });

            if (response.ok) {
                // Очищаем поле ввода после успешного обновления
                setBankAccounts(prev => ({
                    ...prev,
                    [agencyId]: ''
                }));
                alert('Банковский счет успешно обновлен');
            } else {
                alert('Ошибка при обновлении банковского счета');
            }
        } catch (error) {
            console.error('Error updating bank account:', error);
            alert('Ошибка при обновлении банковского счета');
        }
    };

    const handleBankAccountChange = (agencyId, value) => {
        setBankAccounts(prev => ({
            ...prev,
            [agencyId]: value
        }));
    };
    const agenciess = async () =>{
        navigate('/my/agencies')
    }
    const tours = async () =>{
        navigate('/tours')
    }
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };
    const tickets = async () =>{
        navigate('/tickets')
    }
    return (
        <div className={classes.layoutcontainer}>
            <header className={classes.topbar}>
                <button className={classes.logoutbtn}>Выйти</button>
            </header>

            <div className={classes.subheader}></div>

            <div className={classes.maincontent}>
                <nav className={classes.sidemenu}>
                    <ul>
                        <li>
                            <button onClick={tickets}>Мои билеты</button>
                        </li>
                        <li>
                            <button onClick={tours}>Смотреть туры</button>
                        </li>
                        <li>
                            <button onClick={agenciess}>Агентства</button>
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
                        <h1>Мои агентства</h1>
                        <button
                            className={classes.editbtn}
                            onClick={() => setIsCreateFormVisible(!isCreateFormVisible)}
                        >
                            Создать агентство
                        </button>
                    </div>

                    {isCreateFormVisible && (
                        <form onSubmit={createAgency} className={classes.createForm}>
                            <input
                                type="text"
                                value={newAgencyName}
                                onChange={(e) => setNewAgencyName(e.target.value)}
                                placeholder="Название агентства"
                                required
                            />
                            <button type="submit">Создать</button>
                        </form>
                    )}

                    <div className={classes.agenciesGrid}>
                        {agencies.length === 0 ? (
                            <p className={classes.noAgencies}>У вас нет агентств</p>
                        ) : (
                            agencies.map(agency => (
                                <div key={agency.id} className={classes.agencyCard}>
                                    <h2>{agency.name}</h2>
                                    <p>Создано: {formatDate(agency.createdAt)}</p>
                                    <div className={classes.bankAccountForm}>
                                        <input
                                            type="text"
                                            value={bankAccounts[agency.id]}
                                            onChange={(e) => handleBankAccountChange(agency.id, e.target.value)}
                                            placeholder="Номер банковского счета"
                                        />
                                        <button
                                            onClick={() => updateBankAccount(agency.id)}
                                            disabled={!bankAccounts[agency.id]}
                                        >
                                            Обновить счет
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};