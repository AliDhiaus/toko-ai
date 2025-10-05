export function getNestedValue(obj: object, path: string): object {
  return path.split(".").reduce((acc, key) => acc?.[key as keyof object], obj);
}

export function formatePrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export function formatMidtransTime(date: Date = new Date()) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  const tzOffset = -date.getTimezoneOffset(); 
  const sign = tzOffset >= 0 ? "+" : "-";
  const tzHH = pad(Math.floor(Math.abs(tzOffset) / 60));
  const tzmm = pad(Math.abs(tzOffset) % 60);

  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss} ${sign}${tzHH}${tzmm}`;
}
