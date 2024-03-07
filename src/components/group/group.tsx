import React, { useState } from "react";
import { SimpleCell } from "@vkontakte/vkui";
import { Group } from "../../types/types";

import styles from "./group.module.css";

interface GroupProps {
  group: Group;
}

// Данный компонент предназначен для отображения карточки группы
const GroupItem: React.FC<GroupProps> = ({
  group: { id, name, avatar_color, members_count, closed, friends },
}) => {
  
// состояние отображения друзей в карточке 
  const [showFriends, setShowFriends] = useState(false);

// функция для переключения состояния отображения друзей
  const toggleFriends = () => {
    setShowFriends(!showFriends);
  };

  return (
    <SimpleCell key={id} className={styles.item}>
      <p className={styles.closed}>
        {closed ? "Закрытое сообщество" : "Открытое сообщество"}
      </p>

      {avatar_color && (
        <div
          className={styles.avatar}
          style={{ backgroundColor: avatar_color }}
        />
      )}
      <h2>{name}</h2>
      <p>Подписчики: {members_count}</p>

      <button onClick={toggleFriends} className={styles.btn}>
        Друзья: {friends ? friends.length : 0}
      </button>

      {showFriends && friends && friends.length > 0 && (
        <>
          {friends.map((friend) => (
            <div 
            key={friend.first_name}
            className={styles.friend}
            >
              {`${friend.first_name} ${friend.last_name}`}
            </div>
          ))}
        </>
      )}
    </SimpleCell>
  );
};

export default GroupItem;
