import {
  Container,
  Box,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Portal,
  useMediaQuery,
  Flex,
  Text,
  useCounter,
  HStack,
  Spinner,
  Heading,
  Icon,
  Checkbox
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoxShadow, hoverColor } from "../Variables";
import { BiEditAlt } from "react-icons/bi";
import { AiFillDollarCircle,AiFillMessage } from "react-icons/ai";
// import SimpleBarReact from "simplebar-react";
//  import "simplebar/src/simplebar.css";


function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan492] = useMediaQuery("(min-width: 492px)");

  const counter = useCounter({
    max: 10,
    min: 0,
    step: 1,
  });

  const Stays = () => {
    const [stayData, setStayData] = useState({
      city: "",
      checkin: "",
      checkout: "",
      room: 1,
      adult: 1,
      children: 1,
    });

    const onChangeInput = (e) => {
      const { id, value } = e.target;
      setStayData({ ...stayData, [id]: value });
    };

    const onIncrementCounter = (e) => {
      let { id, value } = e.target;
      if (value >= 10) {
        return false;
      }
      value = parseInt(value);
      console.log(value, typeof value);
      setStayData({ ...stayData, [id]: value + 1 });
    };

    const onDecrementCounter = (e) => {
      let { id, value } = e.target;
      if (
        (id == "room" && stayData.room <= 1) ||
        (id == "adult" && stayData.adult <= 1)
      ) {
        return false;
      }
      if (value <= 0) {
        return false;
      }
      value = parseInt(value);
      setStayData({ ...stayData, [id]: value - 1 });
    };

    let navigate = useNavigate();
    const redirect = (e) => {
      localStorage.setItem("staySearch", JSON.stringify(stayData));
      console.log(`redirecting to /stays/${stayData.city}`);
      navigate(`/stays/${stayData.city}`);
    };

    return (
      <>
        <Flex
        display="flex"
          
          justify="space-between"
          gap="2"
          mb="20px"
          // w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} />
            <Input
              value={stayData.city}
              type="text"
              id="city"
              onChange={(e) => {
                onChangeInput(e);
              }}
              placeholder="Enter a location e.g.Goa,Bengaluru,Jammu"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} />
            <Input
              value={stayData.checkin}
              id="checkin"
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="date"
              placeholder="Basic usage"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} />
            <Input
              value={stayData.checkout}
              id="checkout"
              onChange={(e) => {
                onChangeInput(e);
              }}
              type="date"
              placeholder="Basic usage"
            />
          </InputGroup>
          <InputGroup>
            <Popover>
              <PopoverTrigger>
              <Button>
                  Travellers :-{" "}
                  {isLargerThan492
                    ? ` ${stayData.room} room , ${
                        stayData.adult + stayData.children
                      } travellers`
                    : `${stayData.room}R ,  ${
                        stayData.adult + stayData.children
                      }T`}
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Travellers</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody>
                    {/* <Flex align="center" gap="4" justify="space-between">
                      <Text>Room</Text>
                      <HStack w="150px" m={2}>
                        <Button
                          id="room"
                          value={stayData.room}
                          onClick={(e) => {
                            onIncrementCounter(e);
                          }}
                        >
                          +
                        </Button>
                        <Input m={2} value={stayData.room} readOnly={true} />
                        <Button
                          id="room"
                          value={stayData.room}
                          onClick={(e) => {
                            onDecrementCounter(e);
                          }}
                        >
                          -
                        </Button>
                      </HStack>
                    </Flex> */}
                    <Flex align="center" gap="4" justify="space-between">
                      <Text>Adults </Text>
                      <HStack w="150px" m={2}>
                        <Button
                          id="adult"
                          value={stayData.adult}
                          onClick={(e) => {
                            onIncrementCounter(e);
                          }}
                        >
                          +
                        </Button>
                        <Input m={2} value={stayData.adult} readOnly={true} />
                        <Button
                          id="adult"
                          value={stayData.adult}
                          onClick={(e) => {
                            onDecrementCounter(e);
                          }}
                        >
                          -
                        </Button>
                      </HStack>
                    </Flex>
                    <Flex align="center" gap="4" justify="space-between">
                      <Text>Children</Text>
                      <HStack w="150px" m={2}>
                        <Button
                          id="children"
                          value={stayData.children}
                          onClick={(e) => {
                            onIncrementCounter(e);
                          }}
                        >
                          +
                        </Button>
                        <Input
                          m={2}
                          value={stayData.children}
                          readOnly={true}
                        />
                        <Button
                          id="children"
                          value={stayData.children}
                          onClick={(e) => {
                            onDecrementCounter(e);
                          }}
                        >
                          -
                        </Button>
                      </HStack>
                    </Flex>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </InputGroup>
        </Flex>
        <Box ml="-800px">
        <Checkbox ml="20px" >Add a flight</Checkbox>
        <Checkbox  ml="20px">Add a car</Checkbox>
        </Box>
        <Button
          colorScheme="blue"
          onClick={(e) => {
            console.log(stayData);
            redirect(e);
          }}
        >
          Search
        </Button>
      </>
    );
  };

  const Packages = () => {
    return (
      <>
        <Flex
        display="flex"
          // flexWrap="wrap"
          justify="space-between"
          gap="2"
          w={isLargerThan768 ? "50%" : "90%"}
          mb="20px"
        >
          
          <InputGroup ml="-300px">
            <InputLeftAddon
              children={isLargerThan492 ? "Leaving from" : "LF"}
            />
            <Input width="200px"  placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} />
            <Input width="200px" placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };

  const Cars = () => {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Pick-up" : "PL"} />
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon
              children={isLargerThan492 ? "Pick-up date" : "PD"}
            />
            <Input type="date" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon
              children={isLargerThan492 ? "Drop-off date" : "DD"}
            />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };

  const Flights = () => {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justify="space-between"
          gap="2"
          w={isLargerThan768 ? "50%" : "90%"}
        >
          <InputGroup>
            <InputLeftAddon
              children={isLargerThan492 ? "Leaving from" : "LF"}
            />
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Going to" : "GT"} />
            <Input placeholder="Enter a location" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-in" : "CI"} />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={isLargerThan492 ? "Check-out" : "CO"} />
            <Input type="date" placeholder="Basic usage" />
          </InputGroup>
        </Flex>
        <Button colorScheme="blue">Search</Button>
      </>
    );
  };
  const TabSection = ({ name }) => {
    return (
      <Tab
        _selected={{
          boxShadow: "none",
          borderBottom: "2px solid blue",
          color: hoverColor,
        }}
        _hover={{ borderBottom: "1px solid blue", color: hoverColor }}
      >
        {name}
      </Tab>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Container maxW="container.xl">
      {isLoading ? (
        <Flex justify="center" mt={"5"}>
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3182ce"
            size="lg"
          />
        </Flex>
      ) : (
        <>
          <Box
            border="1px"
            borderColor="gray.200"
            borderRadius="10px"
            overflow={"hidden"}
            marginTop="50"
            boxShadow={BoxShadow}
          >
            <Tabs align="center">
              <TabList w="90%">
                <Flex
                  flexWrap="wrap"
                  justify="center"
                  gap={isLargerThan768 ? "2" : null}
                >
                  <TabSection name={"Stays"} />
                  <TabSection name={"Flights"} />
                  <TabSection name={"Cars"} />
                  <TabSection name={"Packages"} />
                  <TabSection name={"Things to do"} />
                  <TabSection name={"Cruises"} />
                </Flex>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Stays />
                </TabPanel>
                <TabPanel>
                  <Flights />
                </TabPanel>
                <TabPanel>
                  <Cars />
                </TabPanel>
                <TabPanel>
                  <Packages />
                </TabPanel>
                <TabPanel>
                  <Stays />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Container
            boxShadow={BoxShadow}
            maxW="container.xl"
            mt="50px"
            borderRadius="10px"
            bgImage="url('https://a.travel-assets.com/travel-assets-manager/ceorg-1536-planforholidays/USCAEMEA-HP-Hero-D-980x420.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
          >
            <Flex
              h="400px"
              direction="column"
              gap={10}
              justify="center"
              align="center"
              p={5}
              textAlign="center"
              color="white"
              textShadow="0 0 20px black"
              fontWeight="bold"
            >
              <Box>
                <Heading as="h1" color="white">
                Members can save on holiday trips
                </Heading>
              </Box>
              <Box>
                <Text color="white" fontSize="xl">
                Make that family reunion finally happen this year with member-only discounts on select hotels
                </Text>
              </Box>
              <Box>
                <Link to="/" mb="5%" mt="2%" w="200px" size="lg">
                  <Button
                    mb="5%"
                    mt="2%"
                    w="200px"
                    colorScheme="blue"
                    size="lg"
                  >
                    Find holiday savings
                  </Button>
                </Link>
              </Box>
            </Flex>
          </Container>
         
         <Container   maxW="container.xl"  mt="20px">
          <Text display="flex" justifyContent="center" fontSize="30px" fontWeight="bold">Here to help keep you on the move</Text>
          <Flex>
          <Box  border="1px" borderColor="black.200" borderRadius="10px" w="5000px" mt='20px' ml="50px" p='6'  h="180px" rounded='md' bg='white'>
            <Box display="flex" justifyContent="space-between"> <Text fontWeight="bold" fontSize="22px">Change or cancel a trip</Text>
            <Icon as={BiEditAlt} w={3.5} h={3.5} /></Box>
            <Text>Make updates to your itinerary or cancel a booking</Text></Box>
          <Box border="1px" borderColor="black.200" borderRadius="10px"  w="5000px" mt='20px' ml ="50px"  h="180px" rounded='md' bg='white'>
            <Box display="flex" justifyContent="space-between">  
            <Text fontWeight="bold" fontSize="22px" mt="20px">Use a credit or coupon</Text>
            <Icon as={AiFillDollarCircle} w={3.5} h={3.5} />
            </Box>
            
          <Text>Apply a coupon code or credit to a new trip</Text></Box>
          <Box  border="1px" borderColor="black.200" borderRadius="10px"  mt='20px' ml="50px" p='6' w="5000px" h="180px" rounded='md' bg='white'>
             <Box display="flex" justifyContent="space-between"> <Text fontSize="22px" fontWeight="bold">Track your refund</Text>
             <Icon as={AiFillMessage} w={3.5} h={3.5} /></Box>
             <Text>Check the status of  a refund currently in progress</Text>
          
             </Box>
          </Flex>
       
         </Container>
        <Container  display="flex" justifyContent="center" maxW="container.xl" mt="20px" >
          <Box ml="50px" >      <Image border="1px" borderRadius="10px" w="300px" height="300px" src='https://a.travel-assets.com/travel-assets-manager/ceorg-1514/HP-Edi-3UP-384x256px.jpg' alt='Dan Abramov' />
           <Text>GET MORE TO GO MORE</Text>
           <Text fontWeight="bold">Members can double dip with points on top of airline miles</Text>
          </Box>
          <Box ml="50px"><Image border="1px"  borderRadius="10px" w="300px" height="300px" src='https://a.travel-assets.com/travel-assets-manager/cmct-5183/US-CA-MX-HP-Editorial-3up-384x256.jpg' alt='Dan Abramov' />
           <Text>BROADEN YOUR HORIZONS</Text>
           <Text fontWeight="bold">There's a whole lot of world out there—go see more of it</Text></Box>
          <Box ml="50px"><Image border="1px"  borderRadius="10px" w="300px" height="300px" src='https://a.travel-assets.com/travel-assets-manager/cmct-4898/HP-Editorial-3up-384x256.jpg' alt='Dan Abramov' />
           <Text>YOUR WEEKEND JUST GOT BETTER</Text>
           <Text fontWeight="bold">Save on these last-minute weekend getaways.</Text></Box>
        </Container>
         <Container display="flex" justifyContent="center" maxW="container.xl" mt="20px">
    <Box ml="50px"><Image border="1px"  borderRadius="10px" w="600px" height="300px" src='https://a.travel-assets.com/travel-assets-manager/ceorg-1512/POSa-HP-Edi-2UP-457x257.jpg' alt='Dan Abramov' />
           <Text>SEE MEMBER PRICES ON FALL TRIPS</Text>
           <Text fontWeight="bold">Experience the joy of the season with an autumn getaway</Text></Box>
    <Box ml="50px"> <Image border="1px"  borderRadius="10px" w="600px" height="300px" src='https://a.travel-assets.com/travel-assets-manager/4943-madetotravel/MTT-HP-Editorial-2up-457x257-5.jpg' alt='Dan Abramov' />
           <Text>CITY VIEWS</Text>
           <Text fontWeight="bold">So much to see, so much to do</Text></Box>
         </Container>
         <Container maxW="container.xl" border="1px"
         mt="20px"
            borderColor="black.200"
            borderRadius="10px"  width="5000px" height="320px" display="flex">
              <Box> <Image border="1px" ml="-20px"  borderRadius="10px" w="600px" height="320px" src='https://a.travel-assets.com/mad-service/footer/bnaBanners/BEX_ROME_iStock_72dpi.jpg' alt='Dan Abramov'/></Box>
               <Box><Box display="flex"><Text fontWeight="bold" fontSize="30px" mr="400px">Our app takes you further</Text>
               <Box><Image  width="90px" height="90px" src="https://a.travel-assets.com/mad-service/qr-code/footer_qr_hp/1_QR_FOOTER_HP.png"/>
               <Text fontSize="15px" fontWeight="bold">Scan the QR code</Text></Box></Box>
               <Text fontSize="14px" >When you book on the app you can save even more — up to 25% on select hotels while earning double the points with every booking.
                With these app deals you'll save even more on trips, and that means you can take more trips, and manage it all on the go</Text>
                <Text fontWeight="bold" fontSize="20px" mb="20px">Text yourself a download link for easy access</Text>
                <Input
 placeholder="Country code"
 borderColor="black.200"
 size="md"
 ml="20px"
 type="country" width="220px" mb="20px"/>

<Input
 placeholder="Phone number"
 borderColor="black.200"
 size="md"
 ml="20px"
 type="country" width="220px"/>

<Button ml="20px" colorScheme='blue'>Get The App</Button>
<Text fontSize="14px">By providing your number, you agree to receive a one-time automated text message with a link to get the app. Standard text message rates may apply.</Text>
    </Box>
         </Container>

<Container> </Container>
        
        </>
      )}
    </Container>
    
  );
}

export default Main;
