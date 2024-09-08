import React, { useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Modal from 'react-modal';

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const DayCell = styled.div<{ isWeekend: boolean }>`
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  text-align: center;
  color: ${({ isWeekend }) => (isWeekend ? 'red' : 'black')};
  cursor: pointer;
`;

const HeaderCell = styled.div`
  font-weight: bold;
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
`;

const EventList = styled.div`
  margin-top: 5px;
  text-align: left;
`;

const EventItem = styled.div`
  background-color: #e7f3ff;
  margin: 3px 0;
  padding: 5px;
  border-radius: 3px;
`;

interface Event {
  id: number;
  date: string;
  title: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState<Event[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [eventTitle, setEventTitle] = useState('');

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const startDay = startOfMonth.startOf('week');
  const endDay = endOfMonth.endOf('week');

  const days = [];
  let day = startDay;

  while (day.isBefore(endDay)) {
    days.push(day);
    day = day.add(1, 'day');
  }

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const openModal = (date: string) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle('');
  };

  const addEvent = () => {
    if (eventTitle.trim() !== '') {
      const newEvent: Event = { id: events.length + 1, date: selectedDate, title: eventTitle };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div>
      <h2>{currentDate.format('YYYY年 MMMM')}</h2>
      <button onClick={goToPreviousMonth}>前の月</button>
      <button onClick={goToNextMonth}>次の月</button>
      <CalendarGrid>
        <HeaderCell>日</HeaderCell>
        <HeaderCell>月</HeaderCell>
        <HeaderCell>火</HeaderCell>
        <HeaderCell>水</HeaderCell>
        <HeaderCell>木</HeaderCell>
        <HeaderCell>金</HeaderCell>
        <HeaderCell>土</HeaderCell>
        {days.map((day) => (
          <DayCell
            key={day.format('YYYY-MM-DD')}
            isWeekend={day.day() === 0 || day.day() === 6}
            onClick={() => openModal(day.format('YYYY-MM-DD'))}
          >
            {day.date()}
            <EventList>
              {events.filter(event => event.date === day.format('YYYY-MM-DD')).map(event => (
                <EventItem key={event.id}>
                  {event.title} 
                  <button onClick={() => deleteEvent(event.id)} style={{ marginLeft: '10px' }}>削除</button>
                </EventItem>
              ))}
            </EventList>
          </DayCell>
        ))}
      </CalendarGrid>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>{selectedDate}の予定を追加</h2>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          placeholder="予定を入力"
        />
        <button onClick={addEvent}>追加</button>
        <button onClick={closeModal}>キャンセル</button>
      </Modal>
    </div>
  );
};

export default Calendar;
