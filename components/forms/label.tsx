export default function Label({
  htmlFor,
  text,
}: {
  htmlFor: string;
  text: string;
}) {
  return (
    <label htmlFor={htmlFor} className="font-medium text-field-label">
      {text}
    </label>
  );
}
