export default function SentenceList({ text }) {
  // Split the text by "." and trim spaces
  const sentences = text
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 0); // remove empty entries

  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li key={index}>{sentence}.</li>
      ))}
    </ul>
  );
}
