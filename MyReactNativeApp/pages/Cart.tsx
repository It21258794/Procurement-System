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
  View,
  Slider,
  Slide,
  CheckIcon,
  Alert,
  VStack,
  IconButton,
  CloseIcon,
} from "native-base";
import React from "react";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { LogBox } from "react-native";

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
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = React.useState("");
  const [onChangeValue, setOnChangeValue] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  let quantity: number = 0;
  let id: string = "";
  LogBox.ignoreAllLogs();

  //get cart items
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

  //delete items
  const handleDelete = (itemId: string) => {
    axios
      .delete(
        `https://w3hjd9wt-8000.asse.devtunnels.ms/api/cart/deleteItem/${itemId}`
      )
      .then((response) => {
        if (response.status === 200) {
          setcartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== itemId)
          );
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  //clear items
  const clearCart = () => {
    axios
      .delete(`https://w3hjd9wt-8000.asse.devtunnels.ms/api/cart/clearCart`)
      .then((response) => {
        setcartItems([]);
        console.error("Cleared successfully:");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // const handleUpdate = () => {
  //   const updatedData = {
  //     quantity: onChangeValue,
  //   };

  //   axios
  //     .put(
  //       `https://w3hjd9wt-8000.asse.devtunnels.ms/api/cart/updateCart/${id}`,
  //       updatedData
  //     )
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("Item updated successfully:", response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating item:", error);
  //     });
  // };

  //setting quantities
  const setQuantity = (qty: number) => {
    quantity = qty;
  };

  //setting id
  const setId = (itemId: string) => {
    id = itemId;
  };

  //setting items for order
  const items = cartItem.map((item) => ({
    itemName: item.itemName,
    type: "Ecommerce",
    quantity: item.quantity,
    price: item.price,
  }));

  //calculating total
  const totalCost = cartItem.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.price * currentItem.quantity;
  }, 0);

  //preparing payload
  const orderDetails = {
    siteId: "1",
    supplierId: "652d463f4b9c41b337cdcd0f",
    address: "1",
    requiredDate: date,
    items: items,
    total_cost: totalCost,
    description: description,
  };

  //creating a order
  const createOrder = () => {
    console.log(orderDetails);
    axios
      .post(
        "https://w3hjd9wt-8000.asse.devtunnels.ms/api/order/createOrder",
        orderDetails
      )
      .then((response) => {
        console.log("Order created:", response.data);
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  if (cartItem.length > 0) {
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
                  margin="2"
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
                      Rs.{(cartItem.quantity * cartItem.price).toFixed(2)}
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
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      color="red"
                      onPress={() => {
                        setId(cartItem._id);
                        setQuantity(cartItem.quantity);
                        setShowUpdateModal(true);
                      }}
                      margin="2"
                      width="45%"
                    >
                      Update
                    </Button>
                    <Button
                      color="red"
                      onPress={() => handleDelete(cartItem._id)}
                      margin="2"
                      width="45%"
                    >
                      Delete
                    </Button>
                  </View>
                </Box>
              );
            }}
          </Pressable>
        ))}

        <Button margin="2" onPress={() => setShowModal(true)}>
          Create Order
        </Button>
        <Button margin="2" onPress={() => clearCart()}>
          Clear cart
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
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

        <Modal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Update Item</Modal.Header>
            <Modal.Body>
              <FormControl.Label>Quantity - {onChangeValue}</FormControl.Label>
              <Slider
                w="100%"
                maxW="100%"
                defaultValue={0}
                minValue={0}
                maxValue={50}
                accessibilityLabel="hello world"
                step={1}
                onChange={(v) => {
                  setOnChangeValue(Math.floor(v));
                }}
              >
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowUpdateModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={() => {
                    setShowUpdateModal(false);
                    //handleUpdate();
                  }}
                >
                  Confirm
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Slide in={isOpen} placement="top">
          <Box
            w="100%"
            position="absolute"
            p="2"
            borderRadius="xs"
            bg="emerald.100"
            alignItems="center"
            justifyContent="center"
            _dark={{
              bg: "emerald.200",
            }}
            safeArea
          >
            <HStack space={2}>
              <CheckIcon
                size="4"
                color="emerald.600"
                mt="1"
                _dark={{
                  color: "emerald.700",
                }}
              />
              <Text
                color="emerald.600"
                textAlign="center"
                _dark={{
                  color: "emerald.700",
                }}
                fontWeight="medium"
              >
                Order Placed Successfully.
              </Text>
            </HStack>
          </Box>
        </Slide>
      </ScrollView>
    );
  } else {
    return (
      <Center>
        <Alert maxW="400" status="info" colorScheme="info" margin="10">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                  Items not available
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" />}
                _icon={{
                  color: "coolGray.600",
                }}
              />
            </HStack>
            <Box
              pl="6"
              _text={{
                color: "coolGray.600",
              }}
            >
              Please insert items before creating an order
            </Box>
          </VStack>
        </Alert>
      </Center>
    );
  }
}

export default Cart;
