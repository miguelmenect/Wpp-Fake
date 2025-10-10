import { Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function FilterBtns() {
  const filterOptions = ["Tudo", "Não lidas", "Favoritas", "Grupos"];
  const [activeFilter, setActiveFilter] = useState("Tudo");
  return (
    <HStack maxW="409px" align={"flex-start"} spacing={"6px"}>
      {filterOptions.map((option) => (
        <Button
          key={option}
          h="32px"
          borderRadius="full"
          bg={activeFilter === option ? "#D9FDD3" : "transparent"}
          _hover={{ bg: activeFilter === option ? "#D9FDD3" : "#F6F5F4" }}
          border="1px solid #C5C4C3"
          onClick={() => setActiveFilter(option)}
          px="12px"
        >
          <Text
            fontFamily='"Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif'
            fontSize={"15px"}
            fontWeight={400}
            color={activeFilter === option ? "#15603E" : "#666666"}
            lineHeight="19.995px"
          >
            {option}
          </Text>
        </Button>
      ))
      }
    </HStack>
  )

}