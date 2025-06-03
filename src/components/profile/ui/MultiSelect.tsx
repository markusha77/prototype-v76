import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
  defaultOption?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options',
  error,
  defaultOption
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Filter options based on input value and already selected values
    const filtered = options.filter(
      option => 
        option.toLowerCase().includes(inputValue.toLowerCase()) && 
        !selectedValues.includes(option)
    );
    setFilteredOptions(filtered);
  }, [inputValue, options, selectedValues]);
  
  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };
  
  const handleSelect = (option: string) => {
    onChange([...selectedValues, option]);
    setInputValue('');
  };
  
  const handleRemove = (option: string) => {
    onChange(selectedValues.filter(value => value !== option));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() && !options.includes(inputValue.trim())) {
      // Add custom option if it doesn't exist
      onChange([...selectedValues, inputValue.trim()]);
      setInputValue('');
      e.preventDefault();
    } else if (e.key === 'Backspace' && !inputValue && selectedValues.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      handleRemove(selectedValues[selectedValues.length - 1]);
    }
  };
  
  return (
    <div className="relative" ref={containerRef}>
      <div 
        className={`appearance-none w-full px-3 py-2 border ${
          error
            ? 'border-red-300 focus-within:ring-red-500 focus-within:border-red-500'
            : 'border-gray-300 focus-within:ring-indigo-500 focus-within:border-indigo-500'
        } rounded-md shadow-sm sm:text-sm`}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-2">
          {selectedValues.map(value => (
            <div 
              key={value}
              className="flex items-center bg-indigo-100 text-indigo-800 rounded-md px-2 py-1 text-sm"
            >
              <span>{value}</span>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(value);
                }}
                className="ml-1 text-indigo-500 hover:text-indigo-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            className="flex-grow min-w-[120px] outline-none border-none p-1 bg-transparent text-sm"
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          {/* Show default option if provided and no options are available */}
          {defaultOption && filteredOptions.length === 0 && selectedValues.length === 0 && !inputValue && (
            <div className="select-none relative py-2 pl-3 pr-9 text-gray-400 italic cursor-not-allowed">
              {defaultOption}
            </div>
          )}
          
          {filteredOptions.map(option => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 text-gray-900"
            >
              {option}
            </div>
          ))}
          
          {filteredOptions.length === 0 && !defaultOption && (
            <div className="select-none relative py-2 pl-3 pr-9 text-gray-400">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
