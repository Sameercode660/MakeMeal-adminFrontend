'use client'

import { atom, RecoilRoot } from "recoil";

export const UserAuthenticationAtom = atom({
    key: 'userAuthentication',
    default: true
})


export const RecoilRootProvide = function ({children} : {children: React.ReactNode}) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}