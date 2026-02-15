export function formatDate(dateString) {
  const date = new Date(dateString)
  const isoDate = date.toISOString().split('T')[0] // YYYY-MM-DD
  const day = date.getDate()
  
  let formatted = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
  }).format(date)
  formatted = shapeDate(formatted, day)
  
  return { isoDate, formatted }
}

function getOrdinal(day) {
  if (day > 3 && day < 21) return 'th'
  switch (day % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

function shapeDate(date, day) {
  const split = date.split(' ')
  return `${split[0]} ${day}${getOrdinal(day)}, ${split[1]}`
}