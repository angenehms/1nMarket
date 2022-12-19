import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosImgUpload } from '../../apis/axios';

const SignupProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);

  const handleImgUpload = async (e) => {
    let form = new FormData();
    form.append('image', e.target.files[0]);
    console.log(e.target.files[0]);

    // 서버에 파일 전달
    const response = await axiosImgUpload.post('/image/uploadfile', form);
    console.log(response);
  };

  useEffect(() => {
    if (!state?.email || !state?.password) navigate('/signup');
  }, []);

  return (
    <>
      <section>
        <h1>프로필 설정</h1>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <form>
          <div>
            <label htmlFor='profileImg'>{/* <img src='' /> */}</label>
            <input
              id='profileImg'
              type='file'
              accept='.jpg, .gif, .png, .jpeg, .bmp, .tif, .heic'
              onChange={handleImgUpload}
            />
          </div>
          <div>
            <label htmlFor='userName'>사용자 이름</label> <br />
            <input id='userName' placeholder='2~10자 이내여야 합니다.' />
          </div>
          <div>
            <label htmlFor='accountId'>계정 ID</label> <br />
            <input
              id='accountId'
              placeholder='영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.'
            />
          </div>
          <div>
            <label htmlFor='introduce'>소개</label> <br />
            <input id='introduce' placeholder='자신에 대해 소개해 주세요!' />
          </div>
          <button>1n마켓 시작하기</button>
        </form>
      </section>
    </>
  );
};

export default SignupProfile;
