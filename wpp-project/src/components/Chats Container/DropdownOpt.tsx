import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface MenuItem {
  icon: string;
  label: string;
}

interface DropdownOptProps {
  isOpen: boolean;
  onClose: () => void;
  linePosition?: number;
  menuOptions: MenuItem[];
}

export default function DropdownOpt({ isOpen, onClose, linePosition = 1, menuOptions }: DropdownOptProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openUpwards, setOpenUpwards] = useState(false);

  // Detecta clicks fora do dropdown para fechar
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

  // Detecta se deve abrir para cima ou para baixo
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const checkPosition = () => {
        if (dropdownRef.current) {
          const rect = dropdownRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calcula o espaço disponível abaixo do dropdown
          const spaceBelow = viewportHeight - rect.top;
          const dropdownHeight = rect.height;

          // Se não houver espaço suficiente embaixo, abre para cima
          setOpenUpwards(spaceBelow < dropdownHeight + 20); // +20 para margem de segurança
        }
      };

      // Executa após renderização completa
      requestAnimationFrame(checkPosition);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Box
      ref={dropdownRef}
      // posicionamento dinâmico: para cima ou para baixo
      top={openUpwards ? "auto" : "52px"}
      bottom={openUpwards ? "52px" : "auto"}
      left={openUpwards ? "auto" : "403.797px"}
      position="absolute"
      w="223px"
      minH="189px"
      bg="#FFF"
      borderRadius="16px"
      boxShadow="0 2px 8px rgba(11, 20, 26, 0.26)"
      p="10px 20px 10px 20px"
      zIndex={100}
    >
      <VStack align={"center"} justify={"flex-start"} spacing={0}>
        {menuOptions.map((item, index) => {
          const afterDiv = index > linePosition;
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
                _hover={{ bg: !afterDiv ? "#F6F5F4" : "#F9EBEF" }}
                onClick={onClose}
              >
                <HStack>
                  <Text
                    as={"span"}
                    className="material-symbols-outlined"
                    fontSize={"24px"}
                    color={"#666666"}
                    _groupHover={{ color: afterDiv ? "#B80531" : "#666666" }}
                    lineHeight={"16px"}
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
      </VStack>
    </Box>
  );
}