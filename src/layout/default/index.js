import React, { } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import NameEasy from '../../assets/nameEasy.png';
import { MarkGithubIcon } from '@primer/octicons-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname);

const DefaultLayout = (props) => {
  const mobileWidth = useMediaQuery('(max-width:425px)');

  return (
    <>
      <Box sx={{
        top: 0,
        width: '100%',
        maxWidth: '600px',
        minWidth: '320px',
        color: 'white',
        display: 'block',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
        }}>
          {
            !props.loading ? <>
              <Button
                aria-label="home"
                onClick={async () => await props.handleIndexChange({
                  index: 0,
                  name: '',
                })}
              >
                <img src={NameEasy} width={'50px'} height={'50px'} style={{ margin: mobileWidth ? '16px' : '36px' }} />
              </Button>
              <Typography fontStyle={{ color: '#fff', fontWeight: 'bold', fontSize: 24, margin: mobileWidth ? '32px' : '50px' }}>
                改名易
              </Typography>
            </> : <Box sx={{ paddingBottom: '19vh' }} />
          }
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={props.mobileWidth ? '10vh' : '20vh'}
      >
        {props.children}
      </Box>
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '600px',
        minWidth: '320px',
        display: 'block',
        alignContent: 'center',
        textAlign: 'center',
        marginBottom: 3,
      }}>
        <Typography align="center" fontStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '2rem' }}>
          Powered by
        </Typography>
        <CreditButton
          variant="contained"
          onClick={() => props.setCredit(!props.credit)}
        >
          Credits
        </CreditButton>
      </Box>
      <Modal
        open={props.credit}
        onClose={() => props.setCredit(!props.credit)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          maxHeight: '100%',
          maxWidth: '100%',
          overflow: 'scroll',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          fontSize: 20,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography paragraph>
            <h2>改名易 (v1)</h2>
            此app 為Born Hub 創辦人Kenneth 為了解決大家改名的煩惱，專程找來一班學生research，再憑他多年的經驗和分析而創作出全球第一個在Born Hub 面世的app，改名易。<br />

            改名方法<br />
            使用本app，用家需要輸入公司的mission ，然後app 會使用四個步驟來得出公司名稱:<br />

            <List>

              <ListItem>
                <ListItemText
                  primary="精簡化用家輸入的mission，在這裡我們使用了 nlpjs。"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="抽出最後一個動詞和副詞，因為在劇中，CEO 說的東西重點通常都是在最後一句中，如果所有句子都沒有動詞或副詞，就會要求重試。在這裡我們使用了 wordpos來決定verb adverb 的位置。"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="找出動詞的同意詞，在這裡我們使用了Datamuse 線上查找同意詞，也有使用 synonyms 作線下(local) 後備。"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="隨機抽出一個動詞，然後以 I[]U 送出"
                />
              </ListItem>

            </List>

            開放源碼<br />
            <a href="https://github.com/ckanthony/name-easy-api" target="_blank">NameEasy API</a><br />
            <a href="https://github.com/ckanthony/name-easy-app" target="_blank">NameEasy APP</a><br />

            <br />免責聲名<br /><br />
            改名易為香港電視娛樂(下稱ViuTV) 製作之喜劇電視劇 原創劇《IT狗》（英語：In Geek We Trust）的虛構app，版權全部屬於ViuTV，我都冇say，版權擁有者可以決定其他人是否有權使用他們的作品。 本app 所提供的資料只供參考之用，如有需要請以 @ckanthony 和 @jeremytsngtsng 聯絡。
          </Typography>
          <Divider sx={{ margin: '2rem' }} />
          <Stack direction="row" spacing={2} justifyContent={'space-evenly'} alignContent={'center'}>
            <Card sx={{ width: '150px', textAlign: 'center' }}>
              <CardContent>
                <Avatar alt="jeremytsngtsng" src="https://avatars.githubusercontent.com/u/24528514?v=4" style={{ margin: 'auto', marginBottom: '1rem' }} />
                <Typography variant="body2" color="text.primary">
                  🐹🦄
                </Typography>
                <Typography color="text.secondary">
                  @jeremytsngtsng
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href="https://instagram.com/jeremytsngtsng" target="_blank">
                  <InstagramIcon />
                </Button>
                <Button size="small" color="primary" href="https://github.com/jeremytsngtsng" target="_blank">
                  <MarkGithubIcon />
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ width: '150px', textAlign: 'center' }}>
              <CardContent>
                <Avatar alt="ckanthony" src="https://avatars.githubusercontent.com/u/3399366?v=4" style={{ margin: 'auto', marginBottom: '1rem' }} />
                <Typography variant="body2" color="text.primary">
                  bears like apple pie
                </Typography>
                <Typography color="text.secondary">
                  @ckanthony
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href="https://instagram.com/ckanthony" target="_blank">
                  <InstagramIcon />
                </Button>
                <Button size="small" color="primary" href="https://github.com/ckanthony" target="_blank">
                  <MarkGithubIcon />
                </Button>
              </CardActions>
            </Card>
          </Stack>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Button onClick={() => props.setCredit(!props.credit)}>關閉</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};


const CreditButton = styled(Button)({
  textAlign: "center",
  width: 180,
  padding: 3,
  borderRadius: 3,
  margin: 'auto',
  marginBottom: 2,
  marginTop: 2,
  fontSize: 20,
  fontWeight: 'bold',
  backgroundColor: '#fff',
  color: 'black',
  '&:hover': {
    backgroundColor: '#e7e7e7',
  },

});

export default DefaultLayout;