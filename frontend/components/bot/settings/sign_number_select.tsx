import { Select } from "@mantine/core";

interface SelectProps {
  defaultValue: string;
}

const SignNumberSelect = ({ defaultValue }: SelectProps) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 86 }}
      data={[
        { value: "-", label: "-" },
        { value: "+", label: "+" },
      ]}
    />
  );
};

export default SignNumberSelect