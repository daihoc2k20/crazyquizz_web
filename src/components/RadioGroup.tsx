import { Box, useRadio, useRadioGroup } from "@chakra-ui/react";

export function RadioItem(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        justifyContent="flex-start"
        display="flex"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: {
    value: string;
    content: string;
  }[];
  value: string;
  onChange: (e: string) => void;
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: onChange,
    value: value,
  });

  const group = getRootProps();

  return (
    <Box
      {...group}
      display="flex"
      alignItems="cneter"
      flexDirection="column"
      gap="10px"
    >
      {options.map((value, index) => {
        const radio = getRadioProps({
          value: value.value,
          children: value.content,
        });
        return (
          <RadioItem key={index} {...radio}>
            {value.content}
          </RadioItem>
        );
      })}
    </Box>
  );
}
