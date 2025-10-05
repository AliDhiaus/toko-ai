export const labelCategory = [
    { field: "name", label: "Name" },
]

export const labelProduct = [
    { field: "image", label: "Image" },
    { field: "name", label: "Name" },
    { field: "description", label: "Description" },
    { field: "price", label: "Price" },
    { field: "categories.name", label: "Category" },
]

export const labelOrder = [
    { field: "products.image", label: "Thumbnail" },
    { field: "products.name", label: "Name" },
    { field: "total", label: "Price" },
]

export const labelBank = [
  { id: "bca", name: "Bank Central Asia", short: "BCA", color: "bg-blue-600" },
  { id: "bni", name: "Bank Negara Indonesia", short: "BNI", color: "bg-orange-500" },
  { id: "bri", name: "Bank Rakyat Indonesia", short: "BRI", color: "bg-red-600" },
  { id: "permata", name: "Bank Permata", short: "PER", color: "bg-teal-500" },
  { id: "cimb", name: "CIMB Niaga", short: "CIMB", color: "bg-pink-700" },
  { id: "bsi", name: "Bank Syariah Indonesia", short: "BSI", color: "bg-green-700" },
];