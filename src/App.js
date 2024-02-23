import React from 'react';
import './App.css';

///////РЕАКТ-ТРЕНАЖЁР:


/////////////УРОВЕНЬ 1////////


//ТРЕНАЖЁР:

//1 УРОВЕНЬ:


//А) ЗАЧЕМ НУЖНЫ ПРОПСЫ?????
  /*  
const users = [
  {name:'Алиса',    old:25}, 
  {name:'Базилио',  old:30}, 
  {name:'Буратино', old:5}
];

function Bild() {  
   
      return (
        <div>
          {users.map((item, index) => (
            <h1 key={index}>Привет, {item.name} {item.old}</h1>
          ))}
        </div>
      );
    }

  
    function App() {     
      return (
        <div>
          <Bild />
         </div>
      );
    }

    
    export default App  
*/   


//Б) Ввод адреса почты + Alert:
/*
function App() {

const customMail = useRef(null)  

const handleButton = () => {
  const emailValue = customMail.current.value; // Получаем значение из поля input
    alert(`Сообщение отправлено на адрес ${emailValue}`); // Выводим alert с полученным значением
    customMail.current.value = ''; // Очищаем поле input
}
    return (
      <>
        <label htmlFor='email'>Введите email:</label>
        <input type='email' id='email' ref={customMail}></input>
        <button onClick={handleButton}>Отправить</button>
      </>
    )
  }

  export default App  
*/

//вариант с очисткой поля:
/*
function App() {
  const customMail = useRef(null);

  const handleButton = () => {
    const email = customMail.current.value;

//тайм-аут нужен т.к. алерт блокирует код. Т.е. алерт успел запомнить кастомное значение емейла, но его выполнение поставили на паузу на 10мс, очистили инпут и только потом вывели алерт. Поэтому лучше использовать кастомное модальное окно - там такого нет.    
    setTimeout(() => {
        alert(`Сообщение отправлено на адрес ${email}`);
    }, 10);

    customMail.current.value = '';

};
  return (
    <>
    <form>
      <label htmlFor='email'>Введите email:</label>
      <input type='email' id='email' ref={customMail} />
      <button onClick={handleButton}>Отправить</button>
      </form>
    </>
  );
}

export default App;
*/






/*
//1.6: Реализуйте компонент StaredRating — рейтинг из пяти звёздочек. На вход подаётся число-рейтинг (от 1 до 5), в зависимости от которого часть звёздочек остаётся пустыми, а часть — закрашивается.

//Выставление звёздочек фильмам (с помощью псевдо-элемента css-after и пропса rate)
//ИДЕАЛЬНЫЙ ПРИМЕР ПРОПСА (ПЕРЕСКОКИ ЗНАЧЕНИЙ ТУДЫ-СЮДЫ ОПРАВДАНЫ)):

function StaredRating({rate}) {  //деструктуризированный пропс rate передаётся в дочерний StaredRating из родительского App
  return ( <div className="rating">
     <span className={`star ${rate >= 1 ? 'checked' : ''}`}></span>
     <span className={`star ${rate >= 2 ? 'checked' : ''}`}></span>
     <span className={`star ${rate >= 3 ? 'checked' : ''}`}></span>
     <span className={`star ${rate >= 4 ? 'checked' : ''}`}></span>
     <span className={`star ${rate >= 5 ? 'checked' : ''}`}></span>
   </div> )
 }

//в родительском App конкретизируется значение пропса rate для каждой строчки:
function App() { 
     return (
     <>
     <h3 class="title">Зеленая миля</h3>
     <StaredRating rate={4} />  
     <h3 class="title">Стражи Галактики</h3>
     <StaredRating rate={3} />
   </>
     )
 }
export default App;
*/



//1.7. Реализуйте вывод на страницу координат курсора мышки в реальном времени. Для этого необходимо в компонент MouseDetector добавить логику по отслеживанию мышки:

//ОТСЛЕЖИВАНИЕ КООРДИНАТ МЫШИ:
/*
import { useState } from 'react';

function App() {
 
 const [mouse, setMouse] = useState({x:0, y:0})  //начальное значение переменной mouse МОЖЕТ БЫТЬ ЧЕМ УГОДНО - массивом и ОБЪЕКТОМ в том числе. Это надо задавать внутри useState
 
   
 const handleMouseMove = (e) => {  //обработчик движения мыши
   setMouse({x: e.pageX, y: e.pageY})  //pageX и pageY - свойства содержащие координаты
   //Координаты pageX и pageY измеряются относительно левого верхнего угла документа, с учетом прокрутки.
 }
 
  return (
     <div
       className='cords'
       onMouseMove={handleMouseMove}  //onMouseMove - событие, фиксирующее движение мыши (привязываем всё конкретно к курсору)
     > 

     
       {`x: ${mouse.x}px, y: ${mouse.y}px`  }  
     </div>
   )
 } //- тут уже идёт ссылка на поля именно объекта mouse

export default App;
*










/////////////УРОВЕНЬ 2////////
//2.1. Дополнить компонент Notification так, чтобы в зависимости от типа (info, warning и error) уведомление имело разный фон, заголовок и выводило соответствующую иконку (из ✔️⚠️⛔️ ). Тип может и отсутствовать, тогда заголовка и иконки быть не должно, а цвет должен отличаться от info, warning и error:
/*
import PropTypes from 'prop-types';


class Notification extends React.Component {
  render() {
    const { type, message } = this.props
    return <div className={`notification ${type}`}>
      <span className="icon">
        {
          type === 'warning'
          ? '⚠️'
          : type === 'info'
            ? '✔️'
            : type === 'error'
              ? '⛔️'
              : ''
        }
      </span>
      <h2 className={`title ${type}`}>
        {
          type === 'warning'
          ? 'Warning'
          : type === 'info'
            ? 'For your information'
            : type === 'error'
              ? 'Error'
              : ''
        }
      </h2>
      <p className={`message ${type}`}>{message}</p>
    </div>
  }
}

class App extends React.Component {
  render() {
    return <>
        <Notification type='info' message='Status updated' />
        <Notification type='warning' message='Be sure to precompile your scripts' />
        <Notification type='error' message='Something went wrong' />
        <Notification type='' message='New feature were added' />
      </>
  }
}

Notification.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error']),  // метод oneOf указывает, что свойство должно быть одним из определенных значений в массиве. 
  message: PropTypes.string
}

export default App
*/




//2.2. Реализуйте фильтруемый список: в поле ввода пользователь набирает начало фразы или слова, и среди списка элементов отображаются только те, что начинаются с содержимого. Если таких элементов нет, то отображается соответствующая надпись:
/*
import PropTypes from 'prop-types';
import { useState } from 'react';


function App() {
  const [items, setItems] = useState(['apple', 'pineapple', 'orange', 'apricot', 'lime', 'lemon', 'plum']);

  const [filter, setFilter] = useState('');
  
  const onChange = (e) => {
    setFilter(e.target.value);
  };


  //метод startsWith(), который возвращает true, если строка начинается с указанной подстроки (значение из состояния filter), и false в противном случае:
  const arrayToShow = items.filter((item) => item.startsWith(filter));  


  return (
    <div className="filtered-list">
      <input
        className="filtered-list__input"
        onChange={(e) => onChange(e)}
      ></input>
      {arrayToShow.length > 0 ? (
        <ul className="filtered-list__list">
          {arrayToShow.map((item, ind) => (
            <li key={ind} className="filtered-list__item">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="filtered-list__note">There is no such items</div>
      )}
    </div>
  );
};


App.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string)  //.arrayOf указывает, что свойство должно быть массивом.
};

export default App;
*/






//2.3. Реализуйте блок с данными для авторизации. Если человек уже был зарегистрирован, то отображать только поле для заполнения логина. Иначе показывать также поля для ввода телефона и электронной почты:
/*
import { useState } from 'react';

function App() {  

const [isSignedUp, setisSignedUp] = useState(false)  //false необязательно(т.к. галочка итак изначально не заполнена), но лучше указать

function handleChecked(e) {
  setisSignedUp(e.target.checked);
}


    return (
      <div>
        <h2>Пожалуйста, заполните анкетные данные для авторизации</h2>
        <div className="sign-up-block">
          <input type="checkbox"
                 id="isSignedUp"
                 className="sign-up-block__checkbox"
                 onChange={handleChecked}
          ></input>
          <label htmlFor="isSignedUp" className="sign-up-block__label">
            Уже зарегистрирован
          </label>
        </div>
        <label htmlFor="login" className="form-label">Login</label>
        <input id="login" className="form-input"></input>

        {    !isSignedUp ?        //!handleChecked(e) тут нельзя использовать, поскольку функция handleChecked(e) не возвращает никакого значения (она просто обновляет состояние)
        <>
        <label htmlFor="phone" className="form-label">Телефон</label>
        <input id="phone" className="form-input"></input>
        <label htmlFor="email" className="form-label">Email</label>
        <input id="email" className="form-input"></input>
        </>
        : undefined

        }
        
      </div>
    )
  }



export default App;
*/

  



//2.4. Даны несколько навыков и уровень их прокаченности в процентах. Отобразите бар, в котором закрашена область, пропорциональная числу процентов по каждому из навыков:
/*
import PropTypes from 'prop-types';

function Progress ({title, amount}) {  //фигурные скобки - деструктуризация. { title, amount } в данном контексте представляет собой объект, содержащий два свойства: title и amount.
     return <div className='progressBar'>
      <div>
        <div className='progressBarTitle'>
          {title}
        </div>
        <div className='progressBarWrapper'>
          <div className='progressBarDone' style={{width: `${amount}%`}}>
          {amount}%
          </div>
        </div>
      </div>
    </div>
  }


function App () {
  
      return (
      <div>
        <h2 className="title">My skills</h2>
        <Progress title="React" amount={35}/>
        <Progress title="JavaScript" amount={68}/>
        <Progress title="CSS" amount={55}/>
      </div>
    )
  }


Progress.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default App;
*/




//2.5. Даны числовой input и div с классом parity. Как только в инпуте меняется значение, должно выводиться в div, чётным или нечётным является введённое число:
/*
import { useState } from 'react';
  
function App () {
const [parity, setParity] = useState(null)   //null - чтобы изначально в  div ничего не было (когда пусто в инпуте)

//обработчики ввода значений в инпут:
const handleParity = (e) => {
  const inputValue = e.target.value; //функции setParity передаётся то, что вводится в инпут
  
  setParity(inputValue % 2 === 0 ? 'Число чётное' : 'Число нечётное'); //условие можно прописать здесь, а можно и в самом div: parity % 2 === 0  ? 'Число чётное'  : 'Число нечётное'
}

  
  
    return (
      <>
        <input type='number' onChange={handleParity}></input>
        <div className='parity'>
        {parity}
        </div>
      </>
    )
  }

  export default App;
*/



/////////////УРОВЕНЬ 3////////


//3.1. Реализуйте вывод на страницу координат курсора мышки в реальном времени при помощи React Hooks. Для этого необходимо в компонент MouseDetector добавить логику по отслеживанию мышки:
//(ТОЧНО ТАКАЯ ЖЕ ЗАДАЧА - 1.7. Но там - напрямую через useState и событие на div onMouseMove. А тут - через useState и useEffect. Основная причина, как я понял, что тут два разных компонента, а там всё в App)

/*
import { useState, useEffect } from 'react';

const MouseDetector = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }) //начальное значение position - объект {} со свойствами x: 0, y: 0

  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY }) //Внутри функции происходит вызов setPosition, который обновляет состояние position с новыми значениями x и y, которые равны горизонтальной (clientX) и вертикальной (clientY) координатам указателя мыши, соответственно. Таким образом, каждый раз, когда вызывается эта функция, состояние position обновляется с текущими координатами мыши.
    //Координаты clientX и clientY измеряются относительно левого верхнего угла видимой области браузера, без учета прокрутки.
   
    
    window.addEventListener("mousemove", setFromEvent)  //на объект windows вешается событие-прослушка(.addEventListener), значение которого передаётся из функции setFromEvent. ЕСЛИ НЕ СДЕЛАТЬ СОБЫТИЕ-ПРОСЛУШКУ .addEventListener - ТО ФУНКЦИЯ setFromEvent ПРОСТО НЕ БУДЕТ ВЫЗЫВАТЬСЯ!
    return () => {
      window.removeEventListener("mousemove", setFromEvent)  //по итогам прослушки удаляется каждое предыдущее значение координат. В return именно emoveEventListener, а не addEventListener, т.к. useEffect вызывает addEventListener автоматически. Далее надо только почистить. ИТОГО: можно вообще без return, но с ним бэст-практис (чтобы гарантировать очистку ресурсов и избежать утечек памяти или неожиданного поведения в вашем приложении - АКТУАЛЬНО НА БОЛЬШИХ ПРОЕКТАХ)
    }
  }, [])

  return position
}

  //Можно и без доп-обёртки setFromEvent(ЗАКОММЕНТИТЬ!): 
  useEffect(() => {
    setPosition({ x: position.clientX, y: position.clientY }); 

    window.addEventListener("mousemove", setPosition)  
    
  }, [])
  

  return position
}



const App = () => {
  const cords = MouseDetector()
  return (  // ${cords.x} , где $ - перевод в строковый формат, {} - JSX-деструктуризация функции со свойствами x или y
    <div className="cords"> 
      {`x: ${cords.x}px, y: ${cords.y}px`}  
    </div>
  )
}


export default App;
*/



//3.2. ПРОГРЕСС-БАР (заколнение анимации линии загрузки).
//Реализуйте интерфейс с прогресс-баром и двумя кнопками. По нажатию на одну кнопку прогресс-бар целиком заполняется. По нажатию на вторую — состояние обновляется до исходного. В тот момент, когда действие, предусмотренное при нажатии на ту или иную кнопку, невозможно совершить, кнопка должна быть недоступной для нажатия. (ИСПОЛЬЗОВАНИЕ useRef ДЛЯ ПРИНУДИТЕЛЬНОГО ВЫЗОВА АНИМАЦИИ)
/*
import { useState, useRef } from 'react';

function App() {
  const [showProgress, setShowProgress] = useState({  //первоначальное состояние задаётся ОБЪЕКТОМ со свойствами:
    process: false,  //процесс нанимации не запущен
    width: 1,   //длинна минимальна
    setIntervalId: undefined,  //хранит идентификатор интервала для анимации - МОЖНО ЛИ БЕЗ НЕГО???(по идее можно его функции повесить на wigth или даже напрямую на showProgress, но почему-то используют одельную переменную)???
    done: false  //процесс не закончен
  });

  const barRef = useRef();  //создает ссылку barRef, которая будет использоваться для доступа НАПРЯМУЮ к DOM-элементу прогресс-бара. С помощью этой ссылки компонент может изменять его свойства, ТАКИЕ КАК ШИРИНА.  
  //(Использование useRef для доступа к DOM-элементу позволяет избежать повторных рендеров компонента, когда изменяется значение ширины прогресс-бара. Если бы мы использовали useState, каждый раз при изменении ширины прогресс-бара происходил бы перерендеринг компонента, что могло бы повлиять на производительность в случае частых обновлений) 

//Обработчик на кнопку Load:
  const handleLoad = () => {  //если процесс анимации не начат, то функция handleLoad обновляет состояние, запуская процесс анимации и устанавливая интервал для вызова функции frame:
    if (!showProgress.process) {  
      setShowProgress(prevState => ({  //если не возвращать предыдущее состояние - то анимация не будет работать - ПОЧЕМУ????
        ...prevState,
        process: true,
        setIntervalId: setInterval(frame, 10)  //каждые 10 миллисекунд функция frame заполняет прогрес-бар на 1 процент
      }));
    }
  };

  //Обработчик на кнопку Done(стирает содержимое прогресс-бара):
  const handleClear = () => {
    clearInterval(showProgress.setIntervalId);  //очищает идентификатор интервала для анимации
    const elem = barRef.current;  //присваиваем переменной elem значение текущего DOM-элемента, на который ссылается объект barRef.
    elem.style.width = "1%";  //это для обнуления css ширины прогресс-бара
    setShowProgress(prevState => ({
      ...prevState,
      width: 1,  //а это - для обнуления самого свойства ширины прогресс-бара 
      done: false  //устанавливает состояние done в false, чтобы готовить его к следующему запуску
    }));
  };


  //Функция frame представляет собой кадр анимации прогресс-бара. Она увеличивает ширину прогресс-бара на один процент, пока он не достигнет 100%. После этого она очищает интервал анимации и обновляет состояние, чтобы завершить процесс анимации:
  const frame = () => {
    setShowProgress(prevState => {
      const newWidth = prevState.width + 1;
      if (newWidth >= 100) {
        clearInterval(prevState.setIntervalId);
        return {   
          ...prevState,
          //значение свойств прогресс-бара, если анимация достигла 100%:
          process: false,
          setIntervalId: undefined,
          done: true,
          width: 100
        };
      } else {
        const elem = barRef.current;  //получение ссылки на DOM-элемент прогресс-бара (благодаря этому каждое изменение newWidth анимация меняется, а вся страница не перерендеривается)
        elem.style.width = newWidth + "%";  //изменения css-свойства ширины
        return {
          ...prevState,
          width: newWidth  //для изменения самой ширины
        };
      }
    });
  };

  return (
    <div>
      <div className="progress">
        <div className="bar" ref={barRef}></div>
      </div>
      <button
        disabled={showProgress.process || showProgress.done} //кнопка заблокирована, если процесс анимации прогресс бара либо идёт, либо закончен
        onClick={handleLoad}
        className="button"
      >
        Load
      </button>
      <button
        disabled={!showProgress.done}  //кнопка заблокирована, если процесс анимации не закончен
        onClick={handleClear}
        className="button"
      >
        Clear
      </button>
    </div>
  );
}

export default App;
*/



//3.3. СЕКУНДОМЕР. Реализуйте таймер, который можно запускать, обнулять, останавливать, выводить значения кругов и очищать историю кругов.
/*
import { useState } from 'react';
import PropTypes from 'prop-types';

function HistoryList({ formatTime, currTimeMin, currTimeSec, currTimeMs }) {  //передать деструктуризированные пропсы из App - в обяз!
  const [history, setHistory] = useState([]);

  const onSaveTime = () => {
    const newTime = `${formatTime(currTimeMin)}:${formatTime(currTimeSec)}:${formatTime(currTimeMs, 'ms')}`; //записываем в новую переменную итоговое время из formatTime
    
    setHistory(prevHistory => [...prevHistory, newTime]);  //функция обратного вызова, передаваемая в setHistory. Она получает предыдущее состояние history в качестве аргумента (prevHistory), а затем возвращает новое состояние. 
    //prevHistory - название может быть любым, реакт итак помнит, что аргумент функции etHistory - это history. То есть переменной prevHistory присваивается значение history
  };

  const onClearHistory = () => {
    setHistory([]);  //просто обнуляет массив, который затем передаётся в див
  };

  return (
    <div className='history-list'>
      <div className='history-list__header'>
        <h3 className='history-list__title'>History</h3>
        <button className='history-list__button' onClick={onSaveTime}>
          Save time
        </button>
        <button className='history-list__button' onClick={onClearHistory}>
          Clear history
        </button>
      </div>
      <ul className="history-list__list">
        { //пробегаемся по массиву history, который мы получили из useSutate, благодаря логики функции onSaveTime:
        history.map((item, index) => (
          <li key={index} className="history-list__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [timer, setTimer] = useState({
    running: false,
    currTimeMs: 0,
    currTimeSec: 0,
    currTimeMin: 0,
    watch: null  //добавляем новое свойство "слежения"
  });


//Функция формирования строки времени под определённый формат. Принимает 2 аргумента: val - значение конкретного уровня(мс, сек или мин) + unit - следующий уровень(изначально пустой). Впоследствии при вызове функции (например, {formatTime(timer.currTimeMin)} ), движок приравнивает timer к val(ТАК КАК VAL - ПЕРВЫЙ АРГУМЕНТ!):
  const formatTime = (val, unit = '') => {
    let value = val.toString(); //надо перевести value в строку, чтобы адекватно прописать формат 00:00:00 (т.е. не 4мс, а 04мс)
    //если кол-во миллисекунд - однозначное число x, то записывается 0X :
    if (value.length < 2) {
      value = '0' + value;  //т.е. не 4мс, а 04мс
    }
     //если уже есть милисекунды, и однозначное число минут x(всего 3-значное число), то записывается 0Xms :
    if (unit === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };
  
  
  const onStart = () => {
    //если таймер не запущен, то  запускаем его и записываем значение в intervalId, которое передаётся в watch:
    if (!timer.running) {
      const intervalId = setInterval(() => step(), 10); //setInterval - запускает функцию step() каждые 10 миллисекунд
      setTimer(prevState => ({
        ...prevState,
        running: true,
        watch: intervalId 
      }));
    }
  };
  
  const onStop = () => {
    //Если таймер запущен:
    if (timer.running) { 
      clearInterval(timer.watch);  //останавливает setInterval (watch)
      setTimer(prevState => ({  //вызываем setTImer с параметрами(таймером) на момент остановки
        ...prevState,
        running: false
      }));
    }
  };


  const onReset = () => {
    setTimer({
      currTimeMs: 0,
      currTimeSec: 0,
      currTimeMin: 0
    });
    clearInterval(timer.watch);
  };

  const step = () => {
    setTimer(prevState => {
      let { currTimeMs, currTimeSec, currTimeMin } = prevState;
      currTimeMs += 10;  // каждую итерацию милисекунды увеличиваются на 10
      if (currTimeMs >= 1000) {
        currTimeSec++;  //+1 к самому себе
        currTimeMs = 0;
      }
      if (currTimeSec >= 60) {
        currTimeMin++;
        currTimeSec = 0;
      }
      return {
        ...prevState,
        currTimeMs,
        currTimeSec,
        currTimeMin
      };
    });
  };

  return (
    <div className='stopwatch'>
      <div className='stopwatch__watch'>
        <span className='stopwatch__watch-unit'>
          {formatTime(timer.currTimeMin)}
        </span>
        :
        <span className='stopwatch__watch-unit'>
          {formatTime(timer.currTimeSec)}
        </span>
        :
        <span className='stopwatch__watch-unit'>
          {formatTime(timer.currTimeMs, 'ms')}
        </span>
      </div>
      <div className='stopwatch__button-block'>
        <button className='stopwatch__button' disabled={timer.running} onClick={onStart}>
          Start
        </button>
        <button className='stopwatch__button' onClick={onReset}>
          Reset
        </button>
        <button className='stopwatch__button' onClick={onStop}>
          Stop
        </button>
      </div>
      <HistoryList {...timer} formatTime={formatTime} />
    </div>
  );
}

HistoryList.propTypes = {
  running: PropTypes.bool,
  currTimeMs: PropTypes.number,
  currTimeSec: PropTypes.number,
  currTimeMin: PropTypes.number,
  formatTime: PropTypes.func
}

export default App;
*/




//3.4.Реализуйте обратный отсчёт до заданной даты — вашего дня рождения:
 //ДЕБИЛЬНАЯ ЗАДАЧА, НИЧЁ НЕ РАБОТАЕТ!!!!
 ///////////////////////////////ДОРАЗОБРАТЬСЯ//////////////////////////////
 ///////////////////////////////////////////////////////////////////////// 
/*
 const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isInFuture: true
    }
  }
  
  componentDidMount() {
    const countDown = setInterval(() => {
      const myBirthday = new Date('Aug 15, 2020 00:00:00').getTime()
      const now = new Date().getTime()
      const distance = myBirthday - now

      //when date is reached
      if (distance < 0) {
        clearInterval(countDown)
        this.setState({
          isInFuture: false
        })
        alert("IT'S MY BIRTHDAY!")
      } else {
        const days = Math.floor(distance / (day))
        const hours = Math.floor((distance % (day)) / (hour))
        const minutes = Math.floor((distance % (hour)) / (minute))
        const seconds = Math.floor((distance % (minute)) / second)

        this.setState({
          days,
          hours,
          minutes,
          seconds
        })
      }
    }, second)
  }
  
  render() {
    const {days, hours, minutes, seconds} = this.state
    return (
      <div className="main-container">
        <h1 className="title">To my birthday:</h1>
        <div className="counter">
          <div className="clock-part">
            <span className="number">{days}</span>days
          </div>
          <div className="clock-part">
            <span className="number">{hours}</span>Hours
          </div>
          <div className="clock-part">
            <span className="number">{minutes}</span>Minutes
          </div>
          <div className="clock-part">
            <span className="number">{seconds}</span>Seconds
          </div>
        </div>
        <div className="birthday-emoji">🎉</div>
      </div>
    )
  }
}

export default App;
*/





//3.5.Реализуйте виджет с курсами валют рубля по отношению к евро и доллару. Данные о текущем курсе следует брать из API. Например, сервис api.exchangerate.host предоставляет бесплатный API для курсов валют, который публикует европейский центральный банк. Мы можем воспользоваться GET-запросом https://api.apilayer.com/exchangerates_data/latest?symbols=eur%2C%20usd&base=rub, чтобы получить котировки. Обратите внимание, что запрос возвращает обратные курсы.  Чтобы получить курс валюты в привычном нам виде, нужно взять обратное от него число, т.е. 1/usd.
//useEffect - ДЛЯ ЗАГРУЗКИ ДАННЫХ ИЗ API:

/*
import { useEffect, useState } from 'react';
 
function App() {
 const [exchangeRub, setExchangeRub] = useState({
                                                usd: 0,
                                                eur: 0
                                              })



  
  useEffect( () => {
//ВЕСЬ ЗАПРОС НИЖЕ (не считая 1/ ...) взять из API:

//настройка запроса:    
var myHeaders = new Headers(); //создается новый объект Headers с именем myHeaders, который будет содержать заголовки запроса
    myHeaders.append("apikey", "dULPw46FoFcajJaTwNKPb13OF91KqkQ3"); //через метод append(), который добавляет новый элемент в объект Headers, к заголовкам добавляется API-ключ для авторизации на сервере. БЕЗ API-ключа работать не будет

    var requestOptions = {  //параментры запроса
        method: 'GET', //выбор метода запроса
        redirect: 'follow', //тип перенаправления (следит за изменением курсов)
        headers: myHeaders //дополнительные заголовки для запроса
     };

//сам запрос (с опциями, через которые передаётся ключ):
    fetch ('https://api.apilayer.com/exchangerates_data/latest?symbols=eur%2C%20usd&base=rub', requestOptions) 
    //если успех, то:
    .then((response) => { return response.json(); }) // приведение ответа к JSON виду.  Аналог   JSON.parse()   для  fetch. Можно просто:  .then((response) => response.json();)
    .then((result) => {   //сам результат разбирается на переменные и записывается в state (вместо result может быть data или любое другое имя) 
        const usd = 1 / result.rates.USD;  
        const eur = 1 / result.rates.EUR;  //обратные величины 1/EUR
        setExchangeRub({ usd, eur });
     })
    .catch(error => console.error('Ошибка при получении курсов валют:', error));
}, []);
//ОТКУДА rates?? - из документации к АPI - там етсь поле Returns:
//{"base": "USD",
//  "date": "2021-03-17",
//  "rates": {
//    "EUR": 0.813399,
//    "GBP": 0.72007,
//   "JPY": 107.346001
//  },



  
// .toFixed(2) - округление до 2-х знаков после запятой
    return (
      <div>
      <span>Курсы валют:</span>
      <b> USD </b>
      <span>{isNaN(exchangeRub.usd) ? 'Данные недоступны' : exchangeRub.usd.toFixed(2)}</span>
      <b> EUR </b>
      <span>{isNaN(exchangeRub.eur) ? 'Данные недоступны' : exchangeRub.eur.toFixed(2)}</span>
    </div>
    )
}

export default App;
*/





//3.6. КОНВЕРТЕР ДЮЙМЫ-САНТИМЕТРЫ:
// ОЧЕНЬ ХОРОШИЙ ПРИМЕР
//Даны два input-а: один для сантиметров, другой для дюймов. Как только в одном из инпутов обновляется значение, другой меняется автоматически. Например, если пользователь вводит в поле «сантиметры» значение 2.54, то инпут «дюймы» должен показать 1. Если же после этого единицу исправить на 12, то поле «сантиметры» должно измениться на 30.4:
/*
import { useState } from 'react';

function LabeledInput({value, onChange, label}) {
  return <div className='labeled-input'>
    <input
      className='labeled-input__input'
      value={value}
      onChange={onChange} />
    <div class='labeled-input__label'>
      {label}
    </div>
  </div>
}

function toInches(sm) {
 return (sm/2.54).toFixed(2);
  }

function toSantimetres(inch) {
  return (inch*2.54).toFixed(2);
}


function App() {
  const [dimention, setDimention] = useState ({ sm: 0,
                                                inch: 0 })


//первый обработчик - ПЕРВЫЙ СПОСОБ (нагляднее; когда поле см пустое - в дюймах нули):
function handleChangeSm(e) {
  const newSm = e.target.value  //всё что пишется в инпут - в переменную newSm 
  const newInch = toInches(newSm);  //функция перевода newSm  в newInch

  setDimention({   //обновляем стейт-функцию, присваивая свойствам значения только что вычисленных переменных
    sm: newSm,
    inch: newInch
  });
}


//второй обработчик - ВТОРОЙ СПОСОБ (заморочено; когда поле дюймы пустое - в см нули):
function handleChangeInch(e) {
  const newInch = e.target.value   //всё что пишется в инпут - в переменную newInch
  
 //новый объект newDimention, который представляет новое состояние для переменной dimention в зависимости от значения newInch:
  const newDimention = newInch === ''  //если newInch пустое
  ? { sm: '', inch: '' }    //то newDimention = объекту с пустыми свойствами
  : {   //иначе newDimention = объекту....
    sm: toSantimetres(newInch),  //...где свойство sm будет равно результату конвертации нового значения в дюймах (newInch) в сантиметры с помощью функции toSantimetres
    inch: newInch  //... свойство inch будет равно newInch.
  }

  setDimention(newDimention);
}


    return (
      <div className='changeDimentionBlock'>
        <LabeledInput
          label='Сантиметры'
          value={dimention.sm}  //вызывать надо именнно поле sm
          onChange={handleChangeSm}
        />
        <span> = </span>
        <LabeledInput
          label='Дюймы'
          value={dimention.inch}     //вызывать надо именнно поле inch 
          onChange={handleChangeInch}
        />
      </div>
    )
}

export default App;
*/





//3.7. ВАЛИДАЦИЯ ИНПУТА.    Реализуйте компонент поле ввода с возможностью валидации вводимых пользователем данных. Сообщение об ошибке и условия валидации передается в компонент через props в виде строки и функции соответственно. Если пользовательский ввод не проходит валидацию, необходимо сделать рамку инпута красной. А при нормальной активности инпута - синей.   Не следует выводить сообщение об ошибке, пока поле ввода не было ни разу заполнено. Чтобы поддержать такое поведение, необходимо добавить инпуту onBlur обработчик и, когда он первый раз сработает, начинать валидировать поле.
//ЗАМОРОЧЕННЫЙ ПО ЛОГИКЕ ПРИМЕР((

/*
import { useState } from 'react';
import classNames from 'classnames';  //библиотека для объединения имен классов classNames

function Input({placeholder, noValidate, errorMessage}) {
  const [enterInInput, setEnterIninput] = useState({ value: '',
                                                     noFirstTouch: true}) //флажок: первого касания инпута ещё не было

    const isNoValid = !enterInInput.noFirstTouch && noValidate(enterInInput.value) //проверка не прошла (isNoValid true), если уже было первое касание и введённое значение value не проходит валидацию (noValidate true)
    //const isNoValid = условие (true/false) - переменной присваивается булево значение 
    
    const cn = classNames('input', isNoValid && 'input__error')  //Генерация класса для инпута на основе условий. Если проверка не прошла (NoValid true), класс будет называться "input input__error", иначе будет использован только класс input.

    return (
      <div>
      <input
        type="text"
        className={cn}
        placeholder={placeholder}
        value={enterInInput.value}
//Когда фокус уходит из инпута (обработчик onBlur) - вызывается функция setEnterIninput для установки флага noFirstTouch в false при первом касании инпута. Также он вызывает функцию noValidate, чтобы проверить введенное значение:        
        onBlur={(e) => {
          setEnterIninput({...enterInInput, noFirstTouch: false});
          noValidate(enterInInput.value);
        }}
//Обработчик onChange вызывает функцию setEnterIninput, чтобы обновить значение введенного текста:
        onChange={(e) => setEnterIninput({value: e.target.value, noFirstTouch: enterInInput.noFirstTouch})}
      />
      <div className="error">
        {
        isNoValid && errorMessage(enterInInput.value) //если сообщение не проходит валидацию (isInvalid true), то выводится сообщение общ ошибке
                }  
      </div>
    </div>
    )
}


function App() {
  return (
    <Input
    placeholder={"Username"}
    noValidate={value => value.length < 3}  //если короче 3-х символов, то валидация не прошла (noValidate true)
    errorMessage={value => `Поле должно содержать минимум 3 символа`}
    />
  )
}

export default App;
*/





//3.8.УСТАНОВКА ПАРОЛЯ. Реализуйте компонент с двумя полями для ввода пароля. Если введенные пароли не совпадают или они слишком короткие (меньше 6 символов), то выдать соответсвующие сообщения. 
//ХОРОШИЙ ПРИМЕР + хороший пример необходимости использования useEffect:
/*
import { useState, useEffect } from 'react';
import classNames from 'classnames'; 

function Input({ placeholder, onChangeParent, className }) {
  const [value, setValue] = useState('');  //используется для создания состояния value, которое содержит текущее значение ввода

//обработчик события изменения инпута: 
  const handleChange = (event) => {
    setValue(event.target.value);  //обновляет состояние value компонента Input
    onChangeParent(event.target.value);  //передаёт новое состояние value во внешний код через свойство onChangeParent  (можно onChangeParent назвать тоже onChange - но так просто нагляднее). Фактически - это проброс логики из дочернего компонента в родительский (а не наоборот, как делается через пропсы)
  };

  

  return (
    <div>
      <input
       className = {className} //получает {className} из родительского
        type='password'
        placeholder={placeholder}  //получает {placeholder} из родительского
        value={value}  //{value} - из useState ("однофамилец event.target.value")
        onChange={handleChange}
      />
    </div>
  );
}

function CheckPasswords() {
  const [password1, setPassword1] = useState(''); //state для пароля-1
  const [password2, setPassword2] = useState(''); //state для пароля-2
  const [errormessage, setErrorMessage] = useState('');  //state для ошибки


  //Если условие написать просто, без использования useEffect - то сравнение будет происходить каждый раз при перерендеринге компонента. А нам нужно чтобы условие работало только при изменении pasword-1 или password-2 (что указано в массиве зависимостей):
  useEffect(() => {
//логика отображения ошибок (сначала проверяем длинну, потом совпадение паролей)    
    if (password1.length < 6) {
      setErrorMessage('Пароль должен быть не менее 6 символов');
    } else if (password1 !== password2) {
      setErrorMessage('Пароли не совпадают');
    } else {
      setErrorMessage('');
    }
  }, [password1, password2]);  //МАССИВ ЗАВИСИМОСТЙ - если оставить  его пустым - то useEffect применится только при первоначальном рендерниге, а каждое изменение пароля-1 и 2 оставит без изменения

  const cn1 = classNames('input', password1.length < 6 && 'input__error')

  const cn2 = classNames('input', (password2.length < 6 || password1 !== password2) && 'input__error')

  return (
    <div>
      <Input
        className={cn1} 
        placeholder={"Введите пароль"}
        onChangeParent={setPassword1}
      />
      <Input
        className={cn2}
        placeholder={"Введите пароль повторно"}
        onChangeParent={setPassword2}
      />
      <div className='error'>{errormessage}</div>
    </div>
  );
}

function App(){
    return (<CheckPasswords />)
}

export default App;
*/


 
//3.9. ТЁМНАЯ/СВЕТЛАЯ ТЕМА ЧЕРЕЗ CONTEXT. (+ много  classNames)  
// Необходимо реализовать пробрасывание параметра темы в компоненты через Context. Когда мы собираем из простых компонентов сложные, некоторые props мы вынуждены передавать через всю иерархию с самого верха вниз. Иногда это не очень удобно, например, в случае с темой (тёмная или светлая). Механизм Context-ов позволяет не передавать тему по иерархии явно, а определить её на самом верху, а каждый компонент получит это значение через контекст.
//Контекст позволяет избежать передачи пропсов в промежуточные компоненты. В данном случае пропс theme с помощью контекста передаётся из компонента ComplexComponent в Text, Input и Switcher. Между ними нет промежуточных компонентов  - поэтому это скорее пример. 
//Добавил промежуточный компонент InputWrapper, чтобы нагляднее показать необходимость контекста для избежания передачи в него пропсов placeholder, onChange, isPassword.


import { useState, useContext } from 'react';  
import classNames from 'classnames'; 

//СОЗДАЁМ КОНТЕКСТ-ОБЪЕКТЫ (функции):
//для передачи пропса theme с начальным значением 'light':
const ThemeContext = React.createContext('light'); 
//для передачи пропсов placeholder, onChange, isPassword (минуя промежуточный InputWrapper):
const InputContext = React.createContext({placeholder: "", onChange: () => {}, isPassword: true}); //начальное значение onChange - пустая анонимная стрелочная функция

// ТЕКСТ
function Text({ children }) {   /////*без контекста - ({ theme, children })
  const theme = useContext(ThemeContext);   //КОНТЕКСТ - принимает контекст (или через <ThemeContext.Consumer/> по старинке)

  const cn = classNames('text', theme === 'dark' && 'text__dark');
  return <p className={cn}>{children}</p>;  //текст можно было бы написать и здесь, но он передаётся из родительского компонента через пропс чилдрен
}

// ПЕРЕКЛЮЧАТЕЛЬ
function Switcher({ options, onChange }) {  ////*без контекста - ({ theme, options, onChange }) 
  const theme = useContext(ThemeContext);  //КОНТЕКСТ

  //Такая замороченная схема тут позволяет динамически создавать кнопки в зависимости от количества элементов в массиве options:
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOptionClick = (ind) => {
    setSelectedIndex(ind);  
    //если onChange существует, то он срабатывает с аргументом, который равен выбранной опции из массива options с соответствующим ему индексом ind (options[ind]):
    if (onChange) {
      onChange(options[ind]);
    }
  };

  const switcherCn = classNames('switcher', theme === 'dark' && 'switcher__dark');

  return (
    <div className='switcher-wrap'>
      <div className={switcherCn}>
        {
        options.map((opt, ind) => (    //благодаря пробежке по массиву options.map мы можем задавать ещё дополнительные цвета (кроме лайт и дарк), которые указываются в массиве options в общем компоненте ComplexComponent. И соответственно - делать дополнительные кнопки. 
          <button
            key={opt.value}
            //алтернатива записи classNames - через обратные кавычки и $:
            className={
              `option ${selectedIndex === ind ? 'option__selected' : ''}
              ${theme === 'dark' ? 'option__dark' : ''}`
            }
            onClick={() => handleOptionClick(ind)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ИНПУТ - просто комонент-обёртка. в него ничё не передаётся:
function InputWrapper() {    ////*без контекста - ({ theme, placeholder, onChange, isPassword })
  return (
    <div>
      <Input />
    </div>
  );
}


function Input() {  ////*без контекста - ({ theme, placeholder, onChange, isPassword })
  //пропсы напрямую передаются в Input через контекст:
  const theme = useContext(ThemeContext);
  const { placeholder, isPassword, onChange } = useContext(InputContext);
  
  const [value, setValue] = useState('');

  const inputCn = classNames('input', theme === 'dark' && 'input__dark');

  const handleChange = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div>
      <input
        type={isPassword ? 'password' : 'text'}  //нужно, т.к. один инпуст - текстовый, а другой - пароль
        className={inputCn}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}


// ОБЩИЙ
function ComplexComponent () {
  const [theme, setTheme] = useState("light");

//ВАР1 - в InputContext.Provider обёрнуто всё:
  return (
    //обёртка провайдера-контекста THEME (того, кто раздаёт контекст  дочерним компонентам):
    <ThemeContext.Provider value={theme}>  
    <InputContext.Provider value={{ placeholder: 'Username', isPassword: false, onChange: () => {}}} 
      /*обёртка провайдера-контекста placeholder, isPassword, onChange*/    >
    <div className='background' style={{ background: theme === 'light' ? '#fff' : '#21262D' }}>
      <Switcher
          ////*без контекста ещё бы добавлялось: theme={theme} 
        //благодаря сложной структуре пробежке по массиву options.map в Switcher - мы можем задавать ещё дополнительные цвета (кроме лайт и дарк). Например, blue - и тогда кнопки станет уже три. 
        options={[
          { label: "light", value: 0 },
          { label: "dark", value: 1 },
          //{ label: "Blue", value: 2 } - можно добавить новые кнопки
        ]}
        //В ЭТОЙ СТРОКЕ И ПРОИСХОДИТ ПЕРЕДАЧА ЗНАЧЕНИЯ label В theme - ЧЕРЕЗ ФУНКЦИЮ setTheme:
        onChange={({ label }) => setTheme(label)}  // **исправлено: передача значения вместо объекта
      />
      
      <Text //без контекста ещё бы добавлялось: theme={theme}
      >  
      In a typical React application, data is passed top-down via props, but this can be cumbersome for certain types of props that are required by many components within an application.  
      </Text>
 
        <InputWrapper ////*без контекста ещё бы добавлялось: theme={theme}, placeholder = .., !isPassword 
        />
        <InputWrapper ////*без контекста ещё бы добавлялось: theme={theme}, placeholder = .., isPassword 
        />
      
      <button className='button'>Login</button>
    </div>
    </InputContext.Provider>
    </ThemeContext.Provider>
  );

//ВАР2 - в InputContext.Provider обёрнут только InputWrapper: 
/*
  return (
    //обёртка провайдера-контекста THEME (того, кто РАЗДАЁТ ИЛИ ПЕРЕДАЁТ контекст  дочерним компонентам?):
    <ThemeContext.Provider value={theme}>  
    <div className='background' style={{ background: theme === 'light' ? '#fff' : '#21262D' }}>
      <Switcher
        options={[
          { label: "light", value: 0 },
          { label: "dark", value: 1 },
        ]}
        onChange={({ label }) => setTheme(label)}  
      />
      <Text>In a typical React application, data is passed top-down via props, but this can be cumbersome for certain types of props that are required by many components within an application.</Text>
      
      //обёртка провайдера-контекста placeholder, isPassword, onChange (того, кто РАЗДАЁТ ИЛИ ПЕРЕДАЁТ контекст  дочерним компонентам?)
      <InputContext.Provider value={{ placeholder: 'Username', isPassword: false, onChange: () => {}}}>
          <InputWrapper />
          <InputWrapper />
      </InputContext.Provider>
      
      <button className='button'>Login</button>
    
    </div>
    </ThemeContext.Provider>
  );
  */


}


export default function App() {
  return (<ComplexComponent />)
}


 
     

