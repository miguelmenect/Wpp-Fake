import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
  icon: string;
  label: string;
  color?: string;
}

interface DropdownOptProps {
  isOpen: boolean;
  roundedType?: boolean;
  w?: string | number;
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  isFilled?: boolean;
  onClose: () => void;
  linePosition?: number;
  menuOptions: MenuItem[];
}

export default function DropdownOpt({
  isOpen,
  roundedType = false,
  onClose,
  linePosition,
  menuOptions,
  w = "223px",
  top, right,
  left,
  bottom,
  isFilled = false,
}: DropdownOptProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // detecta clicks fora do dropdown para fechar
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
      // posicionamento dinâmico: para cima ou para baixo
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      position="absolute"
      w={w}
      minH="189px"
      bg="#FFF"
      borderRadius="16px"
      boxShadow="0 2px 8px rgba(11, 20, 26, 0.26)"
      zIndex={100}
    >
      <VStack align={"center"} justify={"flex-start"} spacing={0} w="full" p="10px">
        {menuOptions.filter(item => item.icon.trim() !== "" && item.label.trim() !== "").map((item, index) => {
          const afterDiv = linePosition !== undefined && index > linePosition;
          return (
            <Box key={index} w="full">
              <Button
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                px={"7px"}
                borderRadius="8px"
                minH="40px"
                role="group"
                _hover={{ bg: !afterDiv ? "#F6F5F4" : "#F9EBEF" }
                }
                onClick={onClose}
              >
                <HStack w="full" justify={"flex-start"}>
                  <Text
                    as={"span"}
                    className={!roundedType ? "material-symbols-outlined" : "material-symbols-rounded"}
                    fontSize={"24px"}
                    color={item.color || "#666666"}
                    _groupHover={{ color: afterDiv ? "#B80531" : (item.color || "#666666") }}
                    lineHeight={"16px"}
                    sx={{
                      "&": {
                        fontVariationSettings: `
                        'FILL' ${isFilled ? 1 : 0},
                        'wght' 400,
                        'GRAD' 0, 
                        'opsz' 24
                        `
                      }
                    }}
                  >
                    {item.icon}
                  </Text>
                  <Text
                    color={"#666666"}
                    fontSize={"16px"}
                    fontWeight={400}
                    lineHeight={"16px"}
                    fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
                    _groupHover={{ color: afterDiv ? "#B80531" : "#666666" }}
                  >
                    {item.label}
                  </Text>
                </HStack>
              </Button>
              {index === linePosition && (
                <Divider w="full" h="1px" bg="#E5E5E5" my="5px" />
              )}
            </Box>
          );
        })}
      </VStack >
    </Box >
  );
}