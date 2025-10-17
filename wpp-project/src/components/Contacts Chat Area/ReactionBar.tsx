import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

export default function ReactionBar({ onClose }: { onClose?: () => void }) {
  const urlImages = [
    "/img/emojis/2.png",
    "/img/emojis/1.png",
    "/img/emojis/3.png",
    "/img/emojis/4.png",
    "/img/emojis/5.png",
    "/img/emojis/6.png",
  ];

  const handleSelect = (emojiUrl: string) => {
    if (onClose) onClose();
  };

  return (
    <MotionFlex
      w="308px"
      h="56px"
      px="10px"
      bg="#FFF"
      align="center"
      borderRadius="full"
      boxShadow="0 2px 5px rgba(11, 20, 26, 0.26)"
      position={"absolute"}
      zIndex={9999}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{
        duration: 0.18,
        ease: [0.25, 0.1, 0.25, 1], // suavização
      }}
    >
      <HStack spacing="5px" align="center" justify={"center"}>
        {urlImages.map((url, index) => (
          <MotionImage
            key={index}
            src={url}
            alt={`Emoji ${index + 1}`}
            boxSize="37px"
            p={0}
            cursor="pointer"
            onClick={() => handleSelect(url)}
            initial={{ scale: 0, opacity: 0, x: -10 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.09, // delay incrementado para cada emoji da reactionbar
              ease: [0.34, 1.56, 0.64, 1], // easing com bounce suave
            }}
          />
        ))}
        <Button
          bg="#F6F5F4"
          _hover={{ bg: "#F6F5F4" }}
          w="32px"
          h="32px"
          p={0}
          borderRadius={"full"}
          minW="unset"
          onClick={onClose}
        >
          <Text
            as="span"
            className="material-symbols-outlined"
            fontSize="24px"
            color="#00000099"
          >
            add
          </Text>
        </Button>
      </HStack>
    </MotionFlex>
  );
}