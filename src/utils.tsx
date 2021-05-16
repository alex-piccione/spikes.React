export function single<T>(data:T|T[]):T {
  return (Array.isArray(data) && data.length > 0 ) ? data[0] : data as T
}