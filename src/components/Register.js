import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, resetAuth } from '../redux/authSlice'

import { authSelector } from '../redux/selector'

function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        avatar: null,
        password: '',
        password2: '',
    })

    const { user, isLoadingAuth, isSuccessAuth, isErrorAuth, messageAuth } = useSelector(authSelector)

    const { name, email, avatar, password, password2 } = data

    const toast = useToast()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const input = e.target.name
        const value = input === 'avatar' ? e.target.files[0] : e.target.value

        setData((prevData) => {
            return {
                ...prevData,
                [input]: value,
            }
        })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const handleShowPassword2 = () => {
        setShowPassword2(!showPassword2)
    }

    const handleSubmit = () => {
        if (password !== password2) {
            toast({
                title: 'Error Occured!',
                description: 'Confirm password not match password',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        const formData = new FormData()
        formData.append('avatar', avatar)
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)

        dispatch(register(formData))
    }

    useEffect(() => {
        if (isErrorAuth) {
            toast({
                title: 'Error Occured!',
                description: messageAuth,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
        }

        if (isSuccessAuth) {
            navigate('/chat')
            dispatch(resetAuth())
        }
    }, [isErrorAuth, messageAuth, isSuccessAuth, dispatch])

    return (
        <VStack spacing="10px">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} name="name" onChange={handleChange} />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} name="email" onChange={handleChange} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                            {showPassword ? 'hide' : 'show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="password2" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword2 ? 'text' : 'password'}
                        name="password2"
                        value={password2}
                        onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowPassword2}>
                            {showPassword2 ? 'hide' : 'show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="avatar" isRequired>
                <FormLabel>Avatar</FormLabel>
                <Input type="file" accept="image/*" p={1.5} name="avatar" onChange={handleChange} />
            </FormControl>
            <Button
                w="100%"
                colorScheme="blue"
                style={{ marginTop: '30px' }}
                isLoading={isLoadingAuth}
                onClick={handleSubmit}
            >
                Register
            </Button>
        </VStack>
    )
}

export default Register
