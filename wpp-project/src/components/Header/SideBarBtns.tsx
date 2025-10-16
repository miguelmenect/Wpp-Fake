import { Button, type ButtonProps } from "@chakra-ui/react";
import { useState } from "react";

interface SideBarBtnsProps extends ButtonProps {
  icon: React.FC<{ isFill?: boolean }>;
  label: string;
  isActive?: boolean;
}

export default function SideBarBtns({ icon: Icon, label, isActive = false, onClick }: SideBarBtnsProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Button
      bg={isActive ? "#EAE9E7" : "transparent"}
      _hover={{ bg: "#EAE9E7" }}
      _focus={{
        bg: "#EAE9E7",
        boxShadow: "none",
        outline: "none"
      }}
      outline="none"
      border="none"
      borderRadius="50%"
      h="40px"
      minW="40px"
      p={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={onClick}
      aria-label={label}
    >
      <Icon isFill={isFocused || isActive} />
    </Button>
  );
}