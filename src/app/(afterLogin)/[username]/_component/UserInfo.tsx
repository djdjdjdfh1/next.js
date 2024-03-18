"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useQuery} from "@tanstack/react-query";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import cx from 'classnames';
import { useSession } from "next-auth/react";

type Props = {
  username: string;
}
export default function UserInfo({username}: Props) {
  const {data: user, error} = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const {data:session} = useSession();
  console.log('error');
  console.dir(error);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div style={{
          height: 100,
          alignItems: 'center',
          fontSize: 31,
          fontWeight: 'bold',
          justifyContent: 'center',
          display: 'flex'
        }}>
          계정이 존재하지 않음
        </div>
      </>
    )
  }
  if (!user) {
    return null;
  }

  const followed = user.Followers?.find((v) => v.userId === session?.user?.email)
  const onFollow = () => {
    
  }

  return (
    <>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id}/>
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        { user.id !== session?.user?.email && 
          <button 
            onClick={onFollow} 
            className={cx(style.followButton, followed && style.followed)}>{followed ? '팔로잉' : '팔로우'}</button>}
      </div>
    </>
  )
}