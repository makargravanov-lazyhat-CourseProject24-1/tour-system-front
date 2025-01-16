import { useState, useEffect } from 'react';
import classes from './ToursPage.module.css';
import {useNavigate} from "react-router-dom";

export const ToursPage = () => {
    const [tours, setTours] = useState([]);
    const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
    const navigate = useNavigate();
    const [newTour, setNewTour] = useState({
        name: '',
        description: '',
        hotelId: '',
        roomId: '',
        nutritionId: '',
        startDate: '',
        endDate: '',
        personCount: '',
        agencyId: ''
    });

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/tours', {
                credentials: 'include'
            });
            const data = await response.json();
            setTours(data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };
    const agencies = async () =>{
        navigate('/my/agencies')
    }
    const tourrs = async () =>{
        navigate('/tours')
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const [isBooking, setIsBooking] = useState({});

    const bookTour = async (tour) => {
        setIsBooking(prev => ({ ...prev, [tour.id]: true }));
        try {
            const response = await fetch('https://api.lazyhat.ru/bff/api/v1/secured/regtour', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(tour)
            });

            if (response.ok) {
                alert('Тур успешно забронирован!');
            } else {
                alert('Ошибка при бронировании тура');
            }
        } catch (error) {
            console.error('Error booking tour:', error);
            alert('Ошибка при бронировании тура');
        } finally {
            setIsBooking(prev => ({ ...prev, [tour.id]: false }));
        }
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
                            <button onClick={tourrs}>Смотреть туры</button>
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
                    <div className={classes.toursGrid}>
                        {tours.length === 0 ? (
                            <p className={classes.noTours}>Туров не найдено</p>
                        ) : (
                            tours.map(tour => (
                                <div key={tour.id} className={classes.tourCard}>
                                    <h2>{tour.name}</h2>
                                    <p className={classes.description}>{tour.description}</p>
                                    <div className={classes.tourDetails}>
                                        <p>Даты: {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</p>
                                        <p>Количество человек: {tour.personCount}</p>
                                    </div>
                                    <div className={classes.tourMeta}>
                                        <span>ID отеля: {tour.hotelId}</span>
                                        <span>ID комнаты: {tour.roomId}</span>
                                        <span>ID питания: {tour.nutritionId}</span>
                                    </div>
                                    <button
                                        className={classes.bookButton}
                                        onClick={() => bookTour(tour)}
                                        disabled={isBooking[tour.id]}
                                    >
                                        {isBooking[tour.id] ? 'Бронирование...' : 'Забронировать билет'}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};