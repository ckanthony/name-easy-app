import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { postNameEasy } from 'api';
import SwipeableViews from 'react-swipeable-views';
import Image from 'mui-image';
import NotReady from '../../assets/notReady.png';
import BrandLoading from '../../assets/brandLoading.png';
import WSW from '../../assets/wsw.png';
import bottle from '../../assets/bottle.png';
// import TwitterIcon from '@mui/icons-material/Twitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import DefaultLayout from 'layout/default';
import Fade from '@mui/material/Fade';
import Chip from '@mui/material/Chip';
import ReactGA from 'react-ga';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const LandingPage = () => {
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeoutActive, setTimeoutActive] = useState(false);

  const [name, setName] = useState('');
  const [result, setResult] = useState({});
  const [resultList, setResultList] = useState([]);
  const [resultListIndex, setResultListIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [specialImage, setSpecialImage] = useState(null);

  const [showResultList, setShowResultList] = useState(false);
  const [showVerb, setShowVerb] = useState(false);

  const [credit, setCredit] = useState(false);

  const mobileWidth = useMediaQuery('(max-width:425px)');

  const special = [
    {
      word: ['woman', 'female'],
      image: WSW,
    },
    {
      word: ['bottle', 'cup', 'water', 'water bottle'],
      image: bottle
    }
  ]

  async function handleResultListIndex(resultList, result) {
    if (resultList.length > 0) {
      resultList.map((r, i) => {
        if (result === r) {
          setResultListIndex(i);
        }
      });
    }
  }

  async function nextResultList() {
    if (!showVerb) setShowVerb(true);
    if (resultListIndex === resultList.length - 1) {
      setResultListIndex(0);
      setResult(resultList[0]);
      return;
    }
    let newResultListIndex = resultListIndex + 1;
    setResultListIndex(newResultListIndex);
    setResult(resultList[newResultListIndex]);
  }

  async function handleIndexChange({ index, name }) {
    try {
      if (index === 1 && name === "") {
        setPageIndex(1);
        setLoading(false);
        return;
      }

      if (index === 1 && name !== '') {
        for (let i of special) {
          for (let y of i.word) {
            if (name.includes(y)) {
              setIsSpecial(true);
              setSpecialImage(i.image);
              break;
            }
          }
        } 
        setPageIndex(1);
        const _r = await postNameEasy(name);
        const resultList = _r.data;

        if (resultList.length > 0) {
          const result = resultList[resultList.length - 1];
          setResult(result);
          setResultList(resultList);
          handleResultListIndex(resultList, result);
          setLoading(false);
          setTimeoutActive(true)
          let timer = await sleep(3000);
          setTimeoutActive(false);
          setShowResultList(true);
          clearTimeout(timer);
        }
        if (!resultList) {
          setLoading(false);
        }

        return;
      }
      setShowResultList(false);
      setShowVerb(false);
      setResult({});
      setResultList([]);
      setResultListIndex(0);
      setLoading(true);
      setPageIndex(0);
      setIsSpecial(false);
      setSpecialImage(null);
    } catch (e) {
      console.log(e);
    }

  }
  useEffect(() => {
    if (key === 'Enter') {
      (async () => {
        setPageIndex(1);
        await handleIndexChange({
          index: 1,
          name: name,
        });
        setKey(null);
      })();
    }
  }, [key]);

  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  ReactGA.pageview('main');

  return (
    <SwipeableViews
      index={pageIndex}
      enableMouseEvents
      style={{ height: '100vh' }}
      slideStyle={{ height: '100vh' }}
      onChangeIndex={async (index) => await handleIndexChange({
        index: index,
        name: name,
      })}
    >
      <DefaultLayout mobileWidth={mobileWidth} handleIndexChange={handleIndexChange} setCredit={setCredit} credit={credit} loading={pageIndex === 1 && loading}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography align="center" fontStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '3rem', marginBottom: '1.6rem' }}>
            您的公司mission 是：
          </Typography>
          <CssTextField
            autoFocus
            id="id"
            multiline
            style={{ width: '325px' }}
            onChange={async (d) => {
              let value = d.target.value;
              value = value.replace(/[^a-zA-Z\d!@#$%^&*()_+{}":<>?,./;'|\\~`\s]/ig, '');
              setName(value);
            }}
            onKeyPress={async (ev) => {
              setKey(ev.key);
            }}
            value={name}
            placeholder="To accelerate the world's transition to sustainable energy."
            minRows={2}
            maxRows={6}
            variant="outlined"
          />
        </Box>
      </DefaultLayout>
      <DefaultLayout mobileWidth={mobileWidth} handleIndexChange={handleIndexChange} setCredit={setCredit} credit={credit} loading={pageIndex === 1 && loading}>
        <Box>
          {loading ?
            <Box style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <Box style={{ margin: 'auto', marginBottom: '1rem' }}>
                <Image
                  src={BrandLoading}
                  duration={0}
                  width="150px"
                />
              </Box>
            </Box>
            :
            (resultList.length > 0) ?
              <>
                <Typography align="center" fontStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '3rem', marginBottom: '0.5rem' }}>
                  您的公司名稱是：
                </Typography>
                <Box
                  onClick={() => {
                    if (!timeoutActive) {
                      setShowResultList(false);
                      if (resultList.length > 1) {
                        nextResultList();
                      }
                      if (resultList.length === 1) {
                        if (!showVerb) setShowVerb(true);
                      }
                    }
                  }}
                  sx={{
                    margin: 'auto',
                    marginTop: 2,
                    padding: '10px 0',
                    width: '325px',
                    border: `solid 5px white`,
                    useSelect: 'none',
                  }}
                >
                  <Typography align="center" fontStyle={{ color: '#fff', fontWeight: 'bold', fontSize: '3rem' }}>
                    {result.result}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', textAlign: 'center' }}>
                  {showResultList && <Fade sx={{ width: '100%' }} in={showResultList}>{Tips(resultList)}</Fade>}
                  <Fade sx={{ width: '100%' }} in={showVerb}>{(Verb(result.verb))}</Fade>
                </Box>
                {
                  isSpecial &&
                  <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', textAlign: 'center', marginTop: 2 }}>
                    <Image
                      src={specialImage}
                      duration={0}
                      width="200px"
                    />
                  </Box>
                }

              </> :
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Image
                  src={NotReady}
                  width="325px"
                  duration={0}
                  sx={{
                    margin: 'auto'
                  }}
                />
              </Box>
          }
        </Box>
      </DefaultLayout>
    </SwipeableViews>);
};

const Tips = (resultList) => (
  <Typography variant="body" color={'#fff'} mt={2} fontSize={13}>{resultList.length > 1 ? '點擊結果有更多名稱！' : '點擊查看根據'}</Typography>
);

const Verb = (verb) => (
  <Typography variant="body" color={'#fff'} mt={2} fontSize={13}>根據了: <Chip sx={{ marginLeft: 1, padding: '0 5px' }} label={<Typography variant="body" color={'#fff'} mt={2} fontSize={13}>{verb}</Typography>} variant="outlined" /></Typography>
);

const CssTextField = styled(TextField)({
  '& .MuiInputBase-inputMultiline': {
    color: '#fff',
    fontSize: '3rem',
    lineHeight: '3rem',
    textAlign: 'center'
  },
  '& .MuiOutlinedInput-root': {
    '& input': {
      color: '#fff',
      fontSize: '3rem'
    },
    '& fieldset': {
      borderColor: 'white',
      borderWidth: '3px',
      borderRadius: 0,
      lineHeight: '3rem',
      padding: '3rem'
    },
    '&:hover fieldset': {
      borderColor: 'white',
      borderWidth: '3px',
      borderRadius: 0,
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
      borderWidth: '6px',
      borderRadius: 0,
    },
  }
});

export default LandingPage;
