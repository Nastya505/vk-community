import React, { useState, useEffect, useCallback } from "react";
import Select from "../select/select";
import { Group } from "../../types/types";

import styles from "./filter.module.css";

interface FilterProps {
  groups: Group[];
  filterClosed: string;
  setFilterClosed: React.Dispatch<React.SetStateAction<string>>;
  filterColor: string;
  setFilterColor: React.Dispatch<React.SetStateAction<string>>;
}


// данный компонент является оберткой для компонентов Select
const Filter: React.FC<FilterProps> = ({
  groups,
  filterClosed,
  setFilterClosed,
  filterColor,
  setFilterColor,
}) => {
// здесь хранится список уникальных цветов
  const [selectColors, setSelectColors] = useState<string[]>([]);

  // функция для получения уникальных цветов групп
  const SelectColor = useCallback((): string[] => {
    const colors = new Set<string>();
    groups.forEach((group) => {
      if (group.avatar_color) {
        colors.add(group.avatar_color);
      }
    });
    return Array.from(colors);
  }, [groups]);

  useEffect(() => {
    setSelectColors(SelectColor());
  }, [SelectColor]);

  return (
    <div className={styles.filter}>
      <Select
        filter={filterClosed}
        setFilter={setFilterClosed}
        title={"Фильтрация по закрытости: "}
        options={["true", "false"]}
      />

      <Select
        filter={filterColor}
        setFilter={setFilterColor}
        title={"Фильтрация по цвету: "}
        options={selectColors}
      />
    </div>
  );
};

export default Filter;
