import { Box, Divider, VStack, Image, Button } from "@chakra-ui/react";
import SideBarBtns from "./SideBarBtns";
import { sidebarButtons } from "./sidebarConfig";

export default function SideBar() {
  // filtra icones até community
  const mainButtons = sidebarButtons.filter(
    (button) => button.id !== 'settings'
  );

  // pega apenas o botão de settings
  const settingsButton = sidebarButtons.find(
    (button) => button.id === 'settings'
  );

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      maxW="64px"
      h="100vh"
      bg="#F7F5F3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={"5px"}
      zIndex={100}
    >
      <VStack h="100%" justify="space-between" px="12px">
        {/* Seção superior - botões principais */}
        <VStack spacing={"0px"} justify={"flex-start"}>
          {mainButtons.map((button) => (
            <Box key={button.id}>
              <SideBarBtns
                icon={button.icon}
                label={button.label}
              />
              {button.id === "community" && (
                <>
                  <Divider w="full" maxW="40px" h="1px" bg="#0000001A" my="10px" />
                  <Box
                    as="button"
                    w="40px"
                    h="40px"
                    borderRadius="50%"
                    overflow="hidden"
                    cursor="pointer"
                    border="none"
                    bg="transparent"
                    _hover={{ bg: "#EAE9E7" }}
                    _focus={{
                      bg: "#EAE9E7",
                      boxShadow: "none",
                      outline: "none"
                    }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src="/img/W2MDyeo0zkf.png"
                      alt="metaAi-icon"
                      maxW="20px"
                      maxH="20px"
                      objectFit="cover"
                    />
                  </Box>
                </>
              )}
            </Box>
          ))}
        </VStack>
        <VStack spacing={"0px"}>
          {settingsButton && (
            <SideBarBtns
              icon={settingsButton.icon}
              label={settingsButton.label}
            />
          )}
          <Box
            as="button"
            w="40px"
            h="40px"
            borderRadius="50%"
            overflow="hidden"
            cursor="pointer"
            border="none"
            bg="transparent"
            _hover={{ bg: "#EAE9E7" }}
            _focus={{
              bg: "#EAE9E7",
              boxShadow: "none",
              outline: "none"
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              borderRadius="50%"
              src="/img/profile-pic.png"
              alt="profile-picture"
              maxW="28px"
              maxH="28px"
              objectFit="cover"
            />
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
}