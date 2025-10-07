import { Button } from "@chakra-ui/react";
import { useState } from "react";

interface SideBarBtnsProps {
  icon: React.FC<{ isFill?: boolean }>;
  label: string;
}

export default function SideBarBtns({ icon: Icon, label }: SideBarBtnsProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Button
      bg="transparent"
      _hover={{ bg: "#EAE9E7" }}
      _focus={{
        bg: "#EAE9E7",
        boxShadow: "none",
        outline: "none"
      }}
      outline="none"
      border="none"
      borderRadius="50%"
      w="48px"
      h="48px"
      minW="48px"
      p={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label={label}
    >
      <Icon isFill={isFocused} />
    </Button>
  );
}