
import {Box,Link,Typography} from '@mui/material'

const FooterContent = () => {

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <Link target='_blank' href='http://creazionegroup.in/'>
        Creazione Group
        </Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
