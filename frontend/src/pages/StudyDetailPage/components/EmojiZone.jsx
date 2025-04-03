import AddEmojiButton from "../../../components/AddEmojiButton";
import Emoji from "../../../components/Emoji";

function EmojiZone({ emojis, fetchStudy }) {
  const emojiEntires = Object.entries(emojis);

  return (
    <div className="flex items-center gap-x-2">
      <ul className="flex gap-x-1 items-center">
        {emojiEntires.map(([emoji, count]) => (
          <li key={emoji}>
            <Emoji emoji={emoji} count={count} />
          </li>
        ))}
      </ul>
      <AddEmojiButton fetchStudy={fetchStudy} />
    </div>
  );
}

export default EmojiZone;
