// DetailsScreen.js
import axios from "axios";
import {
  Box,
  HStack,
  Badge,
  Spacer,
  Flex,
  Text,
  Pressable,
  ScrollView,
  Divider,
} from "native-base";
import React, { useEffect, useState } from "react";

interface IOrder {
  orderId: string;
  siteId: string;
  supplierId: string;
  address?: string;
  month_year?: string;
  requiredDate: Date;
  items: Items[];
  total_cost: number;
  status: string;
  description?: string;
}

interface Items {
  itemName: string;
  type: string;
  quantity: number;
  price: number;
}

function OrderList() {
  const [orderList, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    axios
      .get<IOrder[]>(
        "https://w3hjd9wt-8000.asse.devtunnels.ms/api/order/getAllOrders"
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching card data:", error);
      });
  }, []);

  return (
    <ScrollView>
      {orderList.map((orders, index) => (
        <Box alignItems="center">
          <Pressable
            onPress={() => console.log(orderList)}
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="coolGray.300"
            maxW="96"
            shadow="3"
            bg="coolGray.100"
            p="5"
          >
            <Box>
              <HStack alignItems="center">
                <Badge
                  colorScheme="darkBlue"
                  _text={{
                    color: "white",
                  }}
                  variant="solid"
                  rounded="4"
                >
                  {orders.status}
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  {orders.requiredDate.toString()}
                </Text>
              </HStack>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl"
              >
                Order number {orders.orderId}
              </Text>
              {orders.items.map((item, index) => (
                <Flex direction="row" h="58" p="4">
                  <Text>{item.itemName}</Text>
                  <Divider
                    bg="emerald.500"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <Text>{item.quantity}</Text>
                  <Divider
                    bg="indigo.500"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <Text>{item.price}</Text>
                  <Divider
                    bg="indigo.500"
                    thickness="2"
                    mx="2"
                    orientation="vertical"
                  />
                  <Text>{(item.quantity * item.price).toFixed(2)}</Text>
                </Flex>
              ))}
              <Flex>
                <Text
                  mt="2"
                  fontSize={12}
                  fontWeight="medium"
                  color="darkBlue.600"
                >
                  Read More
                </Text>
              </Flex>
            </Box>
          </Pressable>
        </Box>
      ))}
    </ScrollView>
  );
}

export default OrderList;
