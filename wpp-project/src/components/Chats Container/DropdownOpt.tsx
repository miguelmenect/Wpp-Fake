import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface MenuItem {
  icon: string;
  label: string;
}

interface DropdownOptProps {
  isOpen: boolean;
  onClose: () => void;
  menuOptions: MenuItem[];
}

export default function DropdownOpt({ isOpen, onClose, menuOptions }: DropdownOptProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Box
      ref={dropdownRef}
      top="52px"
      left="270px"
      position="absolute"
      w="223px"
      minH="189px"
      bg="#FFF"
      borderRadius="16px"
      boxShadow="0 2px 8px rgba(11, 20, 26, 0.26)"
      p="20px"
      zIndex={10}
    >
      <VStack align={"center"} justify={"flex-start"} spacing={0}>
        {menuOptions.map((item, index) => {
          const isPenult = index === menuOptions.length - 2;
          return (
            <Box key={index}>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                px={"7px"}
                borderRadius="8px"
                minH="40px"
                minW="203px"
                role="group"
                _hover={{ bg: item.label !== "Desconectar" ? "#F6F5F4" : "#F9EBEF" }}
                onClick={onClose}
              >
                <HStack>
                  <Text
                    as={"span"}
                    className="material-symbols-outlined"
                    fontSize={"24px"}
                    color={"#626262"}
                    _groupHover={{ color: item.label === "Desconectar" ? "#B80531" : "#626262" }}
                    lineHeight={"16px"}
                  >
                    {item.icon}
                  </Text>
                  <Text
                    color={"#626262"}
                    fontSize={"16px"}
                    fontWeight={400}
                    lineHeight={"16px"}
                    fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                    _groupHover={{ color: item.label === "Desconectar" ? "#B80531" : "#626262" }}
                  >
                    {item.label}
                  </Text>
                </HStack>
              </Button>
              {isPenult && (
                <Divider w="full" h="1px" bg="#E5E5E5" my="5px" />
              )}
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}