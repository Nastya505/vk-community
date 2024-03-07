interface SelectProps {
  filter: string;
  setFilter: (value: string) => void;
  title: string;
  options: string[];
}

// данный компонент предназначен для создания селекта в фильтре и используется в компоненте Filter
const Select = ({ filter, setFilter, title, options }: SelectProps) => {
  return (
    <label>
      {title}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Все</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "true" || option === "false"
              ? option === "false"
                ? "Открытое сообщество"
                : "Закрытое сообщество"
              : option}
          </option>
        ))}
      </select>
    </label>
  );
};
export default Select;
