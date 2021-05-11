import { useCallback } from "react";

import { Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

function escape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function NumericInput({
  value,
  onChange,
  invalid,
  disabled,
  element,
}) {
  const onChangeFilter = useCallback(
    (event) => {
      const val = event.target.value.replace(/,/g, ".");
      if ((val === "" || inputRegex.test(escape(val))) && !disabled) {
        onChange(val);
      }
    },
    [value, onChange]
  );
  return (
    <InputGroup>
      <Input
        value={value}
        onChange={onChangeFilter}
        inputMode="decimal"
        title="Token Amount"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={"0.0"}
        height="14"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        fontSize="xl"
        readOnly={disabled}
        isInvalid={invalid || false}
        pr="48px"
      />
      <InputRightElement
        width="48px"
        pointerEvents="none"
        color="gray.600"
        fontSize="1.2em"
        height="14"
        children={element}
      />
    </InputGroup>
  );
}
