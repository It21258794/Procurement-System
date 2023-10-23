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
  Modal,
  FormControl,
  Input,
  TextArea,
  Center,
} from "native-base";
import React from "react";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface CartData {
  _id: string;
  itemName: string;
  type: string;
  quantity: number;
  supplierId: string;
  description: string;
  price: number;
}

function Cart() {
  const [cartItem, setcartItems] = useState<CartData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = React.useState("");

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

  const handleDelete = (itemId: string) => {
    axios
      .delete(
        `https://w3hjd9wt-8000.asse.devtunnels.ms/api/cart/deleteItem/${itemId}`
      )
      .then((response) => {
        if (response.status === 200) {
          // Update the cartItems state after successful deletion
          setcartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== itemId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const [newOrderData, setNewOrderData] = useState({
    items: [] as {
      itemName: string;
      type?: string;
      quantity: number;
      price: number;
    }[],
  });

  // const orderData = () => {
  //   setNewOrderData({

  //   });
  // };

  const items = cartItem.map((item) => ({
    itemName: item.itemName,
    type: "lol",
    quantity: item.quantity,
    price: item.price,
  }));

  const totalCost = cartItem.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  const orderDetails = {
    siteId: "1",
    supplierId: "652d463f4b9c41b337cdcd0f",
    address: "1",
    requiredDate: date,
    items: items,
    total_cost: totalCost,
    description: description,
  };

  const createOrder = () => {
    //orderData();
    console.log(orderDetails);
    axios
      .post(
        "https://w3hjd9wt-8000.asse.devtunnels.ms/api/order/createOrder",
        orderDetails
      )
      .then((response) => {
        console.log("Order created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

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
                  <Button
                    color="red"
                    onPress={() => handleDelete(cartItem._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            );
          }}
        </Pressable>
      ))}

      <Button onPress={() => setShowModal(true)}>Create Order</Button>
      <Button onPress={() => setShowModal(true)}>Clear cart</Button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Required date</FormControl.Label>
              <Center>
                <RNDateTimePicker
                  mode="date"
                  value={date}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setDate(selectedDate);
                    }
                  }}
                />
              </Center>
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Additional details</FormControl.Label>
              <TextArea
                h={20}
                placeholder="Text Area Placeholder"
                w="100%"
                maxW="100%"
                value={description}
                onChangeText={(text) => setDescription(text)}
                autoCompleteType={undefined}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  createOrder();
                }}
              >
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
}

export default Cart;
