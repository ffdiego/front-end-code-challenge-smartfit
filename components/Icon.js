export default function Icon({ name, status, text }) {
  function getStatus(status) {
    switch (status) {
      case "allowed":
        return "required";
      case "not_allowed":
      case "closed":
        return "forbidden";
      default:
        return status;
    }
  }

  return (
    <div className="flex flex-col items-center w-24">
      <img
        src={`/images/${getStatus(status)}-${name}.png`}
        className="max-h-16"
      />
      <p className="text-sm">{text}</p>
    </div>
  );
}
