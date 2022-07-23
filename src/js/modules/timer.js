function timer(id, deadline) {

    function getTimeRemaining (endtime) { //получаем ост время
        const t = Date.parse(endtime) - Date.parse(new Date()),  //date.parse а не просто date, потому что это болле целенаправленный метод и чаще применяется, хотя по сути одно и тоже
              day = Math.floor(t / (1000 * 60 * 60 * 24)), //математические операции
              hour = Math.floor((t / (1000 * 60 * 60)) % 24),
              minute = Math.floor((t / (1000 * 60)) % 60),
              second = Math.floor((t / 1000) % 60);
        
        return {
            'total': t, 
            'day': day,
            'hour': hour,
            'minute': minute,
            'second': second
        };
    }

    function addZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }  
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock(); //setInterval сработает только через 1 сек и чтобы не ждать мы инициализируем функцию  updateClock()

        function updateClock() {
            const timeRemaining = getTimeRemaining(endtime);
            
            days.innerHTML = addZero(timeRemaining.day);
            hours.innerHTML = addZero(timeRemaining.hour);
            minutes.innerHTML = addZero(timeRemaining.minute);
            seconds.innerHTML = addZero(timeRemaining.second);

            if (timeRemaining.total <= 0) {
                clearInterval(timeInterval); //когда время выйдет, таймер не обновляем
                days.innerHTML = '00'; 
                hours.innerHTML = '00';
                minutes.innerHTML = '00'; 
                seconds.innerHTML = '00';
            }
        }
    }

    setClock(id, deadline);
}
export default timer;