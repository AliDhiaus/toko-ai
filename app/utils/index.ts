export function getNestedValue(obj: object, path: string): object {
  return path.split(".").reduce((acc, key) => acc?.[key as keyof object], obj);
}

export function formatePrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}