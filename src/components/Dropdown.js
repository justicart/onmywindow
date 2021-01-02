import React, {useState} from 'react';

function Option({option, onSelect, selected}) {
  return (
    <div
      className={`dropdownOption ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(option)}
    >{option.name}</div>
  )
}

function Dropdown({defaultOption, options = [], onSelect, value}) {
  const [open, setOpen] = useState(false);
  const dropdownName = value ? value.name : defaultOption.name;

  const handleSelect = (option) => {
    onSelect(option);
    setOpen(false);
  }
  return (
    <div className="dropdownParent">
      <div
        className={`button dropdown ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >{dropdownName}</div>
      {open && (
        <div className="dropdownOptions">
          <Option
            option={defaultOption}
            onSelect={handleSelect}
            selected={value == null || value.slug == null}
          />
          {options.map(option => {
            if (option.hide === true || option == null) return null;
            return (
              <Option
                option={option}
                key={option.slug}
                onSelect={handleSelect}
                selected={value != null && value.slug === option.slug}
              />
            )
          })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
