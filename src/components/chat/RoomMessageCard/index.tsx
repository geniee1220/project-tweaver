import { Message } from '@/apis/chat';
import * as S from './RoomMessageCard.styles';

interface RoomMessageCardProps {
  message: Message;
}

function RoomMessageCard({ message }: RoomMessageCardProps) {
  const getStorage = localStorage.getItem('userInfo');
  const userInfo = getStorage && JSON.parse(getStorage);
  const userId = userInfo.memberId;

  return (
    <>
      {userId === message.memberIdDto.memberId ? (
        <S.MyMessageCardContainer>
          <S.UserChatContainer>
            <S.UserName>나</S.UserName>
            <S.MyMessage>{message.content}</S.MyMessage>
          </S.UserChatContainer>
        </S.MyMessageCardContainer>
      ) : (
        <S.OtherMessageCardContainer>
          <S.UserProfileImg src={message.memberIdDto.memberProfileUrl} />
          <S.UserChatContainer>
            <S.UserName>{message.memberIdDto.memberNickname}</S.UserName>
            <S.UserMessage>{message.content}</S.UserMessage>
          </S.UserChatContainer>
        </S.OtherMessageCardContainer>
      )}
    </>
  );
}

export default RoomMessageCard;
