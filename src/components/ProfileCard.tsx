// プロフィール自動生成
/** @jsxImportSource @emotion/react */
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { toPng } from 'html-to-image';

const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Image = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ProfileDetails = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const ProfileCard: React.FC = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (cardRef.current === null) return;
    toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'profile-card.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error('Failed to download image:', err);
      });
  };

  return (
    <ProfileContainer>
      <Card ref={cardRef}>
        {image && <Image src={image as string} alt="Profile" />}
        <ProfileDetails>
          <strong>{name}</strong>
          <p>お誕生日: {birthday}</p>
          <p>電話番号: {phone}</p>
        </ProfileDetails>
      </Card>

      <Form>
        <Input
          type="text"
          placeholder="お名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="date"
          placeholder="お誕生日"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Input
          type="text"
          placeholder="電話番号"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        <Button type="button" onClick={handleDownload}>
          Download as PNG
        </Button>
      </Form>
    </ProfileContainer>
  );
};

export default ProfileCard;
