// HomeScreen.js
import ItemCard from "../components/ItemCard";
import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { ShoppingCartOutlined } from "@ant-design/icons";

import {
  Text,
  Box,
  AspectRatio,
  Center,
  HStack,
  Heading,
  Stack,
  Button,
  Fab,
} from "native-base";
import axios from "axios";

interface CardData {
  _id: string;
  itemName: string;
  type: string;
  img: string;
  quantity: number;
  supplierId: string;
  supplierUsername: string;
  price: number;
}

function HomeScreen({ navigation }) {
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    axios
      .get<CardData[]>(
        "https://w3hjd9wt-8000.asse.devtunnels.ms/api/item/getAllItem"
      )
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, []);

  return (
    <View>
      <ScrollView>
        {cards.map((card, index) => (
          <Box alignItems="center">
            <Box
              marginTop="10"
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: card.img,
                    }}
                    alt="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                  />
                </AspectRatio>
                <Center
                  bg="violet.500"
                  _dark={{
                    bg: "violet.400",
                  }}
                  _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs",
                  }}
                  position="absolute"
                  bottom="0"
                  px="3"
                  py="1.5"
                >
                  {card.type}
                </Center>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {card.itemName}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    {card.supplierUsername}
                  </Text>
                </Stack>
                <Text fontWeight="400"></Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Button
                      onPress={() =>
                        navigation.navigate("ItemScreen", {
                          id: card._id,
                          itemName: card.itemName,
                          price: card.price,
                          img: card.img,
                          quantity: card.quantity,
                          supplierId: card.supplierId,
                          type: card.type,
                        })
                      }
                    >
                      View
                    </Button>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        ))}
      </ScrollView>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        onPress={() => navigation.navigate("Orders")}
      />
    </View>
  );
}

export default HomeScreen;
