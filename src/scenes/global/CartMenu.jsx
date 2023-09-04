import {Box, Button, Divider, IconButton, Typography} from '@mui/material'
import { UseSelector, useDispatch } from 'react-redux';
import  CloseIcon from '@mui/icons-material/Close'
import  AddIcon from '@mui/icons-material/Add'
import  RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled';
import {shades} from '../../theme';
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen
} from '../../state';
import { useNavigate } from 'react-router-dom';


const FlexBox = styled(Box)`
display:flex;
justify-content: space-between
align-items: center`;

const cartMenu = () => {
    const Navigate = useNavigate();
    const dispatch= useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const isCartOpen = useSelector(() => state.cart.isCartOpen)

    const totalPrice = cart.reduce((total, item) => {
        return total + item.count  * item.attributes.price
    }, 0)

    return (
        <Box //overlay
        display= {isCartOpen ? 'block' : 'none'}
        backgroundColor= 'rgba(0, 0, 0, 0.4'
        position= 'fixed'
        zIndex={10}
        width='100%'
        height='100%'
        left='0'
        top='0'
        overflow='auto'
        >
            <Box //modal
            postion='fixed'
            right='0'
            bottom='0'
            width='max(400px, 30%)'
            height='100%'
            backgroundColor='white'>
                <Box
                padding='30px'
                overflow='auto'
                height='100%'>

                    {/* header */}
                    <FlexBox mb='15px'>
                        <Typography variant='h3'> SHOPPING BAG ({cart.length})</Typography>
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon/>
                        </IconButton>

                    </FlexBox>

                    {/* cartlist */}
                    <Box>
                        {cart.map((item) => (
                        <Box key={`${item.atteributes.name}-${item.id}`}>
                            <Divider>
                            <FlexBox p='15px 0'>
                                <Box flex='1 1 40%'>
                                    <img
                                    alt={item?.name}
                                    width='123px'
                                    height='164px'
                                    src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                                    />

                                </Box>
                                <Box flex='1 1 60%'>
                                    <FlexBox mb='5px'>
                                        <Typography fontWeight='bold'>
                                            {item.attributes.name}
                                        </Typography>
                                        <IconButton onClick={() =>dispatch(removeFromCart({ id: item.id}))}>
                                            <CloseIcon />
                                        </IconButton>    
                                    </FlexBox>
                                    <Typography>
                                        {item.attributes.shortDescription}
                                    </Typography>
                                    {/* amount */}
                                    <FlexBox m='15px 0'>
                                        <Box 
                                        display='flex'
                                        alignItems='center'
                                        border={`1.5px solid ${shades.neutral[500]}`}>
                                        <IconButton onClick={() => dispatch(decreaseCount({id: item.id}))}>
                                            <RemoveIcon/>
                                        </IconButton>

                                        <Typography>{item.count}</Typography>
                                         <IconButton onClick={() => dispatch(increaseCount({id: item.id}))}>
                                            <AddIcon/>
                                        </IconButton>
                                        </Box>

                                    </FlexBox>

                                    {/* Price */}
                                    <Typography fontWeight='bold'>{item.attributes.price}</Typography>

                                </Box>

                            </FlexBox>
                            </Divider>
                        </Box>))}
                        
                        {/* Actions */}
                        <Box m='20px 0'>
                            <FlexBox m='20px 0'>
                                <Typography fontWeight='bold'> SUBTOTAL</Typography>
                                <Typography fontWeight='bold'>${totalPrice}</Typography>
                            </FlexBox>
                            <Button
                            SX={{
                                backgroundColor:shades.primary[400],
                                color: 'white',
                                borderRadius: 0,
                                minWidth: '100%'
                            
                            }}
                            >CHECKOUT</Button>

                        </Box>
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}