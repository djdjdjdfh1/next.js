"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query';
import style from './followRecommend.module.css';
import {User} from "@/model/User";

type Props = {
  user: User
}
export default function FollowRecommend({ user }: Props) {
  const followed = false;
  const queryClient = useQueryClient();
  const follow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post',
      })
    },
    onMutate() {},
    onError() {},
  })
  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(['users', 'followRecommends']);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
        }
      } 
      queryClient.setQueryData(['users', 'followRecommends'], value)
    },
    onError() {},
  })
  
  const onFollow = () => {
    if (followed) {
      unfollow.mutate();
    } else {
      follow.mutate();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={style.followButtonSection}>
        <button onClick={onFollow}>팔로우</button>
      </div>
    </div>
  )
}