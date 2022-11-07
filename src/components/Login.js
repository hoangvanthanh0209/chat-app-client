import {
    FormControl,
    FormLabel,
    Input,
    VStack,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login, resetAuth } from '../redux/authSlice'
import { authSelector } from '../redux/selector'

function Login() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, isLoadingAuth, isSuccessAuth, isErrorAuth, messageAuth } = useSelector(authSelector)

    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShow = () => {
        setShow(!show)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        if (!email || !password) {
            toast({
                title: 'Please Fill all the Feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (isErrorAuth && messageAuth) {
            toast({
                title: 'Error Occured!',
                description: messageAuth,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }

        if (isSuccessAuth && user) {
            navigate('/chat')
        }

        dispatch(resetAuth())
    }, [isErrorAuth, messageAuth, isSuccessAuth, user])

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={email} onChange={handleChangeEmail} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input type={show ? 'text' : 'password'} value={password} onChange={handleChangePassword} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShow}>
                            {show ? 'hide' : 'show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                w="100%"
                colorScheme="blue"
                style={{ marginTop: '30px' }}
                isLoading={isLoadingAuth}
                onClick={handleSubmit}
            >
                Login
            </Button>
        </VStack>
    )
}

export default Login
