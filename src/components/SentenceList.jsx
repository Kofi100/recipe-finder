export default function SentenceList({ text }) {
  // Split the text by "." and trim spaces
  const sentences = text
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 0); // remove empty entries

   function sentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return (
    <ul>
      {sentences.map((sentence, index) => (
        <li key={index}>{sentenceCase(sentence)}.</li>
      ))}
    </ul>
  );
}
