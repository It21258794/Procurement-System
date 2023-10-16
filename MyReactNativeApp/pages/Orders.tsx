import axios from "axios";
import {
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
  Pressable,
  Text,
  ScrollView,
  Button,
} from "native-base";
import { useEffect, useState } from "react";

interface CartData {
  _id: string;
  itemName: string;
  type: string;
  quantity: number;
  supplierId: string;
  description: string;
  price: number;
}

function Orders() {
  const [cartItem, setcartItems] = useState<CartData[]>([]);

  useEffect(() => {
    axios
      .get<CartData[]>(
        "https://w3hjd9wt-8000.asse.devtunnels.ms/api/cart/getCart"
      )
      .then((response) => {
        console.log(response.data);
        setcartItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, []);

  return (
    <ScrollView>
      {cartItem.map((cartItem, index) => (
        <Pressable>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Box
                maxW="96"
                borderWidth="1"
                borderColor="coolGray.300"
                shadow="3"
                bg={
                  isPressed
                    ? "coolGray.200"
                    : isHovered
                    ? "coolGray.200"
                    : "coolGray.100"
                }
                p="5"
                rounded="8"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}
              >
                <HStack alignItems="center">
                  <Badge
                    colorScheme="darkBlue"
                    _text={{
                      color: "white",
                    }}
                    variant="solid"
                    rounded="4"
                  >
                    {cartItem.type}
                  </Badge>
                  <Spacer />
                  <Text fontSize={10} color="coolGray.800">
                    Rs.{cartItem.price * cartItem.quantity}
                  </Text>
                </HStack>
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                >
                  {cartItem.itemName}
                </Text>
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  {cartItem.description}
                </Text>
                <Flex>
                  <Button color="red">Delete</Button>
                </Flex>
              </Box>
            );
          }}
        </Pressable>
      ))}

      <Button>Create Order</Button>
    </ScrollView>
  );
}

export default Orders;
