import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosImgUpload } from '../../apis/axios';

const USERNAME_REGEX = /^[a-zA-Z0-9가-힣]{2,10}$/;
// eslint-disable-next-line
const ACCOUNTNAME_REGEX = /^(?=[a-z])[a-z0-9\.\_]{5,15}$/;

const SignupProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(
    'https://mandarin.api.weniv.co.kr/1671431659709.png',
  );
  const [userName, setUserName] = useState('');
  console.log('userName :' + !!userName);
  const [validUserName, setValidUserName] = useState('false');
  console.log(validUserName);
  const [errUserNameMsg, setErrUserNameMsg] = useState('');
  const [accountName, setAccountName] = useState('');
  const [validAccountName, setValidAccountName] = useState('false');
  console.log(validAccountName);
  const [errAccountNameMsg, setErrAccountNameMsg] = useState('');

  const handleImgUpload = async (e) => {
    let form = new FormData();

    form.append('image', e.target.files[0]);
    if (e.target.files[0] === undefined) return;

    // 서버에 파일 전달
    const {
      data: { filename },
    } = await axiosImgUpload.post('/image/uploadfile', form);

    setProfileImg(`https://mandarin.api.weniv.co.kr/${filename}`);
  };

  useEffect(() => {
    if (!state?.email || !state?.password) navigate('/signup');
  }, []);

  // 사용자 이름 유효성 체크
  useEffect(() => {
    const result = USERNAME_REGEX.test(userName);
    setValidUserName(result);

    if (userName.length && !result) {
      setErrUserNameMsg('2~10자의 한글,영어,숫자만 사용 가능합니다.');
    } else {
      setErrUserNameMsg('');
    }
  }, [userName]);

  // 계정 id 유효성 체크
  useEffect(() => {
    const result = ACCOUNTNAME_REGEX.test(accountName);
    setValidAccountName(result);
    console.log('accountName: ' + result);

    if (accountName.length && !result) {
      setErrAccountNameMsg(
        '5~15자 이내의 영문 소문자, 숫자와 특수문자 마침표(.), 밑줄(_)만 사용 가능합니다.',
      );
    } else {
      setErrAccountNameMsg('');
    }
  }, [accountName]);

  return (
    <>
      <section>
        <h1>프로필 설정</h1>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <form autoComplete='off'>
          <div>
            <label htmlFor='profileImg' style={{ cursor: 'pointer' }}>
              <img src={profileImg} alt='' width='110px' height='110px' />
            </label>
            <input
              id='profileImg'
              type='file'
              accept='.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic'
              onChange={handleImgUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div>
            <label htmlFor='userName'>사용자 이름(필수)</label> <br />
            <input
              id='userName'
              placeholder='2~10자 이내여야 합니다.'
              maxLength='10'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            {errUserNameMsg && <p>{errUserNameMsg}</p>}
          </div>
          <div>
            <label htmlFor='accountName'>계정 ID(필수)</label> <br />
            <input
              id='accountName'
              placeholder='5~15자 이내의 영문 소문자, 숫자와 특수문자 마침표(.), 밑줄(_)만 사용 가능합니다.'
              maxLength='15'
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            {errAccountNameMsg && <p>{errAccountNameMsg}</p>}
          </div>
          <div>
            <label htmlFor='introduce'>소개</label> <br />
            <input id='introduce' placeholder='자신에 대해 소개해 주세요!' />
          </div>
          <button disabled>1n마켓 시작하기</button>
        </form>
      </section>
    </>
  );
};

export default SignupProfile;
