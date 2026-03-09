function splitText(text) {
  return text.split(' ').map((word, wordIndex, words) => {
    const chars = word.split('').map((char, charIndex) => (
      <span
        className="letter"
        style={{ animationDelay: `${(wordIndex * 6 + charIndex) * 28}ms` }}
        key={`${wordIndex}-${charIndex}-${char}`}
      >
        {char}
      </span>
    ));

    return (
      <span className="word" key={`${wordIndex}-${word}`}>
        {chars}
        {wordIndex < words.length - 1 ? <span className="letter">&nbsp;</span> : null}
      </span>
    );
  });
}

function AnimatedHeading({ text }) {
  return <span className="animated-heading">{splitText(text)}</span>;
}

export default AnimatedHeading;
