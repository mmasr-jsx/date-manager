export function stringToUppercase(
  st: string,
  capitalizeOnlyFirstLetter?: boolean
) {
  if (!st) return '';
  return capitalizeOnlyFirstLetter
    ? st.charAt(0).toUpperCase() + st.slice(1).toLowerCase()
    : st.charAt(0).toUpperCase() + st.slice(1);
}

export function formatPhone(num: number) {
  let numString = num.toString().split('');
  var cleaned = ('' + numString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
  }
  return null;
}

export function getPetSize(size) {
  let petSize;

  switch (size) {
    case 's':
      petSize = 'Pequeño';
      break;
    case 'm':
      petSize = 'Mediano';
      break;
    case 'l':
      petSize = 'Grande';
      break;
    default:
      petSize = 'No disponible';
  }

  return petSize;
}

export function truncateText(text, num) {
  if (!text) {
    return 'Ns/Nc';
  }

  if (text && text.length > 10) {
    text = text.substring(0, num) + '...';
  }

  return text;
}

export function oddLine(num) {
  var res = num % 2;

  return res === 0 ? false : true;
}
