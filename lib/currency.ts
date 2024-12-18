import { MyBig } from "./big";

export function toCents(value: number) {
  return new MyBig(value).mul(100).round(2).toNumber();
}

export function toDollars(value: number) {
  return new MyBig(value).div(100).round(2).toNumber();
}

export function toCurrencyFromCents(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(toDollars(value));
}
