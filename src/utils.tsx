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
