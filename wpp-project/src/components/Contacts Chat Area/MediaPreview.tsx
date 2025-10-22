import { Image, Button, Box, Text, HStack, VStack, Input, InputRightElement, InputGroup, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ViewOnce } from "../../utils/Icons";

interface MediaPreviewProps {
  onClose: () => void;
  onSend: (caption: string) => void;
  media: {
    preview: string;
    type: 'image' | 'video';
    file: File;
  };
}

export default function MediaPreview({ onClose, onSend, media }: MediaPreviewProps) {
  const [caption, setCaption] = useState("");
  const [isViewOnce, setIsViewOnce] = useState(false);

  const editIcons = [
    "crop_rotate",
    "wand_shine",
    "edit",
    "match_case",
    "crop_square",
    "blur_on",
    "mood",
    "note_stack",
    "hd"
  ];

  const handleSend = () => {
    onSend(caption.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <VStack h="full" w="full">
      <VStack
        align={"center"}
        w="full"
        p="8px 16px"
        justify={"flex-end"}
        spacing={"35px"}
      >
        <HStack
          w="full"
          h="72px"
          justify={"space-between"}
        >
          <Button
            onClick={onClose}
            bg="transparent"
            _hover={{ bg: "#F7F5F3" }}
            borderRadius="full"
            boxSize="40px"
            p="0"
          >
            <Text
              as="span"
              className="material-symbols-outlined"
              fontSize="24px"
              color="#00000099"
            >
              close
            </Text>
          </Button>

          <HStack spacing="8px">
            {editIcons.map((icon, index) => (
              <Button
                key={index}
                bg="transparent"
                _hover={{ bg: "#F7F5F3" }}
                borderRadius="full"
                boxSize="40px"
                p="0"
              >
                <Text
                  as="span"
                  className="material-symbols-rounded"
                  fontSize="24px"
                  color="#00000099"
                  transform={icon === "wand_shine" ? "scaleX(-1)" : "none"}
                >
                  {icon}
                </Text>
              </Button>
            ))}
          </HStack>

          <Button
            bg="transparent"
            _hover={{ bg: "#F7F5F3" }}
            borderRadius="full"
            boxSize="40px"
            p="0"
          >
            <Text
              as="span"
              className="material-symbols-outlined"
              fontSize="24px"
              color="#00000099"
            >
              download
            </Text>
          </Button>
        </HStack>
        {media.type === 'image' ? (
          <Image
            src={media.preview}
            alt="Preview"
            maxH="262px"
            maxW="262px"
            objectFit="contain"
            boxShadow="0 3px 12px rgba(11, 20, 26, 0.16)"
          />
        ) : (
          <Box
            as="video"
            src={media.preview}
            controls
            maxH="262px"
            maxW="262px"
            borderRadius="8px"
          />
        )}
        <HStack
          w="650px"
          h="45px"
          mx="80px"
          spacing={"1px"}
        >
          <InputGroup w="full">
            <Input
              type="text"
              bg="#F7F5F3"
              outline={"none"}
              border="none"
              borderRadius="8px"
              p="4px 16px"
              w='full'
              minH="45px"
              maxW="616px"
              placeholder="Digite uma mensagem"
              _hover={{
                border: "none",
                outline: "none"
              }}
              _focus={{
                border: "none",
                boxShadow: "none",
                outline: "none"
              }}
              _active={{
                border: "none",
                boxShadow: "none",
                outline: "none"
              }}
              onChange={(e) => setCaption(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <InputRightElement h="full" pr="10px" cursor="pointer">
              <Text
                as="span"
                className="material-symbols-outlined"
                fontSize="24px"
                color="#00000099"
              >
                mood
              </Text>
            </InputRightElement>
          </InputGroup>
          <Button
            p="0"
            boxSize={"26px"}
            borderRadius={"full"}
            bg="transparent"
            _hover={{
              bg: "transparent"
            }}
            onClick={() => setIsViewOnce(!isViewOnce)}
          >
            <ViewOnce isFill={isViewOnce} />
          </Button>
        </HStack>
      </VStack>
      <HStack
        justify={"center"}
        h="99px"
        w="full"
        px="20px"
        borderTop="1px solid #DEDCDA"
      >
        <Flex justify={"center"} w="full" gap="12px">
          <Image
            src={media.preview}
            boxSize={"52px"}
            borderRadius={"3px"}
            cursor={"pointer"}
            border="3px solid #1DAA61"
          />
          <Flex
            boxSize="52px"
            borderRadius="3px"
            align="center"
            justify="center"
            cursor="pointer"
            border="1px solid #00000099"
          >
            <Text
              as="span"
              className="material-symbols-outlined"
              fontSize="24px"
              color="#00000099"
            >
              add
            </Text>
          </Flex>
        </Flex>
        <Button
          bg="#1DAA61"
          _hover={{ bg: "#1DAA61" }}
          borderRadius={"full"}
          boxSize={"60px"}
          boxShadow="1px 3px 8px rgba(11, 20, 26, 0.25)"
          onClick={handleSend}
        >
          <Text
            as="span"
            className="material-symbols-rounded"
            fontSize="30px"
            color="white"
            sx={{
              "&": {
                fontVariationSettings: `'FILL' 1, 
                        'wght' 400,
                        'GRAD' 0, 
                        'opsz' 24`
              }
            }}
          >
            send
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
}