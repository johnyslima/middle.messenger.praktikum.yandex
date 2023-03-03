import defaultUserAvatarUrl from '../assets/images/default_user.png';
import defaultGroupAvatarUrl from '../assets/images/default_group.png';
import avatarUserUrl from '../assets/images/avatar.png';
import { RoomType } from '../typings/roomType';

export const roomList: RoomType[] = [
  {
    id: "1",
    roomName: "Андрей",
    time: "10:49",
    lastMessage: "Изображение",
    countUnread: 2,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultUserAvatarUrl
  },
  {
    id: "2",
    roomName: "Киноклуб",
    time: "12:00",
    lastMessage: "стикер",
    countUnread: 0,
    lastMessageFromYou: true,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "3",
    roomName: "Илья",
    time: "15:12",
    lastMessage: "Друзья, у меня для вас особенный выпуск новостей! Что-нибудь нужно еще написать.",
    countUnread: 4,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultUserAvatarUrl
  },
  {
    id: "4",
    roomName: "Вадим",
    time: "Пт",
    lastMessage: "Круто!",
    countUnread: 0,
    lastMessageFromYou: true,
    currentRoom: true,
    avatar: defaultUserAvatarUrl,
    messages: [
      {
        type:"message-from",
        messageText: `Привет! Смотри, тут всплыл интересный кусок лунной космической
        истории — НАСА в
        какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что
        астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности
        Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
        Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`
      },
      {
        type:"message-from",
        messageText: `Привет! Смотри, тут всплыл интересный кусок лунной космической
        истории — НАСА в
        какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что
        астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности
        Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
        Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`
      },
      {
        type:"message-to",
        messageText: `Круто`
      }
    ]
  },
  {
    id: "5",
    roomName: "тет-а-теты",
    time: "Ср",
    lastMessage: "И Human Interface guidelines и Material Design рекомендуют совершать что-то особенное",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: avatarUserUrl
  },
  {
    id: "6",
    roomName: "1,2,3",
    time: "Пн",
    lastMessage: "Миллионы россиян ежедневно проводят десятки часов своего времени за телефонами",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: avatarUserUrl
  },
  {
    id: "7",
    roomName: "Design Destroyer",
    time: "Пн",
    lastMessage: "В 2008 году художник Jon Rafman начал собирать колеекцию удивительных картин",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "8",
    roomName: "Day",
    time: "1 Мая 2020",
    lastMessage: "Так увлёкся работой по курсу, что совсем забыл его анонсировать в социальных",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "9",
    roomName: "Стас Рогозин",
    time: "12 Апреля 2020",
    lastMessage: "Можно или сегодня или завтра",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "10",
    roomName: "Стас Рогозин",
    time: "12 Апреля 2020",
    lastMessage: "Можно или сегодня или завтра",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "11",
    roomName: "Стас Рогозин",
    time: "12 Апреля 2020",
    lastMessage: "Можно или сегодня или завтра",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "12",
    roomName: "Стас Рогозин",
    time: "12 Апреля 2020",
    lastMessage: "Можно или сегодня или завтра",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
  {
    id: "13",
    roomName: "Стас Рогозин",
    time: "12 Апреля 2020",
    lastMessage: "Можно или сегодня или завтра",
    countUnread: 0,
    lastMessageFromYou: false,
    currentRoom: false,
    avatar: defaultGroupAvatarUrl
  },
]
