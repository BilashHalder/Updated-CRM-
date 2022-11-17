// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props

  // ** Hooks
  const theme = useTheme()

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref>
          <StyledLink>
            <svg
              width={30}
              height={25}
              version='1.1'
              viewBox='0 0 100.000000 67.000000'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >

<g transform="translate(0.000000,67.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M629 635 c-30 -16 -39 -48 -39 -133 0 -53 1 -54 18 -39 10 10 24 17
30 17 12 0 25 88 20 137 -3 30 -4 31 -29 18z"/>
<path d="M538 584 c-23 -12 -28 -21 -28 -53 0 -21 -3 -59 -6 -85 -8 -54 8 -62
45 -22 19 20 22 32 19 99 l-3 75 -27 -14z"/>
<path d="M448 534 c-25 -13 -28 -20 -28 -67 0 -46 3 -53 25 -64 14 -6 27 -8
29 -4 6 9 10 140 5 145 -2 2 -16 -2 -31 -10z"/>
<path d="M691 466 c-10 -12 -18 -13 -33 -5 -16 9 -26 7 -49 -10 -93 -69 -102
-73 -149 -67 -32 4 -52 2 -65 -8 -19 -14 -19 -15 5 -9 l25 6 -27 -30 c-16 -16
-28 -37 -28 -46 0 -9 -9 -33 -19 -54 -24 -49 -34 -93 -21 -93 5 0 10 10 10 22
0 28 82 108 101 98 8 -4 34 -11 58 -15 l43 -7 -3 45 c-2 25 -2 43 1 40 7 -6
30 -110 37 -160 9 -71 22 -48 18 30 -3 43 -1 67 4 58 5 -8 16 -11 29 -7 31 10
36 -10 12 -48 -13 -21 -17 -37 -11 -41 18 -11 52 78 54 142 2 59 2 60 26 51
35 -13 55 -3 41 21 -17 33 -13 71 9 71 11 0 23 5 26 10 4 6 -6 10 -24 10 -16
0 -36 2 -44 5 -7 3 -19 -1 -26 -9z"/>
<path d="M331 293 c-6 -13 -24 -29 -39 -37 l-27 -15 25 0 c27 0 64 41 57 62
-2 7 -9 3 -16 -10z"/>
<path d="M406 241 c-9 -9 -18 -33 -21 -52 -5 -32 -4 -32 4 -6 15 44 31 57 69
57 41 0 40 5 -4 13 -23 4 -36 1 -48 -12z"/>
<path d="M30 75 c0 -33 2 -35 33 -34 30 2 30 2 5 6 -22 3 -28 10 -28 28 0 13
6 26 13 28 7 3 5 6 -5 6 -14 1 -18 -7 -18 -34z"/>
<path d="M640 75 c0 -33 2 -35 35 -35 30 0 35 3 34 23 -1 16 -2 18 -6 5 -3
-11 -14 -18 -29 -18 -19 0 -24 5 -24 24 0 13 6 27 13 29 7 3 5 6 -5 6 -14 1
-18 -7 -18 -34z"/>
<path d="M732 88 c-7 -7 -11 -21 -11 -32 1 -21 1 -21 6 -1 3 11 10 26 15 33
13 15 6 16 -10 0z"/>
<path d="M100 65 c0 -32 6 -32 12 0 3 14 1 25 -3 25 -5 0 -9 -11 -9 -25z"/>
<path d="M140 65 c0 -17 5 -25 18 -25 14 0 14 2 3 9 -8 5 -11 16 -8 25 4 9 2
16 -3 16 -6 0 -10 -11 -10 -25z"/>
<path d="M182 75 c-11 -12 -10 -15 3 -15 8 0 15 7 15 15 0 18 -2 18 -18 0z"/>
<path d="M268 65 c2 -14 6 -25 8 -25 2 0 4 11 4 25 0 14 -4 25 -9 25 -4 0 -6
-11 -3 -25z"/>
<path d="M313 65 l-28 -24 35 1 c26 0 29 2 11 5 l-25 5 25 19 c13 10 21 19 17
19 -4 0 -20 -11 -35 -25z"/>
<path d="M435 80 c3 -5 8 -10 11 -10 2 0 4 5 4 10 0 6 -5 10 -11 10 -5 0 -7
-4 -4 -10z"/>
<path d="M460 65 c0 -14 2 -25 4 -25 2 0 6 11 8 25 3 14 1 25 -3 25 -5 0 -9
-11 -9 -25z"/>
<path d="M541 68 c-1 -21 4 -28 17 -28 11 0 13 3 6 8 -7 4 -14 16 -17 27 -4
15 -5 14 -6 -7z"/>
<path d="M590 81 c0 -5 -8 -12 -17 -14 -14 -4 -12 -5 5 -6 13 -1 22 5 22 14 0
8 -2 15 -5 15 -3 0 -5 -4 -5 -9z"/>
<path d="M841 68 c-1 -25 3 -28 29 -28 26 0 30 3 29 28 -2 23 -2 24 -6 5 -3
-14 -12 -23 -23 -23 -11 0 -20 9 -23 23 -4 19 -4 18 -6 -5z"/>
<path d="M922 60 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z"/>
<path d="M967 71 c3 -13 -1 -21 -14 -24 -15 -4 -14 -5 5 -6 17 -1 22 4 22 24
0 14 -4 25 -9 25 -5 0 -7 -9 -4 -19z"/>
<path d="M390 48 c0 -5 14 -8 30 -8 17 0 30 3 30 8 0 4 -13 7 -30 7 -16 0 -30
-3 -30 -7z"/>
<path d="M769 47 c5 -5 19 -7 32 -5 20 3 19 5 -9 9 -20 3 -29 2 -23 -4z"/>
<path d="M228 43 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
</g>
            </svg>
            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
