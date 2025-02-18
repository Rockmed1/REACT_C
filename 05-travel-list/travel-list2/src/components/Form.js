import { useState } from "react";

function Form({ onAddItems }) {
  const descriptionDefault = "";
  const quantityDefault = 1;
  const [description, setDescription] = useState(descriptionDefault);
  const [quantity, setQuantity] = useState(quantityDefault);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, package: false, id: Date.now() };

    onAddItems(newItem);

    setDescription(descriptionDefault);
    setQuantity(quantityDefault);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(+e.target.value);
        }}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default Form;
