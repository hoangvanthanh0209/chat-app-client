import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/Login'
import Register from '../components/Register'

function HomePage() {
    return (
        <Box bg="blackAlpha.100" minHeight="100vh">
            <Container maxW="xl" centerContent>
                <Box
                    d="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg="white"
                    w="100%"
                    p="3"
                    borderRadius="lg"
                    borderWidth="1px"
                    m="40px 0 15px 0"
                >
                    <Text fontSize="4xl" fontFamily="Work sans" textAlign="center">
                        Chat App
                    </Text>
                </Box>
                <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                    <Tabs isFitted variant="soft-rounded" colorScheme="green">
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Register</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Register />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </Box>
    )
}

export default HomePage
