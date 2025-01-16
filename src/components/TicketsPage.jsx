import { useState, useEffect } from 'react';
import classes from './TicketsPage.module.css';
import { useNavigate } from "react-router-dom";

export const TicketsPage = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();
    const [paymentLinks, setPaymentLinks] = useState({});

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/my', {
                credentials: 'include'
            });
            const data = await response.json();
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const getPaymentLink = async (ticketId) => {
        try {
            const response = await fetch(`https://api.lazyhat.ru/bff/api/v1/secured/pay/${ticketId}`, {
                credentials: 'include'
            });
            const paymentLink = await response.text();
            setPaymentLinks(prev => ({
                ...prev,
                [ticketId]: paymentLink
            }));
        } catch (error) {
            console.error('Error getting payment link:', error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const openPaymentLink = (link) => {
        window.open(link, '_blank');
    };

    const agencies = async () => {
        navigate('/my/agencies')
    }
    const tours = async () => {
        navigate('/tours')
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
                    <div className={classes.ticketsGrid}>
                        {tickets.length === 0 ? (
                            <p className={classes.noTickets}>Билетов не найдено</p>
                        ) : (
                            tickets.map(ticket => (
                                <div key={ticket.id} className={classes.ticketCard}>
                                    <div className={classes.ticketHeader}>
                                        <h2>Билет #{ticket.id}</h2>
                                        <span className={ticket.status === 'PAYED' ? classes.paid : classes.unpaid}>
                                            {ticket.status === 'PAYED' ? 'Оплачено' : 'Не оплачено'}
                                        </span>
                                    </div>
                                    <div className={classes.ticketDetails}>
                                        <p>Тур ID: {ticket.tourId}</p>
                                        <p>Даты: {formatDate(ticket.startDate)} - {formatDate(ticket.endDate)}</p>
                                        <p>Стоимость тура: {ticket.tourCost}</p>
                                        {ticket.transportCost && <p>Стоимость транспорта: {ticket.transportCost}</p>}
                                        <p>Создан: {new Date(ticket.createdAt).toLocaleString()}</p>
                                    </div>
                                    {ticket.status !== 'PAYED' && !paymentLinks[ticket.id] && (
                                        <button
                                            className={classes.payButton}
                                            onClick={() => getPaymentLink(ticket.id)}
                                        >
                                            Получить ссылку на оплату
                                        </button>
                                    )}
                                    {paymentLinks[ticket.id] && (
                                        <button
                                            className={classes.payButton}
                                            onClick={() => openPaymentLink(paymentLinks[ticket.id])}
                                        >
                                            К оплате
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};