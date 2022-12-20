import React from 'react';
import ModalLayout from '../ModalLayout';

const PostModal = ({ setOpenModal }) => {

  return (
    <ModalLayout setOpenModal={setOpenModal}>
      <li>신고하기</li>
    </ModalLayout>
  );
};

export default PostModal;
