import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Avatar,
    Text,
    Image,
    IconButton,
} from '@chakra-ui/react'
import { FaEye } from 'react-icons/fa'

function ProfileModal({ user, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton display={{ base: 'flex' }} icon={<FaEye />} onClick={onOpen} />
            )}
            <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader fontSize="40px" display="flex" justifyContent="center">
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                        <Image borderRadius="full" boxSize="150px" alt={user.name} src={user.avatar} />
                        <Text fontSize={{ base: '28px', md: '30px' }} fontFamily="Work sans">
                            Email: {user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal
