import React, { useState, useEffect, useRef } from 'react';
import styles from './select.module.css';

const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelectContainer} ref={selectRef}>
      <div
        className={styles.selectSelected}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(option => option.value === selectedValue)?.label || placeholder}
      </div>
      {isOpen && (
        <div className={styles.selectItems}>
          {options.map(option => (
            <div
              key={option.value}
              className={styles.selectItem}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
