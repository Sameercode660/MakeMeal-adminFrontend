'use client'

import { atom, RecoilRoot } from "recoil";

export const UserAuthenticationAtom = atom({
    key: 'userAuthentication',
    default: false
})


export const RecoilRootProvide = function ({children} : {children: React.ReactNode}) {
    return (
        <RecoilRoot>{children}</RecoilRoot>
    )
}