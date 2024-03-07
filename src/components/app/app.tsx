import React, { useEffect, useState } from "react";
import groupsJson from "../../utils/groups.json";
import { Group, GetGroupsResponse } from "../../types/types";
import GroupItem from "../group/group";
import Filter from "../filter/filter";

import styles from "./app.module.css";

const App: React.FC = () => {
  // состояния групп
  const [groups, setGroups] = useState<Group[]>([]);

// состояния фильтров
  const [filterClosed, setFilterClosed] = useState("");
  const [filterColor, setFilterColor] = useState("");

// функция для получения данных
  const fetchData = async (): Promise<GetGroupsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { result: 1, data: groupsJson as Group[] };
  };

  useEffect(() => {
    const fetchDataAndSetGroups = async () => {
      try {
        const response = await fetchData();
        if (response.result === 1) {
          if (response.data) {
            setGroups(response.data);
          } else {
            console.log("Отсутствуют данные о группах");
          }
        } else {
          console.log("Не удалось получить данные о группах");
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    };
    fetchDataAndSetGroups();
  }, []);

  // функция фильтрации
  const filteredGroups = groups.filter((group) => {
    if (filterClosed && group.closed.toString() !== filterClosed) {
      return false;
    }

    if (filterColor && group.avatar_color !== filterColor) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.app}>
      <Filter
        groups={filteredGroups}
        filterClosed={filterClosed}
        setFilterClosed={setFilterClosed}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
      />

      <div className={styles.groups}>
        {filteredGroups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default App;
