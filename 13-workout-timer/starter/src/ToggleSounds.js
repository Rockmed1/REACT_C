import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);

// export const ToggleSounds = memo(function ToggleSounds({
//   allowSound,
//   setAllowSound,
// }) {
//   return (
//     <button
//       className="btn-sound"
//       onClick={() => setAllowSound((allow) => !allow)}
//     >
//       {allowSound ? "🔈" : "🔇"}
//     </button>
//   );
// });
