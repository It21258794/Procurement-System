import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";

import {
  NativeBaseProvider,
  Text,
  Box,
  AspectRatio,
  Center,
  HStack,
  Heading,
  Stack,
  Button,
} from "native-base";

export default function ItemCard({ navigation }) {
  return (
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
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
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
            Wood
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Item Name
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
              Supplier Name
            </Text>
          </Stack>
          <Text fontWeight="400"></Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Button onPress={() => navigation.navigate("../pages/Cart")}>
                View
              </Button>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
