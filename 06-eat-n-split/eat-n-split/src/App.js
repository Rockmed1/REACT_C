import { useState } from "react";
import { Button } from "./Button";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedFriend] = friends.filter((friend) => friend.id === selected);

  function handleShowAddFriend() {
    setShowAddFriend((cur) => !cur);
  }

  function handleAddFriend(friend) {
    setFriends((curFriends) => [...curFriends, friend]);
    setShowAddFriend(false);
  }

  function handleSelected(id) {
    setSelected((cur) => (cur !== id ? id : null));
    setShowAddFriend(false);
  }

  function handleSplitBill(balance) {
    setFriends(
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: balance }
          : friend
      )
    );
    setSelected(null);
  }

  return (
    <div className="app">
      <div className=" sidebar">
        <FriendsList
          friends={friends}
          onSelect={handleSelected}
          selected={selected}
        />

        {showAddFriend && <FormAddfriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {!showAddFriend ? "Add Friend" : "Close"}
        </Button>
      </div>

      {selected && (
        <FormSplitBill
          friend={selectedFriend}
          onUpdateBalance={handleSplitBill}
          key={selectedFriend.id} // this is to reset the state everytime it rerenders
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelect, selected }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelect={onSelect}
          selected={selected}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelect, selected }) {
  const isSelected = friend.id === selected;
  return (
    <li className={isSelected ? "selected" : undefined}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>{friend.name} and you are even</p>}
      <Button onClick={() => onSelect(friend.id)}>
        {!isSelected ? "Select" : "Close"}
      </Button>
    </li>
  );
}

function FormAddfriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤼 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, onUpdateBalance }) {
  const [bill, setBill] = useState("");
  const [userExp, setUserExp] = useState("");
  const [whoPay, setWhoPay] = useState("user");

  const friendExp = bill - userExp;

  function splitPay(e) {
    e.preventDefault();
    if (!bill || !userExp) return;

    let friendBalance;
    whoPay === "user"
      ? (friendBalance = friend.balance + friendExp)
      : (friendBalance = friend.balance - userExp);
    onUpdateBalance(friendBalance);
  }

  return (
    <form className="form-split-bill" onSubmit={splitPay}>
      <h2>Split the bill with {friend.name} </h2>
      <label>💸 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🤵 Your expense</label>
      <input
        type="text"
        value={userExp}
        onChange={(e) =>
          setUserExp(+e.target.value > bill ? userExp : +e.target.value)
        }
      />

      <label>🤼 {friend.name}'s expense</label>
      <input
        type="text"
        disabled
        value={(bill && userExp && friendExp) || ""}
      />

      <label>🤑 Who's paying the bill?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
