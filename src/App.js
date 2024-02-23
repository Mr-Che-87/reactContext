import React from 'react';
import './App.css';

 
//ТЁМНАЯ/СВЕТЛАЯ ТЕМА ЧЕРЕЗ CONTEXT.   
// Необходимо реализовать пробрасывание параметра темы в компоненты через Context. В данном случае пропс theme с помощью контекста передаётся из компонента ComplexComponent в Text, Input и Switcher. 
//+Добавил промежуточный компонент InputWrapper, чтобы нагляднее показать необходимость контекста для избежания передачи в него пропсов placeholder, onChange, isPassword.


import { useState, useContext } from 'react';  
import classNames from 'classnames'; 

//СОЗДАЁМ КОНТЕКСТ:
//для передачи пропса theme:
const ThemeContext = React.createContext('light'); 
//для передачи пропсов placeholder, onChange, isPassword (минуя промежуточный InputWrapper):
const InputContext = React.createContext({placeholder: "", onChange: () => {}, isPassword: true}); 

// ТЕКСТ:
function Text({ children }) {  
  const theme = useContext(ThemeContext);   

  const cn = classNames('text', theme === 'dark' && 'text__dark');
  return <p className={cn}>{children}</p>; 
}

// ПЕРЕКЛЮЧАТЕЛЬ:
function Switcher({ options, onChange }) { 
  const theme = useContext(ThemeContext);  

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOptionClick = (ind) => {
    setSelectedIndex(ind);  
    if (onChange) {
      onChange(options[ind]);
    }
  };

  const switcherCn = classNames('switcher', theme === 'dark' && 'switcher__dark');

  return (
    <div className='switcher-wrap'>
      <div className={switcherCn}>
        {
        options.map((opt, ind) => (    
          <button
            key={opt.value}
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


// ИНПУТ-обёртка. в него ничё не передаётся:
function InputWrapper() {    ////*без контекста - ({ theme, placeholder, onChange, isPassword })
  return (
    <div>
      <Input />
    </div>
  );
}

// ИНПУТ:
function Input() {  
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
        type={isPassword ? 'password' : 'text'}  
        className={inputCn}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}


// ОБЩИЙ:
function ComplexComponent () {
  const [theme, setTheme] = useState("light");

//ВАР1 - в InputContext.Provider обёрнуто всё:
  return (
    <ThemeContext.Provider value={theme}>  
    <InputContext.Provider value={{ placeholder: 'Username', isPassword: false, onChange: () => {}}} 
      
    <div className='background' style={{ background: theme === 'light' ? '#fff' : '#21262D' }}>
       <Switcher
          ////*без контекста ещё бы добавлялось: theme={theme} 
        //благодаря сложной структуре пробежке по массиву options.map в Switcher - мы можем задавать ещё дополнительные цвета (кроме лайт и дарк). Например, blue - и тогда кнопки станет уже три. 
        options={[
          { label: "light", value: 0 },
          { label: "dark", value: 1 },
          //{ label: "Blue", value: 2 } - можно добавить новые кнопки
        ]}
        onChange={({ label }) => setTheme(label)}  // **исправлено: передача значения вместо объекта
      />
      
      <Text>In a typical React application, data is passed top-down via props, but this can be cumbersome for certain types of props that are required by many components within an application.  
      </Text>
 
        <InputWrapper/>
        <InputWrapper/>
      
      <button className='button'>Login</button>
        
    </div>
        
    </InputContext.Provider>
    </ThemeContext.Provider>
  );

//ВАР2 - в InputContext.Provider обёрнут только InputWrapper: 
/*
  return (
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

//ВОТ Я И НЕ ПОЙМУ - ГДЕ ПРАВИЛЬНЕЕ ПИСАТЬ ЭТОТ  <InputContext.Provider>? 
//И ВООБЩЕ ПРОВАЙДЕР - ЭТО КОМПОНЕНТ, КОТОРЫЙ РАЗДАЁТ КОНТЕКСТ? ИЛИ КОТОРЫЙ ЕГО ПРОСТО ПЕРЕДАЁТ/ПРОБРАСЫВАЕТ МИМО СЕБЯ


export default function App() {
  return (<ComplexComponent />)
}


 
     

