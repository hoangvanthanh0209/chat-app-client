import { Badge } from '@chakra-ui/react'
import { RiCloseLine } from 'react-icons/ri'

function UserBadgeItem({ user, handleFunction, admin }) {
    return (
        <Badge
            px={2}
            py={1}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            colorScheme="purple"
            cursor="pointer"
            display="inline-flex"
            alignItems="center"
            onClick={handleFunction}
        >
            {user.name}
            {admin === user._id && <span> (Admin)</span>}
            <RiCloseLine style={{ fontSize: '20px' }} pl={1} />
        </Badge>
    )
}

export default UserBadgeItem
