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
): v is T extends infer U | null | undefined ? U : T => v != null;

export function toTimeString(time: number): string {
  const seconds = time % 60;
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);

  return (
    [hours, minutes, seconds]
      .map((num) => num.toString())
      .map((str) => str.padStart(2, "0"))
      .join("")
      .replace(/^0*/, "") || "0"
  );
}
