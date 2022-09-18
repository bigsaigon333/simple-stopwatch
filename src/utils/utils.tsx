export const assert: <T extends U, U = unknown>(
  value: U,
  validate: (v: U) => boolean
) => asserts value is T = (value, validate) => {
  if (!validate(value)) {
    throw new TypeError(`value has invalid type: ${value}`);
  }
};

export const isNonNullable = <T,>(
  v: T
): v is T extends infer U | null | undefined ? U : T => v != undefined;

export function toTimeString(time: number): string {
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  return (
    [hours, minutes, seconds]
      .map((number_) => number_.toString())
      .map((string_) => string_.padStart(2, "0"))
      .join("")
      .replace(/^0*/, "") || "0"
  );
}

export function toTotalSeconds(value: string): number {
  const timeString = value.padStart(6, "0");

  const hours = Number(timeString.slice(0, 2));
  const minutes = Number(timeString.slice(2, 4));
  const seconds = Number(timeString.slice(4, 6));

  return (hours * 60 + minutes) * 60 + seconds;
}
