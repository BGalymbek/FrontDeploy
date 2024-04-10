import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import AuthContext from '../context/AuthContext';

export default function MyBookings() {
    const {authTokens} =useContext(AuthContext)
    const [userBooking, setUserBooking] = useState('')
    const room = userBooking.room_number
    const floor= Math.round(room/100)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Выполняем GET запрос
                const getResponse = await axios.get('get-bookings/', {
                    headers: {
                        'Authorization': `Bearer ${authTokens.access}`,
                    }
                });

                const res = getResponse.data
                setUserBooking(res[0].seat_detail)
                console.log("Пользователь забронировал: ", res);
            } catch (error) {
                // Обработка ошибок
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Вызов функции для выполнения запроса при загрузке компонента
    }, []);

    const recognizeCorridorNum = ()=>{
        let num = room%100;
    }

    // let num = room%100;
    // if(){

    // }
  return (
    <div className='my-booking'>
        <Navbar/>
        <div className='my-booking-container'>
            <h1></h1>
            <h3></h3>
            <table>
                <tr>
                    <th>Block</th>
                    <th>Floor</th>
                    <th>Corridor</th>
                    <th>Room</th>
                    <th>Seat</th>
                </tr>
                <tr>
                    <td>{userBooking.block}-Block</td>
                    <td>{floor}- floor</td>
                    <td></td>
                    <td>{room}-room</td>
                    <td>{userBooking.seat_number}-seat</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total cost: 195 000 KZT</td>
                </tr>
            </table>
        </div>
        <footer></footer>
    </div>
  )
}
