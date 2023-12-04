import { httpApi } from './axios';

export const login = (requestUser) =>
  httpApi.post('/user/login', requestUser).then((result) => {
    return result;
  });

export const saveUserInfo = ({ userInfoDto, profileImg }) => {
  const form = new FormData();
  const userinfo = new Blob([JSON.stringify(userInfoDto)], {
    type: 'application/json',
  });
  form.append('userInfoDto', userinfo);
  form.append('profileImg', profileImg);

  return httpApi.post('/user/info/new2', form);
};
