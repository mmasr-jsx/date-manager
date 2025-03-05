export function stringToUppercase(st: string) {
  return st.charAt(0).toUpperCase() + st.slice(1);
}

export function formatPhone(num: number) {
  let numString = num.toString().split("");
  var cleaned = ("" + numString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return match[1] + " " + match[2] + " " + match[3] + " " + match[4];
  }
  return null;
}

export function getPetSize(size) {
  let petSize;

  switch (size) {
    case "s":
      petSize = "pequeño";
      break;
    case "m":
      petSize = "mediano";
      break;
    case "l":
      petSize = "grande";
      break;
    default:
      petSize = "no disponible";
  }

  return petSize;
}
