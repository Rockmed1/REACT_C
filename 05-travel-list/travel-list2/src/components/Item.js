export default function Item({ item, onDeleteItem, onPackItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onPackItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        onClick={
          () =>
            onDeleteItem(
              item.id
            ) /* we need a function here to call the ondelete function with parameters otherwise it will just call ondeleteitem() right away */
        }>
        ❌
      </button>
    </li>
  );
}
